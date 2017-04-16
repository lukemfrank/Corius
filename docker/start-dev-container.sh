#!/bin/bash

# Do not run this script directly. It will be copied into the Gulp builder
# container, and invoked by running the container. NPM installs cannot be
# invoked during docker build, but instead can be executed on container startup,
# hence the need for this complicated script.

set -e
# app is the user we become when running our container.
export HOME=/home/app

# These environment variables can be provided to our container to set private NPM registry.
envVars=( "NPM_REGISTRY" "NPM_USERNAME" "NPM_PASSWORD" "NPM_EMAIL" )
usePrivateNpm=false

for i in "${envVars[@]}"
do
  if [ "${!i}" != "" ]; then
    usePrivateNpm=true
  else
    usePrivateNpm=false
    break
  fi
done

if [ $usePrivateNpm == true ]; then
  echo "Using private NPM registry config for $NPM_REGISTRY"
  # Walk through the prompts for logging into our private npm registry.
  npm set registry $NPM_REGISTRY
  npm adduser --registry $NPM_REGISTRY <<!
  $NPM_USERNAME
  $NPM_PASSWORD
  $NPM_EMAIL
  !
else
  echo "Using default NPM registry https://registry.npmjs.org/"
fi

echo "strict-ssl=false" >> ~/.npmrc

# Check if ~/.jspm/config exists. If it doesn't, pipe our config file template
# directly into the newly created file.
if [ ! -f $HOME/.jspm/config ]; then
  echo ".jspm/config does not exist. Creating..."
  if [ ! -d $HOME/.jspm ]; then
    mkdir $HOME/.jspm
  fi
cat >${HOME}/.jspm/config <<EOL
{
  "defaultTranspiler": "babel",
  "defaultRegistry": "jspm",
  "strictSSL": false,
  "registries": {
    "github": {
      "remote": "https://github.jspm.io",
      "handler": "jspm-github",
      "timeouts": {
        "lookup": 60,
        "build": 120
      },
      "maxRepoSize": 0
    },
    "npm": {
      "remote": "https://npm.jspm.io",
      "handler": "jspm-npm",
      "timeouts": {
        "lookup": 60,
        "build": 120
      }
    },
    "jspm": {
      "remote": "https://registry.npmjs.org/",
      "handler": "jspm-registry",
      "timeouts": {
        "lookup": 60,
        "build": 120
      }
    }
  }
}
EOL
else
  # If ~/.jspm/config does exist, simply update strictSSL to false with sed.
  sed -i.bak ' /strictSSL/ s/true/false/ ' $HOME/.jspm/config
fi

# This will allow JSPM to install private GitHub repos
if [ "$JSPM_GITHUB_AUTH_TOKEN" != "" ]; then
  jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
fi

## Configuration complete. Invoke the install.
cd /app

# Invoke our compile/watch/reload as the final command running in our container.
# Use dumb-init to run child processes under PID 1. https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/
npm install
dumb-init gulp

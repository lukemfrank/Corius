# <%= appName %>

1. [Dependencies](#dependencies)
1. [Quick Start](#quick-start)
1. [Configure NPM and JSPM](#configure-npm-and-jspm)
1. [NPM Scripts and Gulp Tasks](#npm-scripts-and-gulp-tasks)
1. [Authentication Service](#authentication-service)
1. [Additional Configuration](#additional-onfiguration)

## Dependencies
Please install these dependencies.
* [NodeJS](https://nodejs.org/en/) (we recommend [NVM](https://github.com/creationix/nvm) for OSX)
* [JSPM](http://jspm.io/)
* [Docker](https://docs.docker.com/engine/installation/)

## Quick Start
1. `docker-compose up`
2. Once the dev server starts, navigate to https://localhost

## Configure NPM and JSPM
If you want to use a private NPM registry set these environment variables:

```bash
  $ export NPM_REGISTRY=https://privaterRegistryHostName
  $ export NPM_USERNAME=luke.skywalker
  $ export NPM_PASSWORD=vaderIsMyDad!
  $ export NPM_EMAIL=usetheforce@jedi.org
```

If you want JSPM to install private GitHub repos first create a JSPM GitHub auth token.

```bash
  # Configure JSPM to install from private GitHub repos
  $ jspm registry config github

  # Display your GitHub config
  $ jspm registry export github
```

Copy the value of `jspm config registries.github.auth` and  set this environment variable:

```bash
  $ export JSPM_GITHUB_AUTH_TOKEN=yourtoken
```

They will be used by Docker Compose inside the UI container (refer to `docker-compose.yml` for details).

Docker will spin up 2 containers: 1 for the UI and another for Nginx (TLS and proxy).  This project will be mounted as a volume into the UI container and will automatically refresh your web browser when a source file changes.

## NPM Scripts
| Command | Description |
| ------- | ----------- |
| `$ npm run test` | run tests and exit |
| `$ npm run test:watch` | run tests and watch for file changes |
| `$ npm run build` | generate production distribution |

## Authentication Service
This application has built in authentication using a hosted authentication micro service. PKI certificates should be downloaded [here](https://s3.amazonaws.com/decipherers/test-certs.zip).  Each test certificate's password is literally the word `password`. Please install certificates accordingly into your web browser.

## Additional Configuration

### Increase max file limit on OSX
Running unit tests opens a lot of files, more than OSX's default settings can handle.  If you receive an error such as `Error: EMFILE: too many open files`, then you should increase the max number of open files.

```bash
  # edit sysctl
  $ sudo vim /etc/sysctl.conf

  # add these two lines
  $ kern.maxfiles=122880
  $ kern.maxfilesperproc=102400

  # reboot
  $ sudo reboot

  # verify new file limit
  $ sysctl kern.maxfiles
  $ sysctl kern.maxfilesperproc
```

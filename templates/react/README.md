## Run with Docker

- Add your credentials for [CTE NPM](https://npm.363-283.io/) and [GitHub](https://github.com/)
  - Copy `docker/npm-github-creds.template` to `docker/npm-github-creds.dev`
  - Add your NPM credentials to `npm-github-creds.dev`
  - In order for JSPM to install private GitHub repos do the following:
    - If you're using GitHub two factor authentication then disable it first but don't forget to re-enable afterwards.
    - `npm install -g jspm`
    - `jspm registry config github` and follow the prompts
    - `jspm registry export github` and copy the value of `jspm config registries.github.auth`
    - In `npm-github-creds.dev` set the value of `JSPM_GITHUB_AUTH_TOKEN` to the auth token
  Note: `npm-github-creds.dev` is git ignored to prevent credentials from being committed to the repo
- `docker-compose up`

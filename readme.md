[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/V9mM0t28rR)
![Lint](https://github.com/George9Waller/personal-website/actions/workflows/lint.yml/badge.svg)
![CI tests](https://github.com/George9Waller/personal-website/actions/workflows/ci.yml/badge.svg)

# Intro
This is the repo for my website hosted at [georgewaller.com](https://georgewaller.com).

It is built on the following stack
- [Nextjs](https://nextjs.org/) (written in TypeScript)
- [Prisma](https://www.prisma.io/) DB orm (postgres db hosted on [heroku](https://www.heroku.com/home)
- static files (images) stored in [aws s3](https://aws.amazon.com/s3/)
- authtentication provided by [next auth](https://next-auth.js.org/)
- [sentry](https://sentry.io/welcome/) for error detection
- [uptime robot](https://uptimerobot.com/) for site downtime detection
- testing using [playwright](https://playwright.dev/)

# Dev
- to run tests locally docker is used

## Github actions
2 actions are run on every PR against master:
1. Lint using `npm run lint`
2. CI which builds the project and runs all playwright tests

## Flows
### Local dev
For live server refresh: `npm run dev`

To build the project then run the server: `npm run build` then `npm run start:dev`

### Local Test
1. Build: `npm run docker:up` then `npm run build:test` (this step avoids building the project on every test run)
2. Run tests: `npm run test:local`
3. Docker down: docker will be closed automatically if all tests pass, alternativly use `npm run docker:down`

### Lint
To test run `npm run lint`

To fix run `npm run prettier:write`


## Env variables
| name | Description |
|--------|-------------|
| APP_ENV | set to `TEST` when testing to turn off sentry releases and enable test behaviour for authentication |
| AWS_ACCESS_KEY_ID | aws access key id |
| AWS_SECRET_ACCESS_KEY | aws access key secret |
| AWS_STORAGE_BUCKET_NAME | name of the storage bucket |
| AWS_UPLOAD_REGION | the region of the aws bucket e.g. `eu-west-2` |
| DATABASE_URL | url for postgres db |
| SHADOW_DATABASE_URL | url for a shadow db used by prisma when generating migrations |
| EMAIL_SEND_ACCOUNT | username for the email send account |
| EMAIL_SEND_ACCOUNT_PASS | password for the email send account |
| GOOGLE_CLIENT_ID | client id for google auth provider, see https://next-auth.js.org/providers/google for more details |
| GOOGLE_CLIENT_SECRET | google client secret |
| NEXTAUTH_URL | the url of the hosted site e.g. `http://localhost:8080` |
| NEXT_PUBLIC_SITE_URL | the url of the hosted site e.g. `http://localhost:8080` |
| SECRET_KEY | a secret string used for next auth |
| SENTRY_AUTH_TOKEN | token for sentry cli auth https://docs.sentry.io/api/auth/ |
| SENTRY_DSN | the dsn for your sentry account |
| SENTRY_IGNORE_API_RESOLUTION_ERROR | set to 1 - disables api resolving without returning a response, this is an existing bug with the project |
| SENTRY_ORG | your org name on sentry |
| SENTRY_PROJECT | the name of your sentry project |

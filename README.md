# Description

Challenge for Almedia Backend Position

## Notes

- I've implemented a Http server and as part of this server the offer job is working as a cron job
- Almost all the logical parts of the service has been tested.
- Each test is located beside its own code
- I have not implemented the part for storing the offers into a DB or fetching from DB because it was not mentioned to be part of the task.

## Prerequisites for running

- You need to have Node 18 and npm installed
- You will need to have the following port free:
  - `3000`

## Installtion

```bash
$ npm install
```

## Running the app directly

```bash
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
$ docker-compose build && docker-compose up
```

## Testing

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

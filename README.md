# Web Scraper

## Description

This project utilizes NestJS, PostgreSQL, and TypeORM to perform web scraping and store the discovered links within a provided URL. It provides an API that accepts a URL and saves all the found links in a PostgreSQL database.

## Installation

Before getting started, ensure that you have Node.js.

1. Clone the repository.

2. Navigate to the project directory:

```bash
cd web-scraper
```

3. Install the project dependencies:

```bash
$ yarn install
```

## Running the app

1. Run the data base:

```bash
docker-compose up -d
```

2. Run Nestjs app:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

UNLICENSED

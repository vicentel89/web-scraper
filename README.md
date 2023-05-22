# Web Scraper

## Description

This project utilizes NestJS, Cheerio, PostgreSQL, and TypeORM to perform web scraping and store the discovered links within a provided URL. It provides an API that accepts a URL and saves all the found links in a PostgreSQL database.

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

3. Navigate to `http://localhost:3000/`

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Tools Used:

- **NestJS**: A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
- **PostgreSQL**: A powerful open-source relational database management system.
- **TypeORM**: An object-relational mapping (ORM) library for TypeScript and JavaScript that simplifies database integration.
- **Axios**: A promise-based HTTP client for making HTTP requests.
- **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for server-side HTML parsing.
- **Jest**: A JavaScript testing framework for writing unit tests.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

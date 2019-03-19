# Harry Potter API

## How to use

To use this appplication we`ll need

[Postgres database](https://www.postgresql.org/download/);

[NodeJs](https://nodejs.org/en/download/)

[NPM](https://www.npmjs.com/get-npm);

### Setup

Create a database and set the database parameters in .env file and src/db/knexfile.js

To install dependencies Run `npm install`.

Create schema and tables by running `npm run db:migrate`.

Start the application running `npm start`

To run tests Run `npm test`.

### Endpoints

**/api/v1/characters**

  This will return all characters

* **Method:**

  `GET`

### Lint

To verify if any lint rule was broken run: `npm run lint`.



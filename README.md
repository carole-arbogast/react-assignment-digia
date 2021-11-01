# React Assignment for Digia

This project is a React coding assignment. The instructions can be found here: https://github.com/digiaonline/docs/tree/master/recruitment/html5

Demo link: https://react-assignment-digia.vercel.app/

## Starting the app

First, install the dependencies. In the project directory, you can run:

### `yarn` or `npm install`

Then, to start the application:

### `yarn start` or `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running tests

The application is tested with Cypress. To run the tests, you first need to start the server:

### `BROWSER=none yarn start` or `BROWSER=none npm start`

The option "BROWSER=none" will prevent the application from opening directly in your browser, since this is not necessary in this case.

Next, start Cypress:

### `yarn run cypress open`

Note: if you're using npm, please refer to the [official documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress) to start Cypress.

Once Cypress is open, you can choose which test suite to launch. For now there is only one called "index.spec.ts". All the tests will be run automatically in the browser you've selected.

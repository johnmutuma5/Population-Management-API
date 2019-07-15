[![Build Status](https://travis-ci.org/johnmutuma5/Population-Management-API.svg?branch=develop)](https://travis-ci.org/johnmutuma5/Population-Management-API)
[![Coverage Status](https://coveralls.io/repos/github/johnmutuma5/Population-Management-API/badge.svg?branch=develop)](https://coveralls.io/github/johnmutuma5/Population-Management-API?branch=develop)

# Population-Management-API
An API for the population management system. The system contains a list of locations and the total number of residents in each location broken down by gender.

The system provides an API that enables you to:

- Create a new location containing data on the total number of male and female residents within it.
  - Locations can be nested within other locations
- List all available locations and their population summaries (total male residents, total female residents, sum total residents)
- Update data for a specific locations
- Delete a specified location

## Running the Application
### Prerequisite

In order to run the application properly with these instructions, you'll need to have `docker` and `docker-compose` installed locally on your computer.

### Interact with the API
Use a client application of your choice to interact with the API.

You could use Postman or curl if you will, but the API exposes a it's Swagger Docs on here. You can comfortably use that on each endpoint by hitting the Try it Out button after you expand the endpoint documetation accordion.

#### Steps 
- Navigate into the project's root directory and run:
  - >  make run
  - In case you have a problem running with `make`, you can open the `Makefile` in this directory and run the rule for `run` in your terminal

## Running the Tests
After navigating to the project's root directory, run:

  - > make test

## Installing Dependencies
The project dependencies are meant to be auto-installed when the application container initialises. In case you need to manually install the dependecies in the container, you can do so by running the following command:
  - > make install

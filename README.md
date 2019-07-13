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

#### Steps 
- Navigate into the project's root directory and run:
  - >  make run
  - In case you have a problem running with `make`, you can open the `Makefile` in this directory and run the rule for `run` in your terminal

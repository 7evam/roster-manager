## ROFL-Roster-Manager

This project is help manage rosters in the Regiment of Fantasy Leagues.

### Install instructions

For this project, you'll need to have postgres, node and a package manager like yarn or NPM installed (the instructions below will assume you have yarn installed)

Once you have those installed and you've cloned this repo, install the packages with
    <yarn install>
Then initiate and seed the database with
    <yarn db:init>
    <yarn db:reset>
    <yarn db:seed>
Once the packages have been installed and the database is full of data, run
    <yarn dev>
To get the project up and running in dev mode on port 3000

As of 12/6/19, you must navigate to '/roster' to see the roster portion of the app

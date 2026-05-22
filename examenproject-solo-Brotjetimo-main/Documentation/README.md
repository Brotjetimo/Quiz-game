# Documentation
The dockerfile copy's the "node" font-end by copying the file directory. It also sets up an nginx server for local hosting by copying it out of the front-end and setting up a localhost at port 80.

The actual front-end and mysql server gets created in the docker-compose.yml file.

## installation
- To start this application make sure that you own docker desktop and composer.

## setup
- Firstly clone this repo from the github by using the folowing command: gitclone (repo ssh)
- When the envirement is accessable use the following command to start up the application: Docker compose up. This will create the nessasary containers to run the application.
- To stop the application run docker compose down.
- To view the front-end go to: Localhost:80 in your browser.
- For a rebuild docker of the docker containers the folowing command can be used: docker compose up --build
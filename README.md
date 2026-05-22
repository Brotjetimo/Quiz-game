# Welcome bij het project Quiz game

Dit is mijn laatste gemaakte project voor school, waarin ik tijdens het maken van een portfolio examen heb gewerkt aan een kleine opdracht. Het project was solo en heeft een maand geduurt, buiten alle weken fucussen op mijn portfolio. Deze codebase is een migratie van alle code, omdat mijn orginele repository onder mijn school staat.

Voor dit project heb ik de volgende programeer talen en frameworks gebruikt:

- React as the client with nodejs for the front-end
- Bun + typescript for the back-end
- Docker gekoppeld met mySQL als database.
- Css voor styling in verband met tijd.

## Startup:
The dockerfile copy's the "node" font-end by copying the file directory. It also sets up an nginx server for local hosting by copying it out of the front-end and setting up a localhost at port 80.

The actual front-end and mysql server gets created in the docker-compose.yml file.
installation

- To start this application make sure that you own docker desktop and composer.

setup

- First clone this repo from the github by using the folowing command: gitclone (repo ssh)
- When the envirement is accessable use the following command to start up the application: Docker compose up. This will create the nessasary containers to run the application.
- To stop the application run docker compose down.
- To view the front-end go to: Localhost:80 in your browser.
- For a rebuild docker of the docker containers the folowing command can be used: docker compose up --build

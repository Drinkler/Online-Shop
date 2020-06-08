# Online-Shop

[![GitHub](https://img.shields.io/github/license/drinkler/online-shop)](https://github.com/Drinkler/Online-Shop/blob/master/LICENSE)
![GitHub issues](https://img.shields.io/github/issues/drinkler/online-shop)
[![Build Status](https://travis-ci.com/Drinkler/Online-Shop.svg?branch=master)](https://travis-ci.com/Drinkler/Online-Shop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/70fc6e8580b84f6fb0f4671b40d0f867)](https://www.codacy.com/manual/Drinkler/Online-Shop?utm_source=github.com&utm_medium=referral&utm_content=Drinkler/Online-Shop&utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)](https://gitmoji.carloscuesta.me)

## Table of Content

- [Online-Shop](#online-shop)
  - [Table of Content](#table-of-content)
  - [Frontend](#frontend)
  - [Backend](#backend)
    - [:rocket: Deploy](#-deploy)
    - [:see_no_evil: .env file](#-env-file)
    - [:whale: Docker](#-docker)
  - [Database](#database)
    - [Deploy](#deploy)

## Frontend

[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/drinkler/microservices-frontend)](https://hub.docker.com/repository/docker/drinkler/microservices-frontend)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/drinkler/microservices-frontend/latest)

### :rocket: Deploy

Use following commands to create a local frontend instance.

```$ npm install```

After installing all dependencies you can run it locally using

```$ ng serve```

## Backend

### :rocket: Deploy

Use following commands to create a local Node.js backend server. The default port of the server is 3000. To configure the database connection and the port of the server, [create a .env file](#see_no_evil-env-file).

```bash
cd backend
npm install
npm start
```

### :see_no_evil: .env file

The .env file includes the database connection string, the Node.js server port and the [JSON Web Token](https://jwt.io/).  
To create a .env file for the backend, use following commands:

```bash
cd backend
# Bash
echo DB_CONNECTION="{Connection String}"$'\n'PORT={Port}$'\n'JWT_KEY="{jwt token}" > .env
# PowerShell
echo DB_CONNECTION="{Connection String}" >> .env  & echo PORT={Port} >> .env & echo JWT_KEY="{jwt token}" >> .env
```

After that, open the .env file and replace `{Connection String}`, `{Port}` and `{jwt token}` accordingly.


### :whale: Docker

[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/drinkler/microservices-backend)](https://hub.docker.com/repository/docker/drinkler/microservices-backend)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/drinkler/microservices-backend/latest)

The backend image can be found [here](https://hub.docker.com/repository/docker/drinkler/microservices-backend).

The docker version uses the same .env file as the normal version, expect the server port now is 8080.  
Use following command to create a backend image und execute it:

```bash
docker-compose up -d --build backend
```

To stop and delete the docker container run following command:

```bash
docker-compose down
```

You can also create the image with the [backend Dockerfile](https://github.com/Drinkler/Online-Shop/blob/master/backend/Dockerfile).

## Database

### Deploy

```bash
docker-compose up -d --build database
```

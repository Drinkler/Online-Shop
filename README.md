# Online-Shop

[![GitHub](https://img.shields.io/github/license/drinkler/online-shop)](https://github.com/Drinkler/Online-Shop/blob/master/LICENSE)
![GitHub issues](https://img.shields.io/github/issues/drinkler/online-shop)
[![Build Status](https://travis-ci.com/Drinkler/Online-Shop.svg?branch=master)](https://travis-ci.com/Drinkler/Online-Shop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/70fc6e8580b84f6fb0f4671b40d0f867)](https://www.codacy.com/manual/Drinkler/Online-Shop?utm_source=github.com&utm_medium=referral&utm_content=Drinkler/Online-Shop&utm_campaign=Badge_Grade)

## Frontend

[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/drinkler/microservices-frontend)](https://hub.docker.com/repository/docker/drinkler/microservices-frontend)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/drinkler/microservices-frontend/latest)

## Backend

### Deploy

```bash
cd backend
npm install
npm start
```

Default port is 3000.

### Create .env file

```bash
cd backend
```

Bash

```bash
echo DB_CONNECTION="{Connection String}"$'\n'PORT={Port} > .env
```

Windows PowerShell

```bash
echo DB_CONNECTION="{Connection String}" >> .env  & echo PORT={Port} >> .env
```

and replace `{Connection String}` and `{Port}`.

### Docker

[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/drinkler/microservices-backend)](https://hub.docker.com/repository/docker/drinkler/microservices-backend)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/drinkler/microservices-backend/latest)

#### Build local version

```bash
docker-compose up -d --build backend
```

After use:

```bash
docker-compose down
```

## Database

### Deploy

```bash
docker-compose up -d --build database
```

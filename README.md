# Tavernn

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Installation](#installation)
3. [Authentication](#authentication)
4. [Clubs](#clubs)
5. [Teams](#teams)
6. [Games](#games)
7. [Events](#events)
8. [Contributors](#contributors)

## Tech Stack
**Backend** : Spring Boot (Java)\
**Frontend** : React + Tailwind CSS\
**Database** : MySQL\
**Containerization** : Docker & Docker Compose

## Installation

### 1. Clone Repository
```bash
git clone git@rendu-git.etna-alternance.net:module-9881/activity-52948/group-1049409.git tavernn
cd tavernn
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory with the following contents and fill up the values:
```
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
VITE_API_URL=
```

_You can use `.env.example` as a starting point._

### 3. Build and Start the App
In your terminal run the following command :
```bash
docker-compose up --build
```

This will :
* Build and run the **backend** 
* Build the **frontend**
* Start a MySQL database

### 4. Access the App
**Frontend** : http://localhost:5173 \
**Backend API** : http://localhost:8080 \
**MySQL** : localhost:3306 (user and password from `.env`)

### 5. Stopping the App
To stop it : 
```bash
docker-compose down
```

To reset containers (optional) :
```bash
docker-compose down --volumes --remove-orphans
```

## Authentication
## Clubs
## Teams
## Games
## Events
## Contributors

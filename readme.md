## Installation

```bash
$ yarn install
```

## Running the application server

```bash
# production
$ yarn start

# watch mode
$ yarn start:dev
```

## Running the application on Docker
```bash
# production
$  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# watch mode
$  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```
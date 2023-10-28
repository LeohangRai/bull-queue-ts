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
$  docker-compose up --build -d

# watch mode
$  docker-compose -f docker-compose.dev.yml up -d
# NOTE: Pass the "--build" argument to the watch mode command whenever you have made changes to the Dockerfile or installed new dependencies
```

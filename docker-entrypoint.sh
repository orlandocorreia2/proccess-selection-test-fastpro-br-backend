#!/bin/sh

if [ -f .env ]; then
  echo "File exists"
else
  cp .env.example .env
  chmod 777 .env
fi

yarn install

yarn typeorm migration:run

yarn seed:config

yarn seed:run

# yarn dev:server

yarn start


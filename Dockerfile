FROM node:14.16.1

LABEL maintainer 'Orlando Nascimento <orlandocorreia2@hotmail.com>'

WORKDIR /usr/src/app

RUN apt-get update \
  && apt-get install -yq --no-install-recommends \
  nano \
  curl \
  git \
  unzip \
  && apt-get clean

COPY . .

COPY docker-entrypoint.sh /usr/local/bin

RUN chmod 777 /usr/local/bin/docker-entrypoint.sh

EXPOSE 8888

ENTRYPOINT ["docker-entrypoint.sh"]

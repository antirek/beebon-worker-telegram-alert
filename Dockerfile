FROM node:8.9

RUN mkdir -p /usr/src/app && \
    git clone https://github.com/antirek/beebon-worker-telegram-alert.git /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD [ "npm", "start" ]
FROM node:16-alpine

COPY dist .
COPY package.json .
COPY .env .

RUN npm install

ENTRYPOINT node main.js
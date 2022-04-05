
FROM node:16.13.1-alpine
RUN apk update

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
# COPY .env .
COPY src /app/src

RUN ls -a
RUN npm install
RUN npm run build

EXPOSE 7777

CMD [ "node", "./dist/index.js" ]

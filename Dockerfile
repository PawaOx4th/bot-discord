
FROM node:16.13.1-alpine
RUN apk update
ENV DISCORD_ID=957856528981975060
ENV DISCORD_TOKEN=SmFBBL-aXZtNdBmF89szLzQhwMNQXoysDbGLcYRjRaCb2knp_T1vORgxqt1ZNkCHlOIK
ENV SERVER=https://dev.pun.dev/healthzcheck
ENV MESSAGE="Cloud run."

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

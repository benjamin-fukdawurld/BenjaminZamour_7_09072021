FROM node:16

WORKDIR /usr/app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

VOLUME [ "/usr/app/images" ]

EXPOSE 5000

RUN apt-get update && apt-get install -y && yarn install && npm run build

CMD [ "node", "dist/server.js" ]

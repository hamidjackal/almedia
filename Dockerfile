FROM node:18.3.0-alpine3.14

WORKDIR /app

COPY ./package.json ./tsconfig.json ./tsconfig.build.json ./nest-cli.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]

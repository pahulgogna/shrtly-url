FROM node:20-alpine

WORKDIR /.

COPY ./package.json .

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "dist" ]
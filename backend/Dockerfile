FROM node:20-alpine

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
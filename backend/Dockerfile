FROM node:20-alpine

COPY package* .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=development

COPY . .

RUN npm install ts-node --save-dev

EXPOSE 5000

CMD ["npx", "nodemon", "src/server.js"]

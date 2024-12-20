FROM node:18.20.0-alpine3.18

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY .npmrc .
COPY . .
RUN npm install --production

RUN npm run build
CMD ["npm", "run", "production"]
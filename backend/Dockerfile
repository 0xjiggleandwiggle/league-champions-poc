FROM node:10 AS development

WORKDIR /app/backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]

FROM node:10 AS production

ENV NODE_ENV=production
WORKDIR /app/backend
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm","start"]

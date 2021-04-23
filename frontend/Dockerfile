FROM node:lts-alpine AS development
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

# build stage
FROM node:lts-alpine as build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN rm .env.production
RUN rm .env
RUN npm run build



# production stage
FROM nginx:stable-alpine as production
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY --from=development /app/frontend/entrypoint.sh /entrypoint.sh

EXPOSE 80
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

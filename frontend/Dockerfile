FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
# This image needs some setup for use, refer to the production docker compose file for reference
COPY nginx.conf /etc/nginx/nginx_original.conf
COPY nginx.conf /etc/nginx/nginx.conf

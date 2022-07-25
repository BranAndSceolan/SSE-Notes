FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN echo 'NODE_ENV=deployment' > .env
RUN env $(cat .env) npm run build
# builds js files in the parent directory's subfolder 'lib'

FROM node:latest as production-stage
RUN mkdir /app
COPY package*.json /app/
COPY --from=build-stage /lib /app
COPY --from=build-stage /app/.env /app/
# default config matches depkoyment config, some modules require a default config to exist
COPY config/deployment.json /app/config/
COPY config/default.json /app/config/
WORKDIR /app
RUN npm install --omit=dev
EXPOSE 8000
CMD ["node", "index.js"]
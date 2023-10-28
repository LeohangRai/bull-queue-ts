FROM node:18-alpine
WORKDIR /app
ADD package*.json ./
ADD yarn.lock ./
ARG NODE_ENV
RUN yarn
COPY . .
CMD [ "yarn", "start" ]
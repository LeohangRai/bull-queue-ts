# base image stage
FROM node:18-alpine AS base
WORKDIR /app
ADD package*.json ./
ADD yarn.lock ./
RUN yarn install
COPY . .
# the build folder (dist) is not required in the dev environment, this is just so that it can be copied in the production state image
RUN yarn build


# production stage
FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
ADD package*.json ./
ADD yarn.lock ./
RUN yarn install --production=true
COPY --from=base /app/dist ./dist
CMD [ "node", "dist/server.js" ]
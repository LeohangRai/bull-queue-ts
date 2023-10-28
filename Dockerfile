FROM node:18-alpine
WORKDIR /app
ADD package*.json ./
RUN yarn
COPY . .
CMD [ "yarn", "start" ]
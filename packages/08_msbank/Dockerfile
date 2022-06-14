FROM node:14

# Create app directory
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .

RUN yarn
COPY . ./
RUN yarn build


EXPOSE 8080


CMD [ "node", "apps/api/index.js" ]

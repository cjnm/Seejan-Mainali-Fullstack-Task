FROM node:16
WORKDIR /frontend
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD ["yarn", "start"]

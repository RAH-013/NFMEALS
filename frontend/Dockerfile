FROM node:22-bookworm

WORKDIR /react_app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
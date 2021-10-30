FROM node:15.12.0
WORKDIR .
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000
RUN npm i serve -g
CMD ["npm ", "start"]
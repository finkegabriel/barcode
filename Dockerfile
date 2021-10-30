FROM node:15.14.0
WORKDIR .
COPY package*.json ./

RUN npm install --force

COPY . .
EXPOSE 3000
CMD ["npm ", "start"]
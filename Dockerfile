FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2000
RUN psql -c "create database sdc-tf3"
CMD npm run build && npm run seed && npm start

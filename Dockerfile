FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2000
CMD npm run build && npm run seed:pg && npm start

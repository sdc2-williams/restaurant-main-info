FROM node:8
WORKDIR /usr/src/mainbar
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2000
RUN npm run build
CMD ["node", "./server/server.js"]

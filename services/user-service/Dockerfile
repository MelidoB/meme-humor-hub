FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --build-from-source
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]

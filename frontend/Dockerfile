FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY next.config.mjs ./
COPY app ./app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

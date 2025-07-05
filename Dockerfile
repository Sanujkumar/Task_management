
FROM node:18-alpine


WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install


COPY . .



RUN npx prisma generate
RUN npm run build  

EXPOSE 3000
CMD ["npm", "start"]  
  
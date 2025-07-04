# 1. Use official Node.js image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install build tools (for bcrypt)
RUN apk add --no-cache python3 make g++

# 4. Copy package files and install deps
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install

# 5. Copy rest of the code
COPY . .

# 6. Build the project
RUN npx prisma generate
RUN npm run build  

# 7. Expose port and start
EXPOSE 3000
CMD ["npm", "start"]  
  
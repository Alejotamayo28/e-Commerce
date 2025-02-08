# Etapa de construcción
FROM node:22-alpine AS builder  
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa final
FROM node:22-alpine  
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY .env ./
EXPOSE 3000
CMD ["npm", "start"]

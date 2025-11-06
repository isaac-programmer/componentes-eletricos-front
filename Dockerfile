FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /app/public ./public
        
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]
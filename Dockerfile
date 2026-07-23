FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_TOKEN_KEY
ARG NEXT_PUBLIC_REFRESH_TOKEN_KEY
ARG NEXT_PUBLIC_USER_PASSWORD_DEFAULT

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_TOKEN_KEY=${NEXT_PUBLIC_TOKEN_KEY}
ENV NEXT_PUBLIC_REFRESH_TOKEN_KEY=${NEXT_PUBLIC_REFRESH_TOKEN_KEY}
ENV NEXT_PUBLIC_USER_PASSWORD_DEFAULT=${NEXT_PUBLIC_USER_PASSWORD_DEFAULT}

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
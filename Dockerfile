FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json . 
COPY prisma ./prisma/
RUN apk add --no-cache openssl openssl-dev
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache openssl openssl-dev
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/prisma/ prisma/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production

CMD ["sh", "-c", "npx prisma migrate deploy && npm run wiki-pull && node build"]
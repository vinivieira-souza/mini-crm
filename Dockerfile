FROM node:20-bookworm-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

RUN mkdir -p /app/data
RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 3000

ENV NODE_ENV=production

ENTRYPOINT ["/app/docker/entrypoint.sh"]

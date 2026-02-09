FROM node:alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /usr/src

COPY . . 

EXPOSE 5000

RUN npm i
RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npm run migration:run && node dist/src/server.js"]
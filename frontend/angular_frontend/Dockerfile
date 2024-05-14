# Builder container to compile typescript
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
 
# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
 
# Copy the application source
COPY . .
# Build typescript
RUN npm run build

EXPOSE 4200

CMD [ "ng", "serve" ]
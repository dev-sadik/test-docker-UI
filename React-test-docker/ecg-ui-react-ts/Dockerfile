#Dev Environment
FROM node:16.13.2-alpine AS dev
WORKDIR /app

COPY  . .
RUN npm install
EXPOSE 3000    
CMD npm start

FROM node:16.13.2-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build  

#Prod environment
FROM nginx:alpine AS prod  
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g "daemon off;"

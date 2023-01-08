FROM node:10.16.3-alpine

WORKDIR /var/www/
COPY ./ /var/www 
RUN yarn install
RUN yarn build
 
EXPOSE 3000

CMD ["node", "server/index.js"]


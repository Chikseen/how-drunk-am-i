FROM node:slim
WORKDIR /usr/local/how-drunk-am-i
COPY . .
EXPOSE 3000
CMD cd findit && npm run serve

FROM node:18

WORKDIR /usr/src/app
COPY . .

#install dependencies
RUN npm install
#install typescript globally inside container
RUN npm install typescript
#since development on windows, you need to create a new prisma migration inside the container
RUN npx prisma generate
#typescript -> javascript
RUN npm run build
#run script
CMD ["npm","start"]
#expose port from .env
EXPOSE 3000
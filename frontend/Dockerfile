#using base image as node:20
FROM node:20

#setting working directory as /app
WORKDIR /app

#copying package.json and package-lock.json
COPY package*.json ./

#install all the dependencies
RUN npm install

#copy all the application files in working directory
COPY . .

#build the app
RUN npm run build

#exposing the app on port 5173
EXPOSE 5173

#running the app
CMD ["npm","run","dev"]


# Stage 1: Build the React application using Node.js 22
FROM node:22-alpine AS builder

#setting working directory as /app
WORKDIR /app

#copying package.json and package-lock.json
COPY package*.json ./

#install all the dependencies
RUN npm ci

#copy all the application files in working directory
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
#build the app
RUN npm run build
#++++++++++++++++++++++++++
#STAGE 2: Serve the Static Files
#++++++++++++++++++++++++++
FROM nginx:stable-alpine

RUN apk upgrade --no-cache

WORKDIR /app

# Copy the compiled production assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

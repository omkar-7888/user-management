#using base image as node:20
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
FROM node:22-alpine

WORKDIR /app

RUN npm install -g vite@8 && npm cache clean --force

# Copy the compiled production assets from the builder stage
COPY --from=builder /app/dist ./dist
EXPOSE 5173

CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "5173"]

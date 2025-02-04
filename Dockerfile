FROM node:18

WORKDIR /app

# Copy package files from maplibre-storymap subdirectory
#COPY maplibre-storymap/package*.json ./
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev --no-audit

# Copy the rest of the application from maplibre-storymap subdirectory
#COPY maplibre-storymap/ .
COPY . .

EXPOSE 5000
CMD ["npm", "run", "serve"]
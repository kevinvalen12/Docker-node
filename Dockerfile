FROM node:22-alpine

# Instalamos dependencias necesarias para compilar algunos módulos de Node si fuera necesario
RUN apk add --no-cache libc6-compat

WORKDIR /app

#instalamos dependencias
COPY package*.json ./

RUN npm install

## copia el resto del codigo 
COPY . .

#puerto
EXPOSE 3000

CMD ["npm", "run", "dev"]
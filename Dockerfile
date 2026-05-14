FROM node:22-alpine

# Instalamos dependencias necesarias para compilar algunos módulos de Node
RUN apk add --no-cache libc6-compat

# Habilitamos corepack para usar pnpm directamente
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiamos archivos de dependencias
COPY package.json .npmrc ./

#Instalar dependencias
COPY pnpm-lock.yaml* ./

# Instalamos dependencias (sin scripts) y luego reconstruimos esbuild explícitamente
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm rebuild esbuild

# Copia el resto del código 
COPY . .

# Puerto
EXPOSE 3000

# Comando para desarrollo con hot-reload
CMD ["pnpm", "run", "dev"]
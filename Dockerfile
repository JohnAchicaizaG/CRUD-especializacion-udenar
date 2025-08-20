# Usar Node.js 22 como imagen base (última LTS)
FROM node:22-alpine3.20

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar el código fuente
COPY . .

# Copiar el archivo de entorno para Docker
COPY .env.docker .env

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
# Usa una imagen base oficial de Node.js para la construcción
FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json si está presente
COPY package.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente (src, public, etc.)
COPY . .

# Construye el proyecto de React
RUN npm run build

# Usa una imagen de Nginx para servir el proyecto estático
FROM nginx:alpine

# Copia los archivos de build generados en la etapa anterior a Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80 para servir la app
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

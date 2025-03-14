# Usa una imagen base oficial de Node.js
FROM node:16

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias al contenedor
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del backend
COPY . .

# Expone el puerto en el que la app escuchará
EXPOSE 3000

# Comando para iniciar el servidor de backend
CMD ["node", "src/server.js"]

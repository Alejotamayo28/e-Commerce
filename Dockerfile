# Usa una imagen base de Node.js versión 22.13.1
FROM node:22.13.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de producción y desarrollo (necesitamos TypeScript para compilar)
RUN npm install

# Copia el resto del código fuente (incluyendo los archivos TypeScript)
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Copia el archivo .env al contenedor (asegúrate de que esté en el mismo directorio que el Dockerfile)
COPY .env .

# Comando para ejecutar la aplicación
#CMD ["npm", "run", "start"]

# In your Dockerfile or entrypoint script
CMD ["npm", "start"]

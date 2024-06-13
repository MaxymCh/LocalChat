# Utiliser l'image officielle de Node.js comme base
FROM node:22.3.0

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 4000

# Démarrer l'application
CMD ["node", "index.js"]
# 1️⃣ Build Vue
# Docker télécharge une image Linux minimale avec Node.js 20 + npm lui donne le nom interne build
FROM node:20-alpine AS build

# Définit le répertoire courant dans le container Si /app n’existe pas → Docker le crée
WORKDIR /app
# copier package.json package-lock.json les copie dans le container /app
COPY package*.json ./
# la commande est exécuté dans le container : télécharger les dépendances et créer /app/node_modules
RUN npm install

# copie le reste du projet (src/ vite.config.js tsconfig.json etc...) dans /app
COPY . .
# Lance Vite, Transforme Vue → HTML / JS / CSS et génère le dossier : /app/dist
RUN npm run build

# 2️⃣ Serve via Nginx
# Docker télécharge une image Linux minimale avec Nginx
FROM nginx:alpine

# copier mon fichier nginx.conf dans /etc/nginx/conf.d/ pour remplacer la config par défaut de Nginx default.conf
# dans le nginx.conf nous avons défini SPA routing (index.html) /api reserve proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf
# docker va dans l'image build et prend /app/dist et copie dans l'image Nginx
# cad dans /usr/share/nginx/html on verra index.html et assets/
COPY --from=build /app/dist /usr/share/nginx/html

# ensuite la commande : CMD ["nginx", "-g", "daemon off;"] va démarrer Nginx en mode premier plan

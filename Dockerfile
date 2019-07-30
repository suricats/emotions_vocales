FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /emotions_vocales

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL
ARG VUE_APP_API_KEY
ENV VUE_APP_API_KEY $VUE_APP_API_KEY
ARG VUE_APP_MDP
ENV VUE_APP_MDP $VUE_APP_MDP

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
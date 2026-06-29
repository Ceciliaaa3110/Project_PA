FROM node:22    

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


# Questo file dice a Docker come costruire l'ambiente dove deve girare il backend:
# - deve partire da un'immagine pronta con NOde.js versione 22
# - deve creare la cartella di lavoro nel container cioè app
# - deve copiare dentro il container i file package per capire quali dipendenze considerare
# - deve installare tali dipendenze nel container
# - deve copiare tutto il progetto restante nel container
# - gli viene comunicato che l'applicazione usa la porta 3000
# - deve eseguire il comando "npm run dev" per avviare il backend e deve ricompilare sqlite3 all'interno del container Linux
# (il container del backend è contenuto in quello Linux fornito dall'immagine 22 di default)
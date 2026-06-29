import "dotenv/config"; // caricamento della variabile d'ambiente dal file .env
import sequelize from "../config/database"; // import dell'istanza di connessione al database
import bcrypt from "bcrypt"; // import della libreria per cifrare le password
import User from "../auth/User"; // import del modello utenti

/**
 * la funzione seed inizializza il database creando, se assente, un utente amministrativo di default.
 */

async function seed() {

  // la funzione sincronizza i modelli con il daatabase
  await sequelize.sync();

  // in hashedPassword salva l'hash della password "admin123" una volta generato
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // cerca attraverso il metodo sequelize un utente con username admin, e se non esiste lo crea secondo
  // i valori riportati di seguito
  await User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      password: hashedPassword,
      role: "ADMIN"
    }
  });
  // la funzione quindi stampa un messaggio di corretta esecuzione delle operazioni
  console.log("Utente admin creato correttamente");
  // tale comando termina l'esecuzione dello script e restituisce al sistema operativo il codice di uscita 0 (=operazione conclusa con successo) 
  process.exit(0);
}
// questo comando avvia l'inizializzazione del database
seed();
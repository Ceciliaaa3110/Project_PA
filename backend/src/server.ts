import "dotenv/config"; // per eseguire il pacchetto dotenv
import app from "./app"; // per importare l'app Express
import sequelize from "./config/database"; // per preparare la connesione con database SQLite

// definizione della porta sulla quale il server deve rimanere in ascolto
const PORT = 3000;

/**
 * l'istanza Sequelize sincronizza i modelli definiti dall'applicazione (User, TrafficAnalysis, BlockedIP) con il database.
 * Se la connessione viene eseguita correttamente, l'app Express viene avviata e il server viene. posto in ascolto sulla porta stabilita.
 * In caso di errore, tale errore viene stampato sul terminale. 
 */

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);  
    });
  })
    .catch(err => {
      console.error("Erroe durante la connesione al database, err");

    });

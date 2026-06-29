import { Sequelize } from "sequelize"; // import della classe Sequelize

/**
 * creazione dell'istanza Sequelize utilizzata per le connesioni al database SQLite.
 */
const sequelize = new Sequelize({
  
  // Definizione del DBMS
  dialect: "sqlite",
  // locazione del database (in che file si trova)
  storage: "database.sqlite",
  // Disabilitazione della visualizzazione della query SQL sul terminale
  logging: false,
}); 

// esportazione dell'istanza Sequelize
export default sequelize;
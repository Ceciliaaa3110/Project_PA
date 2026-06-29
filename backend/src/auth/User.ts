import { DataTypes } from "sequelize"; // import dei tipi di dato che Sequelize mette a disposizione
import sequelize from "../config/database"; // import dell'istanza Sequelize configurata per la connessione al database

/**
 * Definizione del modello User: tale modello rappresenta la tabella del database SQLite 
 */
const User = sequelize.define("User", {
  
  // definizione del campo username
  username: {
    type: DataTypes.STRING,
    allowNull: false, //non puo essere assente
    unique: true // deve essere unico
  },

   // definizione del campo password
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

   // definizione del campo role
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// esportazione del modello User
export default User;
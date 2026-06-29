import { DataTypes } from "sequelize"; // import dei tipi di dato messi a disposizione da Sequelize
import sequelize from "../config/database"; // import dell'istanza sequelize associata alla connessione col database

/**
 * Definizione del modello sequelize TrafficAnalysis, che rappresenta la tabella del database deputata alla memorizzazione
 * dgli indirizzi IP temporaneamente bloccati con relativa motivazione.
 */
const BlockedIp = sequelize.define("BlockedIp", {
  sourceIp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
// esportazione del modello sequelize BlockedIp
export default BlockedIp;
import { DataTypes } from "sequelize"; // import dei tipi di dato messi a disposizione da Sequelize
import sequelize from "../config/database"; // import dell'istanza sequelize associata alla connessione col database

/**
 * Definizione del modello sequelize TrafficAnalysis, che rappresenta la tabella del database deputata alla memorizzazione
 * dei risultati delle analisi di traffico.
 */

const TrafficAnalysis = sequelize.define("TrafficAnalysis", {
  sourceIp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  packets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bytes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  classification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  decision: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
// esportazione del modello sequelize TrafficAnalysis
export default TrafficAnalysis;
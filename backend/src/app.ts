import express from "express";
import detectionRoutes from "./detection/detectionRoutes";
import adminRoutes from "./admin/adminRoutes";
import authRoutes from "./auth/authRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

// creazione dell'istanza dell'applicazione Express
const app = express();

// Express registra il middleware che per leggere il body JSON delle richieste HTTP che gli arrivano
app.use(express.json());

/**
 * Express registra i router (che contengono le varie rotte, categorizzate) dell'applicazione con il prefisso /api.
 * Poi costruisce l'endpoint associato alla richeista HTTP arrivatagli
 * unendo:
 *   prefisso /api + percorso singola rotta (es. /auth/login) = POST /api/auth/login
 */

app.use("/api", adminRoutes);

app.use("/api", detectionRoutes);

app.use("/api", authRoutes);


// Express registra il middleware globale per il rilevamento e la gestione degli errori
app.use(errorMiddleware);

// Express esporta l'istanza dell'applicazione, per permettergli di essere importata e avviata nel file server.ts
export default app;

/**
 * Express si occupa quindi di:
 * - ricevere le richieste HTTP
 * - individuare la rotta corretta
 * - eseguire i middleware
 * - chiamare i controller (che a loro volta implementano i servizi che possono o meno servirsi dei repository)
 * - mettere a disposizione delle tipologie di interfacce 
 */
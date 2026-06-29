import { Request, Response } from "express"; // Import delle interfacce di Express
import AdminService from "./AdminService"; // import del servizio che implementa la logica amministrativa

/**
 * AdminController è un controller che riceve le richieste HTTP provenienti dalle route di amministrazione
 * e delega le operazioni ad esse associate all'AdminService, restituendo le risposte al client.
 * Esso si costiuisce di 3 funzioni esportabili anzichè di una classe perchè ogni funzione gestisce una 
 * richiesta HTTP indipendente dalle altre. Ogni funzione ha quindi un determinato grado di responsabilità, 
 * associabile ad ogni singola rotta.
 */



/**
 * la funzione clearCache gestisce la richiesta di svuotamento della cache
 */

export function clearCache(
  req: Request,
  res: Response
) {
  // la funzione delega lo svuotamento all'AdminService
  AdminService.clearCache();

  // poi restituisce un JSON con il messaggio di avvenuta cancellazione
  res.json({
    message: "Cache svuotata"
  });
}


/**
 * la funzione getStatistics gestisce la richiesta di visualizzazione delle statistiche rappresentative della cache
 */
export function getStatistics(
  req: Request,
  res: Response
) {

  // le statistiche vengono prelefate dall'adminService
  const statistics = AdminService.getStatistics();

  // le statistiche sono restituite al client in formato JSON
  res.json(statistics);
}

/**
 * la funzione getTrafficAnalysis gestisce la richiesta dello storico delle detection
 */
export async function getTrafficAnalysis(
  req: Request,
  res: Response
) {

  // la funzione attende che Admin service recuperi tutte le analisi di traffico e le salvi in trafficAnalysis 
  const trafficAnalysis =
    await AdminService.getTrafficAnalysis();

  // la funzione quindi restituisce al client l'elenco delle analisi di traffico in formato JSON
  res.json(trafficAnalysis);
}
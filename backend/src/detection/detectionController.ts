import { Request, Response } from "express"; // import delle interfacce 2 interfacce fornite da Express
import DetectionService from "../detection/DetectionService"; // import del servizio che implementa la logica di detection del traffico

/**
 * la funzione detect esportabile gestisce la richiesta di analisi del traffico: riceve i dati inviati 
 * dal client e poi delega l'analisi al DetectionService per poi restiuire il risultato dell'elaborazione
 * cioè la classification.
 */
export async function detect(
  req: Request,
  res: Response
) {

  // blocco try-catch per la gestione degli errori di analisi
  try {

    // la funzione richiede al servizio di analizzare i dati contenuti nel body della richiesta 
    const result = await DetectionService.analyze(req.body);
    // Express poi restituisce il risultato dell'analisi in formato JSON
    res.json(result);
  } catch {
    // in caso di errore restituisce una risposta HTTP 500
    res.status(500).json({ error: "Errore durante l'analisi del traffico" });
  }
}

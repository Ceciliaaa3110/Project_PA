import { Request, Response, NextFunction } from "express"; // import delle 3 interfacce fornite da Express
import DetectionService from "../detection/DetectionService"; // import del servizio che implementa la logica di detection del traffico

/**
 * la funzione detect esportabile gestisce la richiesta di analisi del traffico: riceve i dati inviati 
 * dal client e poi delega l'analisi al DetectionService per poi restiuire il risultato dell'elaborazione
 * cioè la classification.
 */
export async function detect(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // blocco try-catch per la gestione degli errori di analisi
  try {

    // la funzione richiede al servizio di analizzare i dati contenuti nel body della richiesta 
    const result = await DetectionService.analyze(req.body);
    // Express poi restituisce il risultato dell'analisi in formato JSON
    res.json(result);
  } catch (error) {
    next(error); // se si verifica uun errore durante l'analisi, l'errore viene inoltrato all'errorMiddleware tramite next() da Express
  }
}

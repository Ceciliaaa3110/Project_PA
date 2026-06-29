import { Request, Response, NextFunction } from "express"; //import dei 3 tipi di interfaccia messi a disposizione da Express

/**
 * Definizione della funzione errorMiddleware per essere poi esportata in modo predefinito in altri file.
 * La funzione intercetta gli errori generati durante l'elaborazione delle richieste , li registra nella conosole, e poi
 * resistuisce una risposta HTTP 500 al client
 */

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); //registrazione dell'errore sulla console

  // restituzione della risposta HTTP 500 al client
  res.status(500).json({
    error: err.message || "Errore interno del server"
  });
}
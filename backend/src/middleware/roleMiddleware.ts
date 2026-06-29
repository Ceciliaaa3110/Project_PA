import { Request, Response, NextFunction } from "express"; //import dei 3 tipi di interfaccia messi a disposizione da Express

/**
 * definizione del middleware che verifica che l'utente autenticato possieda il ruolo richiesto, ricevendo in input il requiredRole
 */
export default function roleMiddleware(requiredRole: string) {
  // restituisce la funzione che poi viene salvata da Express, che viene eseguita ogni volta che una richiesta necessita di validazione.
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // in user riprende la proprietà user, che conteneva ciò che era stato creato in AuthMiddleware
    const user = (req as any).user;

    // se role non vale "admin" la funzione restituisce una risposta HTTP 403 al client
    if (user.role !== requiredRole) {
      return res.status(403).json({
        error: "Permessi insufficienti"
      });
    }
    // se role è admin allora il flusso continua.
    next();
  };
}
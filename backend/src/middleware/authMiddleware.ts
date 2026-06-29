import { Request, Response, NextFunction } from "express"; //import dei 3 tipi di interfaccia messi a disposizione da Express
import jwt from "jsonwebtoken"; //libreria che serve a creare il JSON web Token

// definzione del middleware di autenticazione (deve proteggere gli endpoint riservati)
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // authHeader contiene il campo authorization dell'header HTTP (contenente il token)
  const authHeader = req.headers.authorization;

  // se qeusto campo manca, viene restituita la risposta HTTP 401 al client 
  if (!authHeader) {
    return res.status(401).json({ error: "Token mancante" });
  }
  // se il campo è presente, l'header si divide in componente Bearer e componente token
  const parts = authHeader.split(" ");

  // se il formato e l'ordine dei componenti non è conforme viene restituita la risposta HTTP 401 al client 
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token non valido" });
  }
  // se tutto è conforme, viene estratto il token JWT che corrisponde al 2° elemento dell'array 
  const token = parts[1];
  // in secret viene ripresa la chiave segreta che serve per firmare il token
  const secret = process.env.JWT_SECRET;

  // se la chiave segreta non è configurata, viene restituita la risposta HTTP 500 al client
  if (!secret) {
    return res.status(500).json({
      error: "Chiave segreta non configurata"
    });
  }
  // se la chiave segreta è presente, viene verificata la validità del token
  try {
    // se il token è valido viene restituito il suo contenuto e salvato in decoded
    const decoded = jwt.verify(token, secret);

    // dentro l'oggetto req di Express viene creata una nuova proprietà (user) che contiene ciò che è salvato in decoded
    (req as any).user = decoded;

    // la funzione next induce l'avvio del componente successivo
    next();
  } catch {
    return res.status(401).json({ error: "Token non valido" }); //se il try non va a buon fine viene restituita la risposta HTTP 401 al client
  }
}

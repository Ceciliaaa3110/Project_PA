import { Request, Response } from "express"; //import di 2 tipi di interfaccia messi a disposizione da Express

import AuthService from "./AuthService"; // import del service contenente la logica di login


/**
 * Definizione della funzione login per essere poi esportata in modo predefinito in altri file.
 * La funzione viene eseguita all'arrivo di una richiesta HTTP di tipo POST /api/auth/login ed i paramentri ad essa associati sono 
 * i tipi di interfaccia forniti da Express.
 * Tale funzione gestisce la richiesta di autenticazione dell'utente, recuperando username e password dal body della richiesta,
 * e delega la verifica delle credenziali al servizio AuthService.
 * Poi restituisce al client il token generato.
 */

export async function login(req: Request, res: Response) {
  
  // estrazione delle credenziali dal body della richiesta
  const { username, password } = req.body;

  // verifica delle credenziali ed eventuale produzione del token per mano di AuthService
  const token = await AuthService.login(username, password);

  // restituzione il formato JSON del token al client
  res.json({ token });
}
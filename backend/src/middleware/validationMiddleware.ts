import { Request, Response, NextFunction } from "express"; //import dei 3 tipi di interfaccia messi a disposizione da Express


/**
 * Definizione della funzione validationMiddleware dei dati ricevuti nella richiesta HTTP.
 * La funzione controlla che nel body siano presenti i campi necessari per effettuare l'analisi di traffico. 
 */

export default function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    //Eestrazione del body della richiesta HTTP e destrutturazione dell'oggetto
    const { sourceIp, packets, bytes, synPacketsCount } = req.body;

    // Verifica se uno o più campi obbligatori sono assenti
    if (
        !sourceIp ||
        packets === undefined ||
        bytes === undefined ||
        synPacketsCount === undefined
    ) {
        // in caso affermativo restituisce una risposta HTTP 400 al client
        return res.status(400).json({
            error: "Campi mancanti"
        });
    }

    // se la validazione ha esito positivo, il flusso di operazioni procede nei confronti del blocco successivo
    next();
}
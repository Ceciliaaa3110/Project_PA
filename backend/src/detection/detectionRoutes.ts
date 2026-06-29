import { Router } from "express"; // import del router fornito da Express
import validationMiddleware from "../middleware/validationMiddleware"; // import del middleware che valida i dati della richiesta 
import { detect } from "./detectionController"; // import della funzione detect definita in detectionController

// creazione del router dedicato alla gestione delle richieste di detection
const router = Router();

/**
 * registrazione da parte di Express della rotta POST /api/detection, associandola prima all'applicazioine 
 * del validationMiddleware e poi della funzione detect nell'eventualità che i dati fossero validi.
 */
router.post(
    "/detection",
    validationMiddleware,
    detect
);

// esportazione del router
export default router;
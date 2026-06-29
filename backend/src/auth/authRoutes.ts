import { Router } from "express"; //import del costruttore router di Express
import { login } from "./authController"; // import della funzione login definita in AuthController.ts

// Creazione del router dedicato alla gestione dell'autenticazione
const router = Router();

// registrazione da parte di Express della rotta POST /api/auth/login associandola alla funzione login del controllore
router.post("/auth/login", login);

// esportazione del router dedicato all'autenticazione per riutilizzarlo nell'app Express
export default router;
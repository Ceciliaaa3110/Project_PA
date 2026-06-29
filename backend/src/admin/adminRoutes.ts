import { Router } from "express"; // import del router di Express
import {
  clearCache,
  getStatistics,
  getTrafficAnalysis
} from "./adminController"; // import delle funzioni del controller

/**
 * Import dei middleware per le autorizzazioni
 */
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

// creazione di un nuovo router dedicato alle funzionalità amministrative
const router = Router();

// Registrazione della route DELETE /admin/cache: prima si verifica il token JWT
router.delete(
  "/admin/cache",
  authMiddleware,
  roleMiddleware("ADMIN"),
  clearCache
);

// registrazione della route GET /admin/statistics 
router.get(
  "/admin/statistics",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStatistics
);

// registrazione ella route GET /admin/analysis
router.get(
  "/admin/analysis",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getTrafficAnalysis
);

// esportzione del router
export default router;
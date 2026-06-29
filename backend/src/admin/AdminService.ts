import CacheManagerService from "../detection/CacheManagerService"; // import del servizio che gestisce la cache
import TrafficAnalysisRepository from "../detection/TrafficAnalysisRepository"; // import del repository delle analisi di traffico

/**
 * L'AdminService contiene la logica delle operazioni amministrative.
 * Ogni metodo definito al suo interno viene poi richiamato dall'AdminController.
 */
class AdminService {


  /**
   * il metodo clearCache svuota completamente la cache.
   */
  clearCache() {
    // per farlo delega lo svuotamento della cache al CacheManagerService
    CacheManagerService.clear();
  }


  /**
   * il metodo getStatistics restituisce tutte le statistiche contenute nella cache.
   */
  getStatistics() {
    // per farlo recupera tutte le statistiche dal servizio che gestisce la cache
    return CacheManagerService.getAllStatistics();
  }


  /**
   * il metodo getTrafficAnalysis recupera tutte le analisi di traffico salvate nel database
   */
  async getTrafficAnalysis() {
    // delega al repository il recupero di tutte le analisi presenti nel database, ma tale operazione richiede tempo
    return await TrafficAnalysisRepository.findAll();
  }

}
// esportazione di un'istanza del servizio
export default new AdminService();
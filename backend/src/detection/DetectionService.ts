/**
 * Import dei servizi, dei repository e dei tipi da utilizzare per la detection del traffico e la gestione 
 * dei risultati.
 */
import RuleBasedClassifier from "./RuleBasedClassifier";
import DecisionService from "./DecisionService";
import CacheManagerService from "./CacheManagerService";
import TrafficAnalysisRepository from "./TrafficAnalysisRepository";
import BlockedIpRepository from "./BlockedIpRepository";
import { TrafficDecision } from "./trafficTypes";

/**
 * servizio che implementa la logica di analisi del traffico, in quanto coordina:
 * - la classificazione del traffico
 * - il processo di decisione da applicare
 * - la memorizzazione dei risultati
 * - l'eventuale misura di blocco temporaneo dell'IP fonte di traffico anomalo
 * 
 */
class DetectionService {
  
  /**
   * il metodo analyze riceve il parametro data = req.body proveniente dal DetecitonController
   */
  async analyze(data: any) {
    
    // analyze estrae l'IP dai dati ricevuti
    const sourceIp = data.sourceIp;

    // verifica quindi se l'IP risulta già bloccato in cache
    if (CacheManagerService.isBlocked(sourceIp)) {
      // se sì restituisce il risultato immediatamente senza eseguire una nuova analisi
      return {
        cached: true, 
        classification: "BLOCKED",
        decision: TrafficDecision.TEMP_BLOCK
      };
    }
    // altrimenti aggiorna il numero di richieste assocaite all'IP in cache
    CacheManagerService.updateRequestCount(sourceIp);

    // classifcazione del traffico sulla base delle regole definite dal classifier
    const classification = RuleBasedClassifier.classify(data);
    
    // in base alla classifiacazione ottenuta il DecisionService determina la decisione
    const decision = DecisionService.decide(classification);

    // analyze quindi salva nel database i risultati ottenuti servendosi del Repository 
    await TrafficAnalysisRepository.save(data, classification, decision);

    // se la decisione prevede un blocco temporaneo, il servizio CacheManager aggiorna la cache registrando il blocco
    if (decision === TrafficDecision.TEMP_BLOCK) {
    CacheManagerService.blockTemporarily(sourceIp);
    // nel mentre la repository associata all'elenco degli IP bloccati viene aggionrata
    await BlockedIpRepository.save(sourceIp, classification);
    }

    // analyze quindi restituisce al controller il risultato dell'analisi 
    return {
      cached: false,
      classification,
      decision
    };
  }
}

// esportazione di un'istanza del servizio
export default new DetectionService();








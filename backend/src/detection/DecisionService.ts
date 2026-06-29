import { TrafficDecision, TrafficType } from "./trafficTypes"; // import delle enumerazioni contenenti le possibili classificazioni di traffico e le decisioni da applicare

/**
 * DecisionService è il servizio che determina la decisione da applicare in base alla classificazione del traffico.
 */

class DecisionService {
  
    /**
     * decide è il metodo usato per eseguire la decisione: esso riceve una classificazione e stabilisce in base ad essa
     * che decisione applicare, basandosi sullo switch-case
     */
    decide(classification: string): string {
        
    switch (classification) {
      case TrafficType.DOS:
        return TrafficDecision.TEMP_BLOCK; //il traffico DOS induce un blocco temporaneo

      case TrafficType.BRUTE_FORCE:
        return TrafficDecision.ALERT; // il traffico bruteforce induce un altert

      case TrafficType.BENIGN:
      default:
        return TrafficDecision.ALLOW; // il traffico benigno viene autorizzato
    }
  }
}

export default new DecisionService();
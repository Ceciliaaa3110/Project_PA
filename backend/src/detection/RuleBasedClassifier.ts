import { Classifier } from "./Classifier"; // import dell'interfaccia classifier
import { TrafficType } from "./trafficTypes"; // import delle enumerazioni contenenti le possibili classificazioni di traffico


/** 
 * RuledBasedClassifier è il classificatore scelto che implemental'interfaccia classifier e determina
 * la classificazione del traffico in base ai valori ricevuti.
 */

class RuleBasedClassifier implements Classifier {
  
  // il metodo classify usato per classificare il traffico prendendo in input data =req.body
  classify(data: any): string {
    // se il numero di pacchetti o di bytes è >1 il traffico viene calssificato come DOS
    if (data.packets > 1 || data.bytes > 1) {
        return TrafficType.DOS; 
    }
    // se sono presenti pacchetti SYN il traffico viene classificato come bruteforce
    if (data.synPacketsCount > 0) {
      return TrafficType.BRUTE_FORCE;
    }
    // in assenza delle condizioni precedenti il traffico è benigno
    return TrafficType.BENIGN;
  }
}
// esportazione di un'istanza del classificatore
export default new RuleBasedClassifier();


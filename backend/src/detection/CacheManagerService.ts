
/**
 * type CacheEntry definisce la struttura di ogni elemento ch everrà memorizzato in cache.
 * Per ogni IP vengono salvati:
 * - numero di richieste da esso effettuate
 * - eventuale ("?") data di scadenza del blocco già presente
 */
type CacheEntry = {
  requestCount: number;
  blockedUntil?: Date;
};

/**
 * CacheManagerService è il servizio che gestisce la cache degli indirizzi IP bloccati.
 * Tiene traccia dei CacheEntry.
 */
class CacheManagerService {
  
  // private cache è l'implementazione della cache come Map (=mappa in memoria) che associa ogni indirizzo IP
  // alle informazioni memorizzate in cache.
  private cache = new Map<string, CacheEntry>();

  /**
   * il metodo updateRequestCount aggiorna il numero di richieste associate ad un IP, e se l'IP non è ancora presente in 
   * cache perche non già bloccato, viene creato un nuovo record nella cache 
   */

  updateRequestCount(sourceIp: string): CacheEntry {
    
    // in current inserisce l'oggetto associato all'IP memorizzato nella cache
    // nel caso di IP assente, crea un nuovo oggetto con requestCount:0
    const current = this.cache.get(sourceIp) || { requestCount: 0 };

    // il contatore delle richieste viene quindi incrementato di 1
    current.requestCount += 1;
    // il metodo aggiorna la cache con il nuovo valore di current associato all'IP in questione
    this.cache.set(sourceIp, current);
    // la funzione restituisce l'oggetto aggiornato
    return current;
  }


  /**
   * il metodo isBlocked verifica se un indirizzo IP risulta ancora bloccato. Se il blocco è in corso restituisce "true".
   */
  isBlocked(sourceIp: string): boolean {
    
    // entry viene associato all'IP presente nella cache
    const entry = this.cache.get(sourceIp);

    // se l'ip non è presente in cache, allora tale ip non è sottoposto ad alcun blocco
    if (!entry) {
      return false;
    }
    // se l'ip è presente in cache ma non esiste una data di scadenza, allora l'ip è ancora autorizzato
    if (!entry.blockedUntil) {
      return false;
    }
    // se l'ip è presente in cache ed anche bloccato, il metodo confronta la data di scadenza del blocco con quella attuale:
    // se è ancora entro il limite restituisce true, se la data è scaduta restiuisce false.
    return entry.blockedUntil > new Date();
  }

  /** 
   * Il metodo blockTemporarily blocca temporaneamente un IP per 5 minuti. 
  */
  blockTemporarily(sourceIp: string, minutes: number = 5): void {
    // ad entry associa il record in cache dell'ip, mentre in caso l'ip non sia in memoria crea un nuovo record con requestCount:0
    const entry = this.cache.get(sourceIp) || { requestCount: 0 };

    // calcola la data di scadenza del blocco 
    const blockedUntil = new Date();
    // aggiunge +5min al blocco corrente
    blockedUntil.setMinutes(blockedUntil.getMinutes() + minutes);

    // memorizza la nuova data di scadenza del blocco nel record dell'IP in cache
    entry.blockedUntil = blockedUntil;

    // aggionra la cache con il nuovo valore di entry
    this.cache.set(sourceIp, entry);
  }

  /**
   * il metodo getAllStatistics restituisce tutte le statistiche contenute nella cache
   */
  getAllStatistics() { 

    /**
     * per fare ciò converte la map in un array di oggetti.
     * In particolare 'this.cache.entries()' prende tutte le coppie chiavi-valore (cioè sourceIp-entry) e le trasforma 
     * in un elemento iterabile.
     * 'Array.form()' permettte di trasformare questo elemento in un array:
     * per ogni elmento dell'array viene poi eseguita la funzione ([sourceIp, entry]) => ({
      sourceIp,
      requestCount: entry.requestCount,
      blockedUntil: entry.blockedUntil,
      }));
      che crea un nuovo oggetto con i campi da essa specificati
     */
    return Array.from(this.cache.entries()).map(([sourceIp, entry]) => ({
      sourceIp,
      requestCount: entry.requestCount,
      blockedUntil: entry.blockedUntil,
    }));
}

 /**
   * il metodo clear pulisce la cache.
   */
clear(): void {
    this.cache.clear();
}

}

// esporazione di un'istanza del servizio
export default new CacheManagerService();

/**
 * Questo file non si serve di Sequelize, perchè non ha bisogno di accedere al database, dato che i dati sono salvati 
 * in una struttura Map in memoria.
 * Per questo motivo si esegue più velocmente rispetto ai file contenenti i repository, che invece devono interrogare
 * il database ad ogni richiesta.
 */
import TrafficAnalysis from "./TrafficAnalysis"; //import del modello Sequelize che rappresenta la tabella TrafficAnalysis nel database

/**
 * Repository che gestisce l'accesso alla tabella TrafficAnalysis: contiene 2 metodi 
 */
class TrafficAnalysisRepository {
  
  // metodo save per il salvataggio nel database del risultato di una nuova detection.
  // riceve: i dati dal body della richiesta, la classificazione prodotta e la decisioine presa.
  async save(data: any, classification: string, decision: string) {
    // restituisce un nuovo record attraverso create nella tabella TrafficAnalysis con i seguenti campi
    return TrafficAnalysis.create({
      sourceIp: data.sourceIp,
      packets: data.packets,
      bytes: data.bytes,
      classification,
      decision
    });
  }

  // metodo findAll per recuperare tutte le analisi presenti nel database, ordinandole a partire da quella più recente
  async findAll() {
    return TrafficAnalysis.findAll({
      order: [["createdAt", "DESC"]]
    });
  }
}
// esportazione di un'istanza del repository 
export default new TrafficAnalysisRepository();
import BlockedIp from "./BlockedIp"; //import del modello Sequelize che rappresenta la tabella BlockedIp nel database


/**
 * Repository che gestisce l'accesso alla tabella BlockedIp: contiene 2 metodi 
 */
class BlockedIpRepository {
  
  // metodo save per salvare nel database un nuovo IP bloccato, con relativa motivazione del blocco
  async save(sourceIp: string, reason: string) {
    // restituisce un nuovo record attraverso create nella tabella BlockedIp con i seguenti campi
    return BlockedIp.create({
      sourceIp,
      reason
    });
  }
  // metodo findAll, per recuperare tutti gli IP presenti nel database, ordinandole a partire da quello bloccato più recentemente
  async findAll() {
    return BlockedIp.findAll({
      order: [["createdAt", "DESC"]]
    });
  }
}
// esporazione di un'istanza del repository
export default new BlockedIpRepository();
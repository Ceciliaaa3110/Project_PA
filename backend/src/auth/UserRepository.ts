import User from "./User"; //import del modello Sequelize da User.ts

// definizione della repository UserRepository che gestisce l'accesso ai dati degli utenti
class UserRepository {

  // ricerca di un utente nel database a partire dallo username specificato tramite il metodo findByUsername().
  // async serve perchè il metodo dipende da un'operazione di lettura del database che richiede tempo per essere eseguita.
  async findByUsername(username: string) {
    
    // restituzione del primo utente che possiede tale username
    return User.findOne({
      where: { username }
    });
  }
}

// esportazione di un'istanza del repository
export default new UserRepository();
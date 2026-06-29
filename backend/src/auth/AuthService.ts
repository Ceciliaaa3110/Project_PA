import jwt from "jsonwebtoken"; //libreria che serve a creare il JSON web Token
import bcrypt from "bcrypt"; // libreria che serve a confrontare password immessa e password cifrata contenuta nel database
import UserRepository from "./UserRepository"; // import del repository che permette l'accesso ai dati degli utenti

// definizione della servizio AuthService che gestisce la logica di autenticazione
class AuthService {
  
  /**
   * Il metodo login autentica un utente verificando le credenziali.
   * Se le credenziali sono valide genera e restituisce un token JWT.
   */
  
  async login(username: string, password: string) {
    
    // ricerca dell'utente tramite username
    const user: any = await UserRepository.findByUsername(username);

    // se l'utente non esiste, l'autenticazione viene interrotta
    if (!user) {
      throw new Error("Credenziali non valide");
    }

    // confronto tra password inserita e memorizzata
    const validPassword = await bcrypt.compare(password, user.password);

    // se la password non coincide (con validPassword=true e eprciò !validPassword=false), l'autenticazione viene interrotta
    if (!validPassword) {
      throw new Error("Credenziali non valide");
    }

    // se la password coincide la funzione login genera un token JWT contenente le info dell'utente
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },

      // il token viene anche firmato mediante la chiave segreta, con una validità di durata pari ad 1 ora
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // restituzione del token prodotto
    return token;
  }
}

// esportazione di un'istanza del servizio
export default new AuthService();
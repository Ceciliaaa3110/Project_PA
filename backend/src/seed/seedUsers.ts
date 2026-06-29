import "dotenv/config";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import User from "../auth/User";

async function seed() {
  await sequelize.sync();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Utente admin creato correttamente");
  process.exit(0);
}

seed();
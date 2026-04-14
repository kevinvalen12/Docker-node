import { DATABASE } from "../config/db";
import { User } from "../interfaces/users.interface";

export class UserService{
        private db = DATABASE.getInstance();

        async getAll(): Promise<User[]> {
            const pool = this.db.getPool();
            const [rows] =  await pool.query<User[]>("SELECT * FROM users")
            return rows
        }

        async getId(id: string): Promise<User | undefined> {
            const idNumber = Number(id)

            if(isNaN(idNumber)){
                return undefined
            }

            const pool = this.db.getPool();
            const [rows] = await pool.query<User[]>("SELECT * FROM `users` WHERE id = ?", [idNumber])
            return rows.length > 0 ? rows[0] : undefined
        }

        
        async createUser(userData: User): Promise<User> {
            const {nombre, profesion, email, habilidades, puntos} = userData
            const habilidadesJSON = JSON.stringify(habilidades || [])

            const pool = this.db.getPool();
            const query = "INSERT INTO users(nombre, email, profesion, habilidades, puntos) VALUES (?, ?, ?, ?, ?)"
            const value = [nombre, profesion, email, habilidadesJSON, puntos || 0]

            const [resulatdo]: any = await pool.execute(query, value)
            return resulatdo.insertId
        }

        
}
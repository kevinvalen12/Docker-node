import bcrypt from 'bcryptjs';
import { ResultSetHeader } from "mysql2";
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
            const {nombre, profesion, email, habilidades, puntos, password} = userData
            const habilidadesJSON = JSON.stringify(habilidades || [])
            const passwordEncriptado = await bcrypt.hash(password, 10)

            const pool = this.db.getPool();
            const query = "INSERT INTO users(nombre, email, profesion, habilidades, puntos) VALUES (?, ?, ?, ?, ?)"
            const value = [nombre, profesion, email, habilidadesJSON, puntos || 0, passwordEncriptado]

            const [resulatdo]: any = await pool.execute(query, value)
            return resulatdo.insertId
        }

        async editUser(id: string, body: User) {
            const pool = this.db.getPool();
            const {nombre, profesion, email, habilidades, puntos, password} = body
            
            const passwordEncriptada = await bcrypt.hash(password, 10)
            const habilidadesJSON = JSON.stringify(habilidades || []) 
            console.log(habilidadesJSON)

            const query = `UPDATE 
                            users 
                            SET 
                                nombre = COALESCE(?, nombre),
                                email = COALESCE(?, email), 
                                profesion = COALESCE(?, profesion), 
                                habilidades = COALESCE(?, habilidades), 
                                puntos = COALESCE(?, puntos)
                                password = COALESCE(?, password)
                            WHERE id = ?`;
            
            const [resultado]: any = await pool.query<User[]>(query, [
                nombre || null,
                email || null,
                profesion || null,
                habilidadesJSON,
                puntos || null,
                passwordEncriptada,
                id
            ])

            return resultado.affectedRows > 0
        }

        async deleteUser(id: string) {
            const pool = this.db.getPool();
            const idNumber = id

            const [respuesta] = await pool.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [idNumber])

            return respuesta.affectedRows > 0
        }
}
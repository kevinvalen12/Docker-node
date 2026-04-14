import { DBASE } from "../config/db";
import { User } from "../interfaces/users.interface";

export class UserService{
        private db = DBASE.getInstance();

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
}
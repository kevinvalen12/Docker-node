import { DBASE } from "../config/db";
import { User } from "../interfaces/users.interface";

export class UserService{
        private db = DBASE.getInstance();

        async getAll(): Promise<User[]> {
            const pool = this.db.getPool();
            const [rows] =  await pool.query<User[]>("SELECT * FROM users")
            return rows
        }
}
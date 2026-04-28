import { DATABASE } from "../config/db";
import { User } from "../interfaces/users.interface";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class AuthService {
    private db = DATABASE.getInstance();

    async register(nombre: string, email: string, password: string): Promise<string> {
        const pool = this.db.getPool();

        const [existe] = await pool.query<User[]>(
            "SELECT * FROM users WHERE email = ?", [email]
        );
        if(existe.length > 0) throw new Error('El email ya esta registrado');

        const passwordEncriptado = await bcrypt.hash(password, 10);
        // El 10 es el "costo" del cifrado, más alto = más seguro pero más lento

        const [resultado]: any = await pool.execute(
            "INSERT INTO users(nombre, email, password) VALUES (?, ?, ?)",
            [nombre, email, passwordEncriptado]
        );

        const token = jwt.sign(
            {id: resultado.insertId, email},
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'}
        )

        return token;
    }

    async login(email: string, password: string): Promise<string>{
        const pool = this.db.getPool();

        const [rows] = await pool.query<User[]>(
            "SELECT * FROM users WHERE email = ?", [email]
        )
        const usuario = rows[0]

        if(!usuario) throw new Error('email o contraseña incorrecta');

        const passwordValidado = await bcrypt.compare(password, usuario.password!);
        if(!passwordValidado) throw new Error('email o contraseña incorrecta');

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return token
    }
}
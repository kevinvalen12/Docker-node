import { ResultSetHeader } from 'mysql2';
import { DATABASE } from '../config/db'
import { Movies } from '../interfaces/movies.interface';;

export class MovieService{
    private db = DATABASE.getInstance();

    async getAllMovies(): Promise<Movies[]> {
        const pool = this.db.getPool();
        const [rows] = await pool.query<Movies[]>("SELECT * FROM movies")
        return rows
    }

    async getMovieById(id: string): Promise<Movies | undefined> {
        const pool = this.db.getPool();
        const [rows] = await pool.query<Movies[]>("SELECT * FROM movies WHERE id = ?", [id])
        console.log(rows.length)
        return rows.length > 0 ? rows[0] : undefined
    }

    async createMovie(data: Movies) {
        const { titulo, gender_id, anio } = data
        const pool = this.db.getPool();

        const query =  "INSERT INTO movies(titulo, gender_id, anio) VALUES (?, ?, ?)"
        const value = [titulo, gender_id || 1, anio]
        const [respuesta]: any = await pool.execute(query, value)
        return respuesta.insertId
    }

    async updateMovie(id: string, data: Movies) {
        const { titulo, gender_id, anio } = data
        const pool = this.db.getPool();
        console.log(data)

        const query = `UPDATE 
                        movies 
                        SET 
                            titulo = COALESCE(?, titulo),
                            gender_id = COALESCE(?, gender_id),
                            anio = COALESCE(?, anio)
                        WHERE id = ?`
        
        const [resulado]: any = await pool.query<Movies[]>(query, [
            titulo || null,
            gender_id || null,
            anio || null,
            id
        ])

        return resulado.affectedRows > 0
    }

    async deleteMovie(id: string) {
        const pool = this.db.getPool()
        console.log(id)
        const [respuesta] = await pool.query<ResultSetHeader>("DELETE FROM movies WHERE id = ?", [id])
        
        return respuesta.affectedRows > 0
    }
}
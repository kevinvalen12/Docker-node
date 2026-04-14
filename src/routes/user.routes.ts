import { UserController } from './../controllers/user.controller';
import {Request, Response, Router} from 'express';
import {ResultSetHeader} from 'mysql2'
import { DBASE } from '../config/db';
import { User } from '../interfaces/users.interface';

export class UserRouter{
    public router: Router;
    private userController: UserController; 
    private db = DBASE.getInstance();

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        //constructor es el motor que enciende la clase.
        this.configuracion();
    }

    private configuracion(): void{
        this.router.get('/', this.userController.getUser);

        this.router.get('/:id', this.userController.getUsersId);

        this.router.post('/', async (req: Request, res: Response) => {
            const {nombre, profesion, email, habilidades, puntos} = req.body

            try{
                const pool = this.db.getPool();

                const habilidadesJSON = JSON.stringify(habilidades || [])
                const query = "INSERT INTO users(nombre, email, profesion, habilidades, puntos) VALUES (?, ?, ?, ?, ?)"
                const values = [nombre, profesion, email, habilidadesJSON, puntos || 0]

                const [resulatdo]: any = await pool.execute(query, values)
                res.status(201).json({
                    id: resulatdo.insertId,
                    nombre,
                    profesion
                })
            }catch(error){
                console.error(`${error}`)
                res.status(500).json({message: 'Error al guardar el usuario'})
            }
        })

        this.router.put('/:id', async (req: Request, res: Response) => {
            const {id} = req.params;
            const {nombre, profesion, email, habilidades, puntos} = req.body;

            try{
                const pool = this.db.getPool();

                const habilidadesJSON = JSON.stringify(habilidades || []);
                /**
                 * @COALESCE usa el primer valor si no es null 
                 * de lo contrario, usa el valor actual en la columna 
                 */
                const query = `UPDATE 
                                users 
                                SET 
                                    nombre = COALESCE(?, nombre),
                                    email = COALESCE(?, email), 
                                    profesion = COALESCE(?, profesion), 
                                    habilidades = COALESCE(?, habilidades), 
                                    puntos = COALESCE(?, puntos)
                                WHERE id = ?`;

                // el orden debe de ser igual a la query
                const [resultado]: any = await pool.query(query, [
                    nombre || null,
                    email || null,
                    profesion || null,
                    habilidadesJSON || null,
                    puntos || null,
                    id
                ])

                if(resultado.affectedRows === 0){
                    return res.status(400).json({message: 'usuario no encontrado'})
                }

                res.json({message: 'usuario actualizado correctamente', id})
            }catch(error){
                console.error(`${error}`)
                res.status(500).json({message: 'error en la actualizacion en ñla base de datos'})
            }
        })

        this.router.delete('/:id', async (req: Request, res: Response) => {
            const {id} = req.params

            try{
                const pool = this.db.getPool();
                const [resultado] = await pool.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [id])

                if(resultado.affectedRows === 0){
                    return res.status(400).json({message: 'usuario no encontrado'})
                }

                return res.status(200).json({message: 'usuario eliminado exitosamnete'})
            }catch(error){
                console.error(`${error}`)
                return res.status(500).json({message: 'error en el servidor'})
            }
        })
    }
}
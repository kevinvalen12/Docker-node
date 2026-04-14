import { UserController } from './../controllers/user.controller';
import {Request, Response, Router} from 'express';
import {ResultSetHeader} from 'mysql2'
import { DATABASE } from '../config/db';

export class UserRouter{
    public router: Router;
    private userController: UserController; 
    private db = DATABASE.getInstance();

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        //constructor es el motor que enciende la clase.
        this.configuracion();
    }

    private configuracion(): void{
        this.router.get('/', this.userController.getUser);

        this.router.get('/:id', this.userController.getUsersId);

        this.router.post('/', this.userController.usercreate);

        this.router.put('/:id', this.userController.userEdit)

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
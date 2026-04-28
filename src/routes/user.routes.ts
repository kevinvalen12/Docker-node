import { authMiddleware } from '../middleware/auth.middleware';
import { UserController } from './../controllers/user.controller';

import { Router } from 'express';



export class UserRouter{
    public router: Router;
    private userController: UserController;

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        //constructor es el motor que enciende la clase.
        this.configuracion();
    }

    private configuracion(): void{
        this.router.get('/', authMiddleware, this.userController.getUser);

        this.router.get('/:id', authMiddleware, this.userController.getUsersId);

        this.router.post('/', authMiddleware, this.userController.usercreate);

        this.router.put('/:id', authMiddleware, this.userController.userEdit)

        this.router.delete('/:id', authMiddleware, this.userController.userDelete)
    }
}
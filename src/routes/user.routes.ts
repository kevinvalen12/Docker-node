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
        this.router.get('/', this.userController.getUser);

        this.router.get('/:id', this.userController.getUsersId);

        this.router.post('/', this.userController.usercreate);

        this.router.put('/:id', this.userController.userEdit)

        this.router.delete('/:id', this.userController.userDelete)
    }
}
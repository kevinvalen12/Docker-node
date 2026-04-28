import { AuthController } from './../controllers/auth.controller';
import { Router } from 'express';

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.configuracion();
    }

    configuracion() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login);
    }
}
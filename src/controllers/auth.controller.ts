import { error } from 'node:console';
import { AuthService } from './../services/auth.service';
import { Response, Request } from 'express';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService
    }

    register = async (req: Request, res: Response): Promise<void> => {
        try{
            const {nombre, email, password} = req.body;

            if(!nombre || !email || !password){
                res.status(400).json({error: 'nombre, email y password son obligatorio '});
                return;
            }

            const token = await this.authService.register(nombre, email, password);
            res.status(201).json({ token })
        }catch(error: any ){
            res.status(400).json({ error: error.message })
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try{
            const {email, password} = req.body;

            if(!email || !password){
                res.status(400).json({error: 'email y password son obligatorios'})
            }

            const token = await this.authService.login(email, password);
            res.json({ token });
        }catch(error: any){
            res.status(401).json({error: error.message})
        }
    }
}
import { Response, Request } from 'express';
import { UserService } from '../services/user.service';

export class UserController{
    private userService: UserService

    constructor() {
        this.userService = new UserService();
    }

    getUser = async (req: Request, res: Response) => {
        try{
            const users = await this.userService.getAll();
            res.json(users)
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: "Error al conectar con la DB"})
        }
    }
}
import { Response, Request } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users.interface';

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

    getUsersId = async (req: Request, res: Response) => {
        const {id} = req.params;

        if(typeof id != 'string') return console.log("el id no es un string")
       
        try{
            const user = await this.userService.getId(id)
            if(!user) return res.status(404).json({message: 'no existe'})
            res.json(user)
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: 'error en el servidor'})
        }
    }

    usercreate = async (req: Request, res: Response) => {
        try{
            const id = await this.userService.createUser(req.body)
            res.status(201).json({id, ...req.body})
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: 'Error al guardar el usuario'})
        }

    }

    
}
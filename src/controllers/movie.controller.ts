import { Response, Request } from 'express';
import { MovieService } from '../services/movie.service'

export class MovieController{
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    getMovie = async (req: Request, res: Response) => {
        try{
            const user = await this.movieService.getAllMovies();
            res.json(user)
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: "Error al conectar con la DB"})
        }
    }

    getMovieById = async (req: Request, res: Response) => {
        const {id} = req.params
        if(typeof id !== 'string') return console.log

        try{
            const user = await this.movieService.getMovieById(id)
            if(!user) return res.status(400).json({message: 'id no existe'})
            
            res.json(user)
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: "Error al conectar con la DB"})
        }
    }

    createMovie = async (req: Request, res: Response) => {
        const data = req.body
        try{
            const newOrderId = await this.movieService.createMovie(data)
            res.status(201).json({ newOrderId, ...data })
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: 'Error al guardar la pelicula'})
        }
    }

    updateMovie = async (req: Request, res: Response) => {
        const { id }  = req.params
        const data = req.body
        if(typeof id !== 'string') return console.log("id no es un string")

        try{
            const isUpdated = await this.movieService.updateMovie(id, data)
            if(!isUpdated) return res.status(400).json({})
            res.json({message: 'pelicula editada exitosamente', id: id})
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: 'error en la actualizacion en la base de datos'})
        }
    }

    deleteMovie = async (req: Request, res: Response) => {
        const { id } = req.params
        if(typeof id !== 'string') return console.log("id no es un string")

        try{
            const isDeleted = this.movieService.deleteMovie(id)
            if(!isDeleted) return res.status(400).json({message: 'id no existe'})
            res.json({message: 'movie eliminada existosamnete'})
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({message: 'error en la actualizacion en la base de datos'})
        }
    }
}
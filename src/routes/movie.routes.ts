import { Router } from "express";
import { MovieController } from '../controllers/movie.controller'
import { authMiddleware } from "../middleware/auth.middleware";

export class MovieRouter{
    public router: Router;
    private movieController: MovieController;

    constructor() {
        this.router = Router();
        this.movieController = new MovieController();
        this.configure();
    }

    private configure() {
        this.router.get('', authMiddleware, this.movieController.getMovie)
        this.router.get('/:id', authMiddleware, this.movieController.getMovieById)
        this.router.post('', authMiddleware,this.movieController.createMovie)
        this.router.put('/:id', authMiddleware, this.movieController.updateMovie)
        this.router.delete('/:id', authMiddleware, this.movieController.deleteMovie)
    }
}
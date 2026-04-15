import { Router } from "express";
import { MovieController } from '../controllers/movie.controller'

export class MovieRouter{
    public router: Router;
    private movieController: MovieController;

    constructor() {
        this.router = Router();
        this.movieController = new MovieController();
        this.configure();
    }

    private configure() {
        this.router.get('', this.movieController.getMovie)
        this.router.get('/:id', this.movieController.getMovieById)
        this.router.post('', this.movieController.createMovie)
        this.router.put('/:id', this.movieController.updateMovie)
        this.router.delete('/:id', this.movieController.deleteMovie)
    }
}
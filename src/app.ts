import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';

import { UserRouter } from './routes/user.routes'
import { MovieRouter } from './routes/movie.routes'
import { AuthRoutes } from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT
const userRouter = new UserRouter();
const movieRouter = new MovieRouter();
const authRoutes = new AuthRoutes

// Activa morgan
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req: Request, res: Response) => {
    res.send("holaaaaa")
})

app.use('/api/auth', authRoutes.router)
app.use('/api/users', userRouter.router)
app.use('/api/movies', movieRouter.router)

app.listen(PORT, () => {
    console.log(`conexion exitasa al puerto ${PORT}`)
})
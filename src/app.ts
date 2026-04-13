import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';

import {UserRouter} from './routes/user.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT
const userRouter = new UserRouter();

// Activa morgan
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req: Request, res: Response) => {
    res.send("holaaaaa")
})

app.use('/api/users', userRouter.router)

app.listen(PORT, () => {
    console.log(`conexion exitasa al puerto ${PORT}`)
})
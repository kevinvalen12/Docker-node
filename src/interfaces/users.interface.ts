import { RowDataPacket } from "mysql2"

export interface User extends RowDataPacket{
    id?: number,
    nombre: string,
    profesion: string,
    email: string,
    habilidades: string[],
    puntos: number
    created_at: Date
}
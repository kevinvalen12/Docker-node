import { RowDataPacket } from 'mysql2'

export interface Movies extends RowDataPacket{
    id: number,
    titulo: string,
    gender_id: number,
    anio: number
}
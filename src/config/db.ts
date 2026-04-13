import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

/**
 * clase DBASE (singleton)
 * se encarga de crear y gestionar una sola conexion d la base de datos 
 */

export class DBASE{
    private static instance: DBASE;
    private pool: Pool;

    private constructor() {
        /**
         * constructor privado para evitar multiples instancias
         */
        this.pool = mysql.createPool({
            host: process.env.host || 'localhost',
            user: process.env.user || '',
            password: process.env.password || '',
            database: process.env.database || '',
            // forzar el tipo a numero
            port: Number(process.env.PORT_MYSQL) || 3306,

            waitForConnections: true, // espera si no hay una conexion disponibles
            connectionLimit: 10, // maximo de conexiones
            queueLimit: 0, // sin limites de cola
            connectTimeout: 10000, // tiempo maximo de conexion
            namedPlaceholders: true // permite usar params en queries
        });
    }

    /**
     * 
     * @returns retorna la unica instacia de DBASE(singleton)
     */
    // Singleton
    static getInstance(): DBASE {
       if(!DBASE.instance) {
        // LO CREA SOLO UNA VEZ
        DBASE.instance = new DBASE();
       }
       return DBASE.instance;
    }

    /**
     * 
     * @returns retorna el pool de conexion
     */

    getPool(): Pool {
        return this.pool;
    }
}


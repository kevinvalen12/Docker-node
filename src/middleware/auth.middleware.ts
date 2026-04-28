import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token){
        res.status(401).json({error: 'Token requerido'});
        return;
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decode;
        next();
    }catch(error){
        res.status(403).json({error: 'Token invalido o expirado'})
    }
} 
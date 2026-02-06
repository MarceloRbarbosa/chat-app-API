import { Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { AuthenticatedRequest } from "../protocols/protocolTypes"

interface JwtPayload {
    userId: number;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    
    if(!authHeader) throw { type: "unauthorized", message: "Token not provided"}
    
    const [scheme, token] = authHeader.trim().split(/\s+/);
    if(scheme?.toLowerCase() !== "bearer" || !token ) throw { type: "unauthorized", message: "Invalid Token format"}
   
    try {
        const secret = process.env.JWT_SECRET;
            if (!secret) throw new Error("JWT_SECRET not set");
        
            const payload = jwt.verify(token, secret) as JwtPayload;
        
        req.userId = payload.userId;
       return  next();
    } catch (error) {
        throw { type: "unauthorized", message: "Token invalid or expired"}
    }
}
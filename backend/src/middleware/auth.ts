import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";

import jwt from "jsonwebtoken";
import User from "../models/user";

//this is required when we assign cutom properties to express request and rsponse .
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth0Id?: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});


export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  //checking that headers has a authorization
  //property in it and the authorization starta with bearer eg- Bearer sdfdsfsdfdsfs.
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload ;
    console.log("Decoded token:", decoded);
    const auth0Id = decoded.sub;
    console.log("Extracted auth0Id:", auth0Id);
    
    
    const user = await User.findOne({ auth0Id });

if (!user) {
  return res.sendStatus(401); // Handle case when no user is found
}

req.auth0Id = auth0Id as string; // Type assertion if TypeScript complains
req.userId = user._id?.toString(); 
    next();
  } catch (error) {
    console.error("Error during jwtParse:", error);
    return res.sendStatus(401);
  }
};
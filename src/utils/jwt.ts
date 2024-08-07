import { JwtPayload, sign, verify } from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id: number, country: string) => {
  const jwt = sign({
    id: id,
    country: country
  }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  })
  return jwt
}

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, process.env.JWT_SECRET!)
  return isOk
}


// Lo puedo usar manejandolo como una arrow function
export const verifyClient = (client: JwtPayload | undefined): Boolean => {
  if (!client) {
    return false
  }
  return true
}

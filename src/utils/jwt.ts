import { sign, verify } from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id: number) => {
  const jwt = sign({
    id: id
  }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  })
  return jwt
}

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, process.env.JWT_SECRET!)
  return isOk
}

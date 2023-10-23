import prisma from "@/db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import jwt from "jsonwebtoken"
import {
  ReqCreateUser,
  ResCreateUser,
  validateEmail,
  validateName,
  validatePassword,
  validateRole,
  validateTelephone,
} from "./data"
import Form from "./form"

export default function Register() {
  const createUser = async (req: ReqCreateUser): Promise<ResCreateUser> => {
    "use server"
    if (!validateName(req.name).isValid) {
      throw new Error(validateName(req.name).error)
    }

    if (!validateTelephone(req.telephone).isValid) {
      throw new Error(validateTelephone(req.telephone).error)
    }

    if (!validateEmail(req.email).isValid) {
      throw new Error(validateEmail(req.email).error)
    }

    if (!validatePassword(req.password).isValid) {
      throw new Error(validatePassword(req.password).error)
    }

    if (!validateRole(req.role).isValid) {
      throw new Error(validateRole(req.role).error)
    }
    try {
      const user = await prisma.user.create({
        data: {
          name: req.name,
          telephone: req.telephone,
          email: req.email,
          password: req.password,
          role: req.role,
        },
      })
      const accessToken = jwt.sign({ userId: user.id, role: req.role }, process.env.JWT_SECRET!)
      const refreshToken = jwt.sign({ userId: user.id, role: req.role }, process.env.JWT_SECRET!)
      return {
        jwt: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            error: "Email already exists",
          }
        }
      }
      return {
        error: "There is something wrong with the server.",
      }
    }
  }
  return <Form action={createUser} />
}

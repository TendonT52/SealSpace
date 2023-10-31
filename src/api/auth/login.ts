"use server"
import prisma from "@/db"
import argon2 from "argon2"
import { setAccessToken, setRefreshToken } from "./jwt"
import { validateEmail, validatePassword } from "@/types/validation"

export interface ReqLogin {
  email: string
  password: string
}

export interface ResLogin {
  ok: boolean
  message: string
}

export async function login(req: ReqLogin): Promise<ResLogin> {
  if (!validateEmail(req.email).isValid) {
    return {
      ok: false,
      message: "Invalid email or password",
    }
  }
  if (!validatePassword(req.password).isValid) {
    return {
      ok: false,
      message: "Invalid email or password",
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.email,
    },
  })
  if (!user) {
    throw new Error("Invalid email or password")
  }
  if (await argon2.verify(user.password, req.password)) {
    setAccessToken(user.id, user.role)
    await setRefreshToken(user.id)

    return {
      ok: true,
      message: "Login success",
    }
  }
  return {
    ok: false,
    message: "Something went wrong",
  }
}

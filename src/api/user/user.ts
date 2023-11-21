"use server"
import prisma from "@/db"
import { Role } from "@/types/user"
import { validateEmail, validateName, validatePassword, validateRole, validateTelephone } from "@/types/validation"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import argon2 from "argon2"
import { setAccessToken, setRefreshToken } from "../auth/jwt"
import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/decode"

export interface ReqCreateUser {
  name: string
  telephone: string
  email: string
  password: string
  role: Role
}

export interface ResCreateUser {
  ok: boolean
  message: string
  data?: {
    id: string
  }
}

export async function createUser(req: ReqCreateUser): Promise<ResCreateUser> {
  if (!validateName(req.name).isValid) {
    return {
      ok: false,
      message: validateName(req.name).error,
    }
  }

  if (!validateTelephone(req.telephone).isValid) {
    return {
      ok: false,
      message: validateTelephone(req.telephone).error,
    }
  }

  if (!validateEmail(req.email).isValid) {
    return {
      ok: false,
      message: validateEmail(req.email).error,
    }
  }

  if (!validatePassword(req.password).isValid) {
    return {
      ok: false,
      message: validatePassword(req.password).error,
    }
  }

  if (!validateRole(req.role).isValid) {
    return {
      ok: false,
      message: validateRole(req.role).error,
    }
  }
  let user
  try {
    user = await prisma.user.create({
      data: {
        name: req.name,
        telephone: req.telephone,
        email: req.email,
        password: await argon2.hash(req.password),
        role: req.role,
      },
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          message: "Email already exists",
        }
      }
    }
    return {
      ok: false,
      message: `There is something wrong with the server ${error}`,
    }
  }
  try {
    setAccessToken(user.id, req.role)
    await setRefreshToken(user.id)
  } catch (error) {
    return {
      ok: true,
      message: "User created successfully with out set token in cookie",
      data: {
        id: user.id,
      },
    }
  }

  return {
    ok: true,
    message: "User created successfully",
    data: {
      id: user.id,
    },
  }
}

export interface UserData {
  id: string
  name: string
}

export interface ResAllUserName {
  ok: boolean
  message: string
  data?: UserData[]
}

export async function getAllUserName(): Promise<ResAllUserName> {
  const cookieStore = cookies()
  const token = cookieStore.get("access_token")
  if (token == undefined) {
    return {
      ok: false,
      message: "access token not found",
    }
  }

  let claim
  try {
    claim = verifyAccessToken(token.value)
  } catch (error) {
    return {
      ok: false,
      message: "Invalid access token",
    }
  }

  if (claim.role !== Role.HOST) {
    return {
      ok: false,
      message: "You are not authorized to perform this action",
    }
  }

  let users
  try {
    users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  } catch (error) {
    return {
      ok: false,
      message: "There is something wrong with the server",
    }
  }

  return {
    ok: true,
    message: "Users found",
    data: users,
  }
}
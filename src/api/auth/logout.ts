"use server"
import prisma from "@/db"
import { cookies } from "next/headers"
import { verifyRefreshToken } from "./decode"

export interface ResLogout {
  ok: boolean
  message: string
}

export async function logout(): Promise<ResLogout> {
  const cookieStore = cookies()
  const token = cookieStore.get("refresh_token")
  if (token == undefined) {
    return {
      ok: false,
      message: "Refresh token not found",
    }
  }
  let claim
  try {
    claim = verifyRefreshToken(token.value)
  } catch (error) {
    return {
      ok: false,
      message: "Invalid refresh token",
    }
  }
  const session = await prisma.session.delete({
    where: {
      id: claim.jwtId,
    },
  })
  return {
    ok: true,
    message: "Logout success",
  }
}

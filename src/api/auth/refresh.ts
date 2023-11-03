"use server"
import prisma from "@/db"
import { cookies } from "next/headers"
import { verifyRefreshToken } from "./decode"
import { setAccessToken } from "./jwt"

export interface ResRefresh {
  ok: boolean
  message: string
}

export async function refresh(): Promise<ResRefresh> {
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

  const session = await prisma.session.findUnique({
    include: {
      user: true,
    },
    where: {
      id: claim.jwtId,
    },
  });

  if (!session) {
    return {
      ok: false,
      message: "Invalid refresh token",
    }
  }

  setAccessToken(session.user.id, session.user.role)

  return {
    ok: true,
    message: "Access token refreshed successfully",
  }
}

import { AccessClaim } from "@/types/token"
import jwt from "jsonwebtoken"
import ms from "ms"
import { cookies } from "next/headers"
import prisma from "../../db"
import { RefreshClaim } from "./decode"

export function setAccessToken(userId: string, role: string) {
  const accessClaim: AccessClaim = {
    userId: userId,
    role: role,
  }

  const accessToken = jwt.sign(accessClaim, process.env.JWT_ACCESS_TOKEN!, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  })

  cookies().set("access_token", accessToken, {
    path: "/",
    expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXP!)),
  })
}

export async function setRefreshToken(userId: string) {
  const refresh = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXP!)),
    },
  })

  const refreshClaim: RefreshClaim = {
    jwtId: refresh.id,
  }

  const refreshToken = jwt.sign(refreshClaim, process.env.JWT_REFRESH_TOKEN!, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  })

  cookies().set("refresh_token", refreshToken, {
    path: "/",
    expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXP!)),
    httpOnly: true,
  })
}

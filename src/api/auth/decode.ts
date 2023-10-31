import { AccessClaim } from "@/types/token"
import jwt from "jsonwebtoken"

export interface RefreshClaim {
  jwtId: string
}

export function verifyAccessToken(accessToken: string) {
  return jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN!) as AccessClaim
}

export function verifyRefreshToken(refreshToken: string) {
  return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!) as RefreshClaim
}

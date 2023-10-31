import jwt from 'jsonwebtoken'

export interface AccessClaim {
  userId: string
  role: string
}

export function decodeAccessToken(accessToken: string): AccessClaim {
  return jwt.decode(accessToken) as AccessClaim
}
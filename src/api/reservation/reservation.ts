import prisma from "@/db"
import { Role } from "@/types/user"
import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/decode"

export interface ReqCreateReservation {
  userId: string
  spaceId: string
  date: Date
  Rooms: number
  Amenities: string
}

export interface ResCreateReservation {
  ok: boolean
  message: string
  data?: {
    id: string
    userId: string
    spaceId: string
    date: Date
    Rooms: number
    Amenities: string
  }
}

export async function createReservation(req: ReqCreateReservation): Promise<ResCreateReservation> {
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

  if (req.Rooms > 3) {
    return {
      ok: false,
      message: "Rooms must be less than 3",
    }
  }

  const space = await prisma.reservation.create({
    data: {
      userId: claim.userId,
      spaceId: req.spaceId,
      date: req.date,
      Rooms: req.Rooms,
      Amenities: req.Amenities,
    },
  })

  return {
    ok: true,
    message: "Space created successfully",
    data: space,
  }
}

export async function getReservation(spaceId: string) {
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

  if (claim.role == Role.RENTER) {
    const reservation = await prisma.reservation.findMany({
      where: {
        userId: claim.userId,
      },
    })
    return {
      ok: true,
      message: "Reservation found",
      data: reservation,
    }
  }
  if (claim.role == Role.HOST) {
    const reservation = await prisma.reservation.findMany({
      include: {
        Space: true,
      },
      where: {
        Space: {
          hostId: claim.userId,
        },
        spaceId: spaceId,
      },
    })
    return {
      ok: true,
      message: "Reservation found",
      data: reservation,
    }
  }
  return {}
}

export async function updateReservation(id: string, req: ReqCreateReservation) {
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
  if (req.Rooms > 3) {
    return {
      ok: false,
      message: "Rooms must be less than 3",
    }
  }
  let reservation
  try {
    reservation = await prisma.reservation.update({
      where: {
        id: id,
      },
      data: {
        userId: claim.userId,
        spaceId: req.spaceId,
        date: req.date,
        Rooms: req.Rooms,
        Amenities: req.Amenities,
      },
    })
  } catch (error) {
    return {
      ok: false,
      message: `Reservation with id ${id} not found`,
    }
  }

  return {
    ok: true,
    message: "Reservation updated successfully",
    data: reservation,
  }
}

export async function deleteReservation(id: string) {
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

  let space
  try {
    space = await prisma.reservation.delete({
      where: {
        id: id,
        userId: claim.userId,
      },
    })
  } catch (error) {
    return {
      ok: false,
      message: `Reservation with id ${id} not found`,
    }
  }

  return {
    ok: true,
    message: "Reservation deleted successfully",
    data: space,
  }
}

"use server"
import prisma from "@/db"
import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/decode"
import { IReservationItem, IReservation } from "@/types/reservation"
import { Reservation, Space } from "@prisma/client"
import { revalidatePath } from "next/cache"

export interface ReqCreateReservation {
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

  revalidatePath("/reservation")
  return {
    ok: true,
    message: "Space created successfully",
    data: space,
  }
}

export async function getReservation() {
  const cookieStore = cookies()
  const token = cookieStore.get("access_token")
  if (token == undefined) {
    return {
      ok: false,
      message: "access token not found",
      data: [],
    }
  }

  let claim
  try {
    claim = verifyAccessToken(token.value)
  } catch (error) {
    return {
      ok: false,
      message: "Invalid access token",
      data: [],
    }
  }

  const reservation = await prisma.reservation.findMany({
    include: {
      Space: true,
    },
    where: {
      userId: claim.userId,
    },
  })

  let reservationMap = new Map<string, Reservation[]>(); // spaceId with reservation
  let spaceMap = new Map<string, Space>(); // spaceId with space
  for (let i = 0; i < reservation.length; i++) {
    const res = reservation[i];
    const space = res.Space;
    if (space == undefined) {
      continue;
    }
    if (reservationMap.has(space.id)) {
      const arr = reservationMap.get(space.id);
      if (arr == undefined) {
        continue;
      }
      arr.push(res);
      reservationMap.set(space.id, arr);
    } else {
      reservationMap.set(space.id, [res]);
      spaceMap.set(space.id, space);
    }
  }

  let result: IReservation[] = []
  for (let spaceId of reservationMap.keys()) {
    const space = spaceMap.get(spaceId);
    const reservations = reservationMap.get(spaceId);
    if (space == undefined || reservations == undefined) {
      continue;
    }
    let r: IReservation = {} as IReservation;
    r.space = space;
    r.reservations = reservations.map((res) => {
      return {
        id: res.id,
        date: res.date.getDate(),
        month: res.date.toLocaleDateString('en-US', { month: 'short' }),
        year: res.date.getFullYear(),
        amenities: res.Amenities,
        rooms: res.Rooms,
      } as IReservationItem
    });

    result.push(r);
  }

  return {
    ok: true,
    message: "Reservation found",
    data: result,
  }
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

  let reservation
  try {
    reservation = await prisma.reservation.delete({
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
    data: reservation,
  }
}

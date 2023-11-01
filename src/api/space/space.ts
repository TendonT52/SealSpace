import prisma from "@/db"
import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/decode"

export interface ReqCreateSpace {
  name: string
  location: string
  available: string
  Rooms: number
  Amenities: string
  Rules: string
  Community: string
  latitude: number
  longitude: number
  hostId: string
}

export interface ResCreateSpace {
  ok: boolean
  message: string
  data?: {
    id: string
    name: string
    location: string
    available: string
    Rooms: number
    Amenities: string
    Rules: string
    Community: string
    latitude: number
    longitude: number
    hostId: string
    createdAt: Date
    updatedAt: Date
  }
}

export async function createSpace(req: ReqCreateSpace): Promise<ResCreateSpace> {
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

  const space = await prisma.space.create({
    data: {
      name: req.name,
      location: req.location,
      available: req.available,
      Rooms: req.Rooms,
      Amenities: req.Amenities,
      Rules: req.Rules,
      Community: req.Community,
      latitude: req.latitude,
      longitude: req.longitude,
      hostId: claim.userId,
    },
  })

  return {
    ok: true,
    message: "Space created successfully",
    data: space,
  }
}

export async function getSpace(amenitie: string, location: string) {
  const spaces = await prisma.space.findMany()
  let amenities = spaces.map((space) => space.Amenities.split(/[\s,]+/).map((s) => s.toLowerCase()))
  let locations = spaces.map((space) => space.location.split(/[\s,]+/).map((s) => s.toLowerCase()))
  let result = []
  for (let i = 0; i < spaces.length; i++) {
    if (amenities[i].includes(amenitie.toLowerCase()) && locations[i].includes(location.toLocaleLowerCase())) {
      result.push(spaces[i])
    }
  }
  return result
}

export async function updateSpace(id: string, req: ReqCreateSpace) {
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
    space = await prisma.space.update({
      where: {
        id: id,
        hostId: claim.userId,
      },
      data: {
        name: req.name,
        location: req.location,
        available: req.available,
        Rooms: req.Rooms,
        Amenities: req.Amenities,
        Rules: req.Rules,
        Community: req.Community,
        latitude: req.latitude,
        longitude: req.longitude,
      },
    })
  } catch (error) {
    return {
      ok: false,
      message: `Space with id ${id} not found`,
    }
  }

  return {
    ok: true,
    message: "Space updated successfully",
    data: space,
  }
}

export async function deleteSpace(id: string) {
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
    space = await prisma.space.delete({
      where: {
        id: id,
        hostId: claim.userId,
      },
    })
  } catch (error) {
    return {
      ok: false,
      message: `Space with id ${id} not found`,
    }
  }

  return {
    ok: true,
    message: "Space deleted successfully",
    data: space,
  }
}
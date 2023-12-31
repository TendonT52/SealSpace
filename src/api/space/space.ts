"use server"
import prisma from "@/db"
import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/decode"
import haversine from "haversine";
import { Role } from "@/types/user";
import { Reservation, Space } from "@prisma/client";
import { IReservation, IReservationItem } from "@/types/reservation";

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

export async function getSpace(amenitie: string, lat: number, lng: number) {
  const spaces = await prisma.space.findMany()
  let amenities = spaces.map((space) => space.Amenities.split(/[\s,]+/).map((s) => s.toLowerCase()))
  let locations = spaces.filter((space) => haversine({ latitude: lat, longitude: lng }, { latitude: space.latitude, longitude: space.longitude }, { threshold: 5, unit: 'km' })).map((space) => space.location.toLowerCase())
  let amenitieSearch = amenitie.split(/[\s,]+/).map((s) => s.toLowerCase())
  let result = []
  for (let i = 0; i < spaces.length; i++) {
    if ((amenitie == "" && lat == 0 && lng == 0) && (findAmenties(amenities[i], amenitieSearch) && locations.includes(spaces[i].location.toLowerCase()))) {
      result.push(spaces[i])
    }
  }
  for (let i = 0; i < spaces.length; i++) {
    if ((amenitie == "") && locations.includes(spaces[i].location.toLowerCase())) {
      result.push(spaces[i])
    }
  }
  for (let i = 0; i < spaces.length; i++) {
    if ((lat == 0 && lng == 0) && (findAmenties(amenities[i], amenitieSearch))) {
      result.push(spaces[i])
    }
  }
  for (let i = 0; i < spaces.length; i++) {
    if ((amenitie == "" && lat == 0 && lng == 0) || (findAmenties(amenities[i], amenitieSearch) && locations.includes(spaces[i].location.toLowerCase()))) {
      result.push(spaces[i])
    }
  }
  return {
    ok: true,
    message: "Space found successfully",
    data: result,
  }
}

function findAmenties(amenities: string[], amenitie: string[]) {
  for (let i = 0; i < amenitie.length; i++) {
    if (amenities.includes(amenitie[i])) {
      return true
    }
  }
  return false
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

export async function getAllSpace() {
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

  if (claim.role != Role.HOST) {
    return {
      ok: false,
      message: "Only host can access this",
      data: [],
    }
  }

  const spaceData = await prisma.space.findMany({
    include: {
      Reservation: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  let result: IReservation[] = []
  for (let i = 0; i < spaceData.length; i++) {
    let reservations = spaceData[i].Reservation
    let reservationsData: IReservationItem[] = []
    for (let j = 0; j < reservations.length; j++) {
      reservationsData.push({
        id: reservations[j].id,
        date: reservations[j].date.getDate(),
        month: reservations[j].date.toLocaleDateString('en-US', { month: 'short' }),
        year: reservations[j].date.getFullYear(),
        amenities: reservations[j].Amenities,
        rooms: reservations[j].Rooms,
      })
    }
    let data: IReservation = {
      space: {
        id: spaceData[i].id,
        name: spaceData[i].name,
        location: spaceData[i].location,
        available: spaceData[i].available,
        Rooms: spaceData[i].Rooms,
        Amenities: spaceData[i].Amenities,
        Rules: spaceData[i].Rules,
        Community: spaceData[i].Community,
        latitude: spaceData[i].latitude,
        longitude: spaceData[i].longitude,
        hostId: spaceData[i].hostId,
        createdAt: spaceData[i].createdAt,
        updatedAt: spaceData[i].updatedAt,
      },
      reservations: reservationsData,
    }
    result.push(data)
  }

  return {
    ok: true,
    message: "All Co-working found",
    data: result,
  }
}
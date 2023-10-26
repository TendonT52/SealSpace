import { Space } from ".prisma/client"

export interface IReservationItem {
    id: string
    date: number
    month: string
    year: number
    amenities: string
}

export interface Reservation {
    id: string
    userId: string
    space: Space
    date: Date[]
    Rooms: number
    Amenities: string
    createdAt: Date
    updatedAt: Date
}
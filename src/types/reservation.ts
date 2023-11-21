import { Space } from ".prisma/client"

export interface IReservationItem {
    id: string
    date: number
    month: string
    year: number
    amenities: string
    rooms: number
    userId?: string
}

export interface IReservation {
    space: Space,
    reservations: IReservationItem[]
}
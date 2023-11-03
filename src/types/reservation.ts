import { Space } from ".prisma/client"

export interface IReservationItem {
    id: string
    date: number
    month: string
    year: number
    amenities: string
    rooms: number
}

export interface IReservation {
    space: Space,
    reservations: IReservationItem[]
}
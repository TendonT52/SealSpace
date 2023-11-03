import { Space } from ".prisma/client"

export interface IReservationItem {
    id: string
    date: number
    month: string
    year: number
    amenities: string
    rooms: number
}

export interface IMyReservation {
    space: Space,
    reservations: IReservationItem[]
}
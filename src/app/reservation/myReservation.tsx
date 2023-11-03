"use client"
import Card from "@/components/card"
import ReservationSpaceForm from "@/components/reservationForm"
import { IMyReservation } from "@/types/reservation"
import { useState } from "react"
export default function MyReservation({ records }: {
    records: {
        ok: boolean;
        message: string;
        data: IMyReservation[];
    }
}) {
    const [selectedReservation, setSelectedReservation] = useState<IMyReservation>(records.data.length > 0 ? records.data[0] : {} as IMyReservation)
    const [isClicked, setIsClicked] = useState(records.data.length > 0 ? true : false)
    return (
        <div className="mb-[33px] flex justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <div className="col-span-1">
                    {records.data.map((reservation) => (
                        <div
                            key={reservation.space.id}
                            className="mb-2.5"
                            onClick={() => {
                                setSelectedReservation(reservation)
                                setIsClicked(true)
                            }}
                        >
                            <Card
                                name={reservation.space.name}
                                location={reservation.space.location}
                                availability={reservation.space.available}
                                capacity={reservation.space.Rooms}
                                amenities={reservation.space.Amenities}
                                rules={reservation.space.Rules}
                                community={reservation.space.Community}
                                style={selectedReservation.space?.id === reservation.space.id ? "selected" : "default"}
                            />
                        </div>
                    ))}
                </div>
                {isClicked && (
                    <div className="col-span-1">
                        <div className="sticky top-2">
                            <ReservationSpaceForm data={selectedReservation} type="own" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

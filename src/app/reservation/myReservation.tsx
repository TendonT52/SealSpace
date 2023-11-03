"use client"
import Card from "@/components/card"
import ErrorMessage from "@/components/errrorMessage"
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
    const [selectedReservation, setSelectedReservation] = useState<{ reservation: IMyReservation, spaceId: string }>(records.data.length > 0 ? {
        reservation: records.data[0],
        spaceId: records.data[0].space.id
    } : {
        reservation: {} as IMyReservation,
        spaceId: ""
    })
    const [isClicked, setIsClicked] = useState(records.data.length > 0 ? true : false)
    return (
        <div className="mb-[33px] flex justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <ErrorMessage text={!records.ok ? records.message : ""} className="col-start-1 col-end-3 pt-4 text-center" />
                <div className="col-span-1">
                    {records.data.map((reservation) => (
                        <div
                            key={reservation.space.id}
                            className="mb-2.5"
                            onClick={() => {
                                setSelectedReservation({
                                    reservation: reservation,
                                    spaceId: reservation.space.id
                                })
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
                                style={selectedReservation.spaceId === reservation.space.id ? "selected" : "default"}
                            />
                        </div>
                    ))}
                </div>
                {isClicked && (
                    <div className="col-span-1">
                        <div className="sticky top-2">
                            <ReservationSpaceForm data={selectedReservation.reservation} type="own" spaceId={ selectedReservation.spaceId } />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

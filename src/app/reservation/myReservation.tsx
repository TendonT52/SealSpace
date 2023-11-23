"use client"
import Card from "@/components/card"
import ErrorMessage from "@/components/errrorMessage"
import ReservationSpaceForm from "@/components/reservationForm"
import { IReservation } from "@/types/reservation"
import { useState } from "react"
export default function MyReservation({ records }: {
    records: {
        ok: boolean;
        message: string;
        data: IReservation[];
    }
}) {
    const [selectedReservation, setSelectedReservation] = useState<{ reservation: IReservation, spaceId: string }>(records.data.length > 0 ? {
        reservation: records.data[0],
        spaceId: records.data[0].space.id
    } : {
        reservation: {} as IReservation,
        spaceId: ""
    })
    const [isClicked, setIsClicked] = useState(records.data.length > 0 ? true : false)
    return (
        <div className="mb-[33px] flex min-h-screen justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <ErrorMessage text={!records.ok ? records.message : ""} className="col-start-1 col-end-3 text-center" />
                <div className="col-span-1">
                    {records.data.map((record) => (
                        <div
                            key={record.space.id}
                            className="mb-2.5"
                            onClick={() => {
                                setSelectedReservation({
                                    reservation: record,
                                    spaceId: record.space.id
                                })
                                setIsClicked(true)
                            }}
                        >
                            <Card
                                name={record.space.name}
                                location={record.space.location}
                                availability={record.space.available}
                                capacity={record.space.Rooms}
                                amenities={record.space.Amenities}
                                rules={record.space.Rules}
                                community={record.space.Community}
                                style={selectedReservation.spaceId === record.space.id ? "selected" : "default"}
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

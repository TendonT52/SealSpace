"use client"
import Button from "@/components/button";
import Card from "@/components/card";
import ReservationSpaceForm from "@/components/reservationForm";
import { IReservation } from "@/types/reservation";
import { useState } from "react";

enum TransitionState {
    EDIT = 'edit',
    CREATE = 'create',
}

export default function AllCoWorking({ records }: {
    records: {
        ok: boolean;
        message: string;
        data: IReservation[];
    }
}) {
    const [selectedSpace, setSelectedSpace] = useState<{ reservation: IReservation, spaceId: string }>(records.data.length > 0 ? {
        reservation: records.data[0],
        spaceId: records.data[0].space.id
    } : {
        reservation: {} as IReservation,
        spaceId: ""
    });
    const [formState, setFormState] = useState<TransitionState>(TransitionState.EDIT);
    return (
        <div className="mb-[33px] flex justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <div className="col-span-1">
                    {records.data.map((reservation) => (
                        <div
                            key={reservation.space.id}
                            className="mb-2.5"
                            onClick={() => {
                                setSelectedSpace({
                                    reservation: reservation,
                                    spaceId: reservation.space.id
                                })
                                setFormState(TransitionState.EDIT)
                            }}
                        >
                            <Card name={reservation.space.name} location={reservation.space.location} availability={reservation.space.available} capacity={reservation.space.Rooms}
                                amenities={reservation.space.Amenities} rules={reservation.space.Rules} community={reservation.space.Community} style={selectedSpace.spaceId === reservation.space.id ? "selected" : "default"}
                            />
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <Button text="Create" variant="secondary" onClick={() => {
                            setSelectedSpace({
                                reservation: {} as IReservation,
                                spaceId: ""
                            }); setFormState(TransitionState.CREATE)
                        }} />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="sticky top-2">
                        <ReservationSpaceForm data={selectedSpace.reservation} type={formState} spaceId={selectedSpace.spaceId} />
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client"
import Button from "@/components/button";
import Card from "@/components/card";
import ErrorMessage from "@/components/errrorMessage";
import ReservationSpaceForm from "@/components/reservationForm";
import { IReservation, IReservationItem } from "@/types/reservation";
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
    if (!records.ok) {
        return (
            <div className="mb-[33px] flex justify-center">
                <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                    <ErrorMessage text={!records.ok ? records.message : ""} className="col-start-1 col-end-3 pt-4 text-center" />
                </div>
            </div>
        )
    }
    return (
        <div className="mb-[33px] flex justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <div className="col-span-1">
                    {records.data.map((record) => (
                        <div
                            key={record.space.id}
                            className="mb-2.5"
                            onClick={() => {
                                setSelectedSpace({
                                    reservation: record,
                                    spaceId: record.space.id
                                })
                                setFormState(TransitionState.EDIT)
                            }}
                        >
                            <Card name={record.space.name} location={record.space.location} availability={record.space.available} capacity={record.space.Rooms}
                                amenities={record.space.Amenities} rules={record.space.Rules} community={record.space.Community} style={selectedSpace.spaceId === record.space.id ? "selected" : "default"}
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
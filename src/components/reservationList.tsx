"use client"
import { IReservationItem } from "@/types/reservation";
import { useEffect, useState } from "react";
import ReservationRow from "./reservationRow";

export default function ReservationList({ data, className }: { data: IReservationItem[], className?: string }) {
    const [selectedId, setSelectedId] = useState<string>("")
    useEffect(() => {
        setSelectedId("")
    }, [data])

    return (
        <div className={className}>
            <table className="w-full table-fixed border-separate rounded-2xl border px-3.5 py-4" id="reservation-table">
                <thead className="text-center font-roboto text-base text-allports">
                    <tr>
                        <th colSpan={1}> Date </th>
                        <th colSpan={1}> Month </th>
                        <th colSpan={1}> Year </th>
                        <th colSpan={2}> Amenities </th>
                        <th colSpan={1}> Rooms </th>
                        <th colSpan={1}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => {
                        return (
                            <ReservationRow item={item} selectedId={selectedId} setSelectedId={setSelectedId} key={item.id} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
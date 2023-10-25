"use client"
import { IReservationItem } from "@/types/reservation";
import { useEffect, useState } from "react";
import ReservationRow from "./reservationRow";

export default function ReservationList() {
    const mockData: IReservationItem[] = [
        {
            id: "1",
            date: 20,
            month: "Dec",
            year: 2022,
            amenities: "High-speed Internet",
        },
        {
            id: "2",
            date: 20,
            month: "Dec",
            year: 2022,
            amenities: "Projector",
        },
        {
            id: "3",
            date: 20,
            month: "Dec",
            year: 2022,
            amenities: "High-speed Internet, Projector",
        },
        {
            id: "4",
            date: 19,
            month: "Dec",
            year: 2022,
            amenities: "Kitchen, Projector",
        },
    ]
    const [selectedId, setSelectedId] = useState<string>("")

    return (
        <table className="w-full table-fixed border-separate rounded-2xl border px-3.5 py-4" id="reservation-table">
            <thead className="text-center font-roboto text-base text-allports">
                <tr>
                    <th colSpan={1}> Date </th>
                    <th colSpan={1}> Month </th>
                    <th colSpan={1}> Year </th>
                    <th colSpan={2}> Amenities </th>
                    <th colSpan={1}> Action </th>
                </tr>
            </thead>
            <tbody>
            {mockData.map((item) => {
                return(
                    <ReservationRow item={item} selectedId={selectedId} setSelectedId={setSelectedId} key={item.id} />
                )
            })}
            </tbody>
        </table>
    )
}
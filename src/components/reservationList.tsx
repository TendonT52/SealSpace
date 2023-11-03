"use client"
import { IReservationItem } from "@/types/reservation";
import { useEffect, useState } from "react";
import ReservationRow from "./reservationRow";
import ErrorMessage from "./errrorMessage";

export default function ReservationList({ data, className, spaceId }: { data: IReservationItem[], className?: string, spaceId: string }) {
    const [selectedId, setSelectedId] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState({ text: "" })
    useEffect(() => {
        setSelectedId("")
    }, [data])

    return (
        <div className={className+" overflow-auto"}>
            <table className="xs:w-[1000px] table-fixed border-separate rounded-2xl border px-3.5 py-4 md:w-full" id="reservation-table">
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
                            <ReservationRow item={item} selectedId={selectedId} setSelectedId={setSelectedId} key={item.id} setErrorMessage={setErrorMessage} spaceId={spaceId} />
                        )
                    })}
                </tbody>
            </table>
            <ErrorMessage text={errorMessage.text} className="col-start-1 col-end-3 pt-4 text-center" />
        </div>
    )
}
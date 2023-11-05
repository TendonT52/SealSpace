"use client"
import { refresh } from "@/api/auth/refresh";
import { deleteReservation, updateReservation } from "@/api/reservation/reservation";
import { IReservationItem } from "@/types/reservation";
import { isDateValid, monthShortToNumber } from "@/utils/date";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export default function ReservationRow({ item, selectedId, setSelectedId, setErrorMessage, spaceId }: {
    item: IReservationItem, selectedId: string, setSelectedId: (id: string) => void, setErrorMessage: Dispatch<SetStateAction<{ text: string }>>, spaceId: string
}) {
    const [reservation, setReservation] = useState<IReservationItem>({
        id: item.id,
        date: item.date,
        month: item.month,
        year: item.year,
        amenities: item.amenities,
        rooms: item.rooms
    })
    const router = useRouter()
    const handleUpdateAction = async () => {
        const {id, date, month, year, amenities, rooms} = reservation
        const check = checkRequiredFields({ id: id, date: date, month: month, year: year, amenities: amenities, rooms: rooms })
        if (!check.ok) {
            setErrorMessage({ text: check.message })
            return
        }

        const res = await updateReservation(selectedId, {
            spaceId: spaceId,
            date: new Date(year, monthShortToNumber(month)!, date),
            Rooms: rooms,
            Amenities: amenities
        })
        if (!res.ok) {
            try {
                const res = await refresh()
                console.log(res.message)
            } catch (e) {
                console.log("Error refresh: ", e)
                router.push("/login")
            }

            const res = await updateReservation(selectedId, {
                spaceId: spaceId,
                date: new Date(year, monthShortToNumber(month)!, date),
                Rooms: rooms,
                Amenities: amenities
            })
            if (!res.ok) {
                setErrorMessage({ text: res.message })
                return
            }
        }
        window.location.reload();
    }

    const handleDeleteAction = async () => {
        const res = await deleteReservation(item.id)
        if (!res.ok) {
            try {
                const res = await refresh()
                console.log(res.message)
            } catch (e) {
                console.log("Error refresh: ", e)
                router.push("/login")
            }

            const res = await deleteReservation(item.id)
            if (!res.ok) {
                setErrorMessage({ text: res.message })
                return
            }
        }
        window.location.reload();
    }

    if (selectedId == item.id) {
        return (
            <tr className="text-center text-navy">
                <td colSpan={1}>
                    <input type="number" name="date" value={reservation.date} className="w-full rounded-default border px-1" 
                    onChange={(e) => {setErrorMessage({ text: "" }); setReservation({ ...reservation, date: Number(e.target.value) })}} />
                </td>
                <td colSpan={1}>
                    <input type="text" name="month" value={reservation.month} className="w-full rounded-default border px-1"
                    onChange={(e) => {setErrorMessage({ text: "" }); setReservation({ ...reservation, month: e.target.value })}} />
                </td>
                <td colSpan={1}>
                    <input type="number" name="year" value={reservation.year} className="w-full rounded-default border px-1"
                    onChange={(e) => {setErrorMessage({ text: "" }); setReservation({ ...reservation, year: Number(e.target.value) })}} />
                </td>
                <td colSpan={2}>
                    <input type="text" name="amenities" value={reservation.amenities} className="w-full rounded-default border px-1"
                    onChange={(e) => {setErrorMessage({ text: "" }); setReservation({ ...reservation, amenities: e.target.value })}} />
                </td>
                <td colSpan={1}>
                    <input type="number" name="rooms" value={reservation.rooms} className="w-full rounded-default border px-1"
                    onChange={(e) => {setErrorMessage({ text: "" }); setReservation({ ...reservation, rooms: Number(e.target.value) })}} />
                </td>
                <td colSpan={1}>
                    <div className="flex justify-center gap-1">
                        <button onClick={(e) => { setSelectedId(""); handleUpdateAction() }}>
                            <Image
                                src="/icon/confirm.png"
                                width={19}
                                height={19}
                                alt="Confirm"
                            />
                        </button>
                        <button onClick={(e) => { setSelectedId(""); }}>
                            <Image
                                src="/icon/cancel.png"
                                width={19}
                                height={19}
                                alt="Cancel"
                            />
                        </button>
                    </div>
                </td>
            </tr>
        )
    } else {
        return (
            <tr className="text-center text-navy">
                <td colSpan={1}> {reservation.date} </td>
                <td colSpan={1}> {reservation.month} </td>
                <td colSpan={1}> {reservation.year} </td>
                <td colSpan={2}> {reservation.amenities} </td>
                <td colSpan={1}> {reservation.rooms} </td>

                <td colSpan={1}>
                    <div className="flex justify-center gap-1">
                        <button onClick={() => {
                            handleDeleteAction()
                        }}>
                            <Image
                                src="/icon/delete.png"
                                width={19}
                                height={19}
                                alt="Delete"
                            />
                        </button>
                        <button onClick={() => {
                            setSelectedId(reservation.id)
                        }}>
                            <Image
                                src="/icon/edit.png"
                                width={19}
                                height={19}
                                alt="Edit"
                            />
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

function checkRequiredFields(reservation: IReservationItem): { ok: boolean, message: string } {
    if (reservation.date == null || reservation.date == 0 || Number.isNaN(reservation.date)) {
        return { ok: false, message: "Date is required" }
    }
    if (reservation.month == null || reservation.month == "") {
        return { ok: false, message: "Month is required" }
    }
    if (reservation.year == null || reservation.year == 0 || Number.isNaN(reservation.year)) {
        return { ok: false, message: "Year is required" }
    }
    if (reservation.amenities == null || reservation.amenities == "") {
        return { ok: false, message: "Amenities is required" }
    }
    if (reservation.rooms == null || reservation.rooms == 0 || Number.isNaN(reservation.rooms)) {
        return { ok: false, message: "Rooms is required" }
    }
    if (!isDateValid(reservation.date, reservation.month, reservation.year)) {
        return { ok: false, message: "Date is invalid" }
    }
    if (monthShortToNumber(reservation.month) === -1) {
        return { ok: false, message: "Month is invalid" }
    }
    return { ok: true, message: "" }
}
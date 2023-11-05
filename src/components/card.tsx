"use client"
import Button from "@/components/button"
import Input from "@/components/input"
import { IReservationItem } from "@/types/reservation"
import { useState } from "react"
import { createReservation } from "@/api/reservation/reservation"
import { refresh } from "@/api/auth/refresh"
import { useRouter } from "next/navigation"
import { isDateValid, monthShortToNumber } from "@/utils/date"

export default function Card({
  style = "default",
  name,
  location,
  availability,
  capacity,
  amenities,
  rules,
  community,
  spaceId
}: {
  style?: "default" | "selected" | "reserve"
  spaceId?: string
  name: string
  location: string
  availability: string
  capacity: number
  amenities: string
  community: string
  rules: string
}) {
  const textColor = style === "default" ? "text-cyan" : "text-ice"
  const date = new Date()
  const [reservation, setReservation] = useState<IReservationItem>({
    id: spaceId ? spaceId : "",
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.getFullYear(),
    rooms: 1,
    amenities: amenities
  })
  const [errorMessage, setErrorMessage] = useState({ text: "" })
  const router = useRouter()
  const handleSubmitReservation = async () => {
    let { ok, message } = checkRequiredFields(reservation)
    if (!ok) {
      setErrorMessage({ text: message })
      return
    }
    if (spaceId === undefined) {
      setErrorMessage({ text: "Space ID is undefined" })
      return
    }
    const reservationDate = new Date(reservation.year, monthShortToNumber(reservation.month)!, reservation.date)
    let res = await createReservation({
      spaceId: spaceId,
      date: reservationDate,
      Rooms: reservation.rooms,
      Amenities: reservation.amenities
    })
    if (!res.ok) {
      try {
        const res = await refresh()
        console.log(res.message)
      } catch (e) {
        console.log(e)
        router.push("/login")
      }

      res = await createReservation({  // retry create reservation
        spaceId: spaceId,
        date: reservationDate,
        Rooms: reservation.rooms,
        Amenities: reservation.amenities
      })

      if (!res.ok) {
        setErrorMessage({ text: res.message })
        return
      }

    }
    router.push("/reservation")
  }
  return (
    <div
      className={`rounded-[20px] p-4
                  ${style === "default" && "border border-navy"}
                  ${style !== "default" && "bg-radial-gradient"}`}
    >
      <div className="flex justify-between pb-2">
        <div className="inline-flex flex-col">
          <h2 className={`text-xl font-medium leading-none ${style === "default" ? "text-cyan" : "text-ice"}`}>
            {name}
          </h2>
          <p className={`text-sm leading-none ${style === "default" ? "text-cyan" : "text-ice"}`}>{location}</p>
        </div>
        {style === "reserve" && <Button text="Reserve" variant="secondary" className="text-ice hover:text-jetstream" onClick={handleSubmitReservation} />}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2">
        <p className={`font-bold ${textColor}`}>Availability</p>{" "}
        <p className={`font-normal ${textColor}`}>{availability}</p>
        <p className={`font-bold ${textColor}`}>Rooms</p>
        <p className={`font-normal ${textColor}`}>{capacity}</p>
        <p className={`font-bold ${textColor}`}>Amenities</p>{" "}
        <p className={`font-normal ${textColor}`}>{amenities}</p>
        <p className={`font-bold ${textColor}`}>Rules</p>{" "}
        <p className={`font-normal ${textColor}`}>{rules}</p>
        <p className={`font-bold ${textColor}`}>Community</p>{" "}
        <p className={`font-normal ${textColor}`}>{community}</p>
      </div>
      {style === "reserve" && (
        <div>
          <div className="grid grid-cols-[3fr_3fr_4fr_3fr] gap-x-1.5 gap-y-1 pt-2">
            <Input label="Date" type="number" value={reservation.date?.toString()}
              onChange={(e) => { setErrorMessage({ text: "" }); setReservation({ ...reservation, date: parseInt(e.target.value, 10) }) }} />
            <Input label="Month" type="text" value={reservation.month}
              onChange={(e) => { setErrorMessage({ text: "" }); setReservation({ ...reservation, month: e.target.value }) }} />
            <Input label="Year" type="number" value={reservation.year?.toString()}
              onChange={(e) => { setErrorMessage({ text: "" }); setReservation({ ...reservation, year: parseInt(e.target.value, 10) }) }} />
            <Input label="Rooms" type="number" value={reservation.rooms?.toString()}
              onChange={(e) => { setErrorMessage({ text: "" }); setReservation({ ...reservation, rooms: parseInt(e.target.value, 10) }) }} />
            <Input label="Amenities" className="col-start-1 col-end-5" type="text" value={reservation.amenities}
              onChange={(e) => { setErrorMessage({ text: "" }); setReservation({ ...reservation, amenities: e.target.value }) }} />
          </div>
          {errorMessage.text != "" && <div className="my-4 rounded-lg  bg-alert p-1 text-sm text-ice" >
            <span className="font-medium"> {errorMessage.text} </span>
          </div>}
        </div>
      )}
    </div>
  )
}

function checkRequiredFields(reservation: IReservationItem): { ok: boolean, message: string } {
  const date = new Date()
  if (reservation.date === undefined || reservation.year === undefined || reservation.rooms === undefined || reservation.amenities === undefined) {
    return { ok: false, message: "Please fill all the fields" }
  }

  if (reservation.date === null || Number.isNaN(reservation.date) || reservation.year === null || Number.isNaN(reservation.year) || reservation.rooms === null || Number.isNaN(reservation.year) || reservation.amenities === null) {
    return { ok: false, message: "Please fill all the fields" }
  }

  if (reservation.date < 0 || reservation.date > 31 || !isDateValid(reservation.date, reservation.month, reservation.year)) { 
    return { ok: false, message: "Invalid date" }
  }
  if (monthShortToNumber(reservation.month) === -1) {
    return { ok: false, message: "Invalid month" }
  }
  if (reservation.year < date.getFullYear()) {
    return { ok: false, message: "Year must be greater than or equal to current year" }
  }

  if (reservation.rooms <= 0 || reservation.rooms > 3) {
    return { ok: false, message: "number of rooms must be 1 - 3" }
  }

  if (reservation.amenities === "") {
    return { ok: false, message: "Amenities cannot be empty" }
  }

  return { ok: true, message: "" }
}
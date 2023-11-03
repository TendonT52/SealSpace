import MyReservation from "./myReservation";
import { Suspense } from "react";
import { refresh } from "@/api/auth/refresh";
import { getReservation } from "@/api/reservation/reservation";

export default async function Reservation() {
  let res = await getReservation()
  if (!res.ok) {
    try {
      const res = await refresh()
    } catch (e) {
      console.log(e)
    }

    res = await getReservation()
  }
  return (
    <main>
      <Suspense fallback={<p> Loading... </p>}>
        <MyReservation records={res} />  
      </Suspense>
    </main>
  )
}

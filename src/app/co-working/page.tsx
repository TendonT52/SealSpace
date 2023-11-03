import { getAllReservation } from "@/api/reservation/reservation";
import AllCoWorking from "./allCoWorking";
import { refresh } from "@/api/auth/refresh";
import { Suspense } from "react";

export default async function CoWorking() {
    let res = await getAllReservation()
    if (!res.ok) {
        try {
            const res = await refresh()
        } catch (e) {
            console.log(e)
        }

        res = await getAllReservation()
    }
    return (
        <main>
            <Suspense fallback={<p> Loading... </p>}>
                <AllCoWorking records={res} />
            </Suspense>
        </main>
    )
}
import { getAllReservation } from "@/api/reservation/reservation";
import AllCoWorking from "./allCoWorking";
import { refresh } from "@/api/auth/refresh";
import { Suspense } from "react";
import { getAllSpace } from "@/api/space/space";

export default async function CoWorking() {
    let res = await getAllSpace()
    if (!res.ok) {
        try {
            const res = await refresh()
        } catch (e) {
            console.log(e)
        }

        res = await getAllSpace()
    }

    return (
        <main>
            <Suspense fallback={<p> Loading... </p>}>
                <AllCoWorking records={res} />
            </Suspense>
        </main>
    )
}
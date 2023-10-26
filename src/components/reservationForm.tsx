import { IReservationItem, Reservation } from "@/types/reservation";
import Brand from "./brand";
import Input from "./input";
import ReservationList from "./reservationList";
import SingleLocationMap from "./singleLocationMap";

export default function ReservationForm({reservation}: {reservation: Reservation}) {
    const reservationDate: IReservationItem[] = []
    for (let i = 0; i < reservation.date.length; i++) {
        const date = (reservation.date)[i].toString().split(" ");
        reservationDate.push({
            id: i.toString(),
            date: Number(date[2]),
            month: date[1],
            year: Number(date[3]),
            amenities: reservation.Amenities,
        })
    }
    const handleFormSubmit = async () => { }
    return (
        <div>
            <form
                className="grid grid-flow-col grid-cols-2 grid-rows-9 gap-5 rounded-default border border-allports bg-ice p-4"
                action={handleFormSubmit}
            >
                <Brand text="Your reserve space" className="col-span-2 text-center text-[28px]" />
                <Input name="Title" type="text" label="Title" value={reservation.space.name} />
                <Input name="Location" type="text" label="Location" value={reservation.space.location} />
                <Input name="Availability" type="text" label="Availability" value={reservation.space.available} />
                <Input name="Capacity" type="number" label="Capacity" value={reservation.space.Rooms.toString()} />
                <Input name="Amenities" type="text" label="Amenities" className="col-span-2" value={reservation.space.Amenities} />
                <Input name="Rules" type="text" label="Rules" className="col-span-2" value={reservation.space.Rules} />
                <Input name="Community" type="text" label="Community" className="col-span-2" value={reservation.space.Community} />
                <ReservationList data={reservationDate} className="col-span-2" />
                <div className="row-span-4">
                    <div className="container h-full">
                        <SingleLocationMap latitude={reservation.space.latitude} longitude={reservation.space.longitude} editable={false} />
                    </div>
                </div>
            </form>
        </div>
    )
}
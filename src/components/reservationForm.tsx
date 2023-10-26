import Brand from "./brand";
import Input from "./input";
import ReservationList from "./reservationList";

export default function ReservationForm() {
    const handleFormSubmit = async () => { }
    return (
        <div className="">
            <form
                className="grid grid-flow-col grid-cols-2 grid-rows-9 gap-5 rounded-default border border-allports bg-ice p-4"
                action={handleFormSubmit}
            >
                <Brand text="Your reserve space" className="col-span-2 text-center text-[28px]" />
                <Input name="Title" type="text" label="Title"/>
                <Input name="Location" type="text" label="Location"/>
                <Input name="Availability" type="text" label="Availability"/>
                <Input name="Capacity" type="text" label="Capacity"/>
                <Input name="Amenities" type="text" label="Amenities" className="col-span-2" />
                <Input name="Rules" type="text" label="Rules" className="col-span-2" />
                <Input name="Community" type="text" label="Community" className="col-span-2" />
                <Input name="dummy" type="text" label="dummy (picture)" className="col-span-2" />
                <div className="row-span-4">
                    <div className="container">
                        <p> picture </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
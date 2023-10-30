"use client"
import { Reservation } from "@/types/reservation";
import Brand from "./brand";
import Input from "./input";
import ReservationList from "./reservationList";
import SingleLocationMap from "./singleLocationMap";
import Button from "./button";
import { useEffect, useState } from "react";
import { Space } from "@prisma/client";
import PlacesAutocomplete from "./placesAutoComplete";
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import Loading from "./loading";
import { useLoadScript } from "@react-google-maps/api";

export default function ReservationSpaceForm({ data, title, type }: { data: Reservation, title: string, type: "own" | "edit" }) {
    const handleFormSubmit = async () => { }

    const [coworking, setCoworking] = useState<Space>(data.space)
    useEffect(() => {
        setCoworking(data.space)
    }, [data])

    const libraries = ['places'];
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    if (!isLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <form
                className="grid grid-flow-col grid-cols-2 grid-rows-9 gap-5 rounded-default border border-allports bg-ice p-4"
                action={handleFormSubmit}
            >
                <div className={`col-span-2 ${type == "edit" ? 'items-center justify-around' : 'items-center justify-center'} flex`}>
                    <Brand text={title} className="w-full text-center text-[28px]" />
                    {type == "edit" &&
                        <div className="flex w-full items-end justify-end gap-x-4">
                            <Button text="Update" variant="primary" type="submit" />
                            <Button text="Delete" variant="secondary" />
                        </div>
                    }
                </div>
                <Input name="Title" type="text" label="Title" value={coworking.name} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, name: e.target.value }) }} />
                {
                    type == "edit" ?
                        <PlacesAutocomplete
                            initialValue={coworking.location}
                            onAddressSelect={(address) => {
                                getGeocode({ address: address }).then((results) => {
                                    const { lat, lng } = getLatLng(results[0]);
                                    setCoworking({ ...coworking, latitude: lat, longitude: lng, location: address });
                                });
                            }}
                        />
                        : <Input name="Location" type="text" label="Location" value={coworking.location} />
                }
                <Input name="Availability" type="text" label="Availability" value={coworking.available} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, available: e.target.value }) }} />
                <Input name="Capacity" type="number" label="Capacity" value={coworking.Rooms.toString()} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, Rooms: Number(e.target.value) }) }} />
                <Input name="Amenities" type="text" label="Amenities" className="col-span-2" value={coworking.Amenities} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, Amenities: e.target.value }) }} />
                <Input name="Rules" type="text" label="Rules" className="col-span-2" value={coworking.Rules} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, Rules: e.target.value }) }} />
                <Input name="Community" type="text" label="Community" className="col-span-2" value={coworking.Community} onChange={(e) => { type == "edit" && setCoworking({ ...coworking, Community: e.target.value }) }} />
                <ReservationList data={data.reservation} className="col-span-2" />
                <div className="row-span-4">
                    <div className="container h-full">
                        <SingleLocationMap latitude={coworking.latitude} longitude={coworking.longitude} editable={false} />
                    </div>
                </div>
            </form>
        </div>
    )
}
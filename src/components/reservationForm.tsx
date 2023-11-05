"use client"
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
import { IReservation } from "@/types/reservation";
import { createSpace, deleteSpace, updateSpace } from "@/api/space/space";
import { refresh } from "@/api/auth/refresh";
import { useRouter } from "next/navigation";
import ErrorMessage from "./errrorMessage";

const libraries = ['places'];

export default function ReservationSpaceForm({ data, type, spaceId }: { data: IReservation, type: "own" | "edit" | "create", spaceId: string }) {
    const handleFormSubmit = async () => { }

    const [coworking, setCoworking] = useState<Space>(data?.space)
    useEffect(() => {
        setCoworking(data?.space)
    }, [data])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });
    const [errorMessage, setErrorMessage] = useState({ text: "" })
    const router = useRouter()

    const handleCreateAction = async () => {
        const res = await createSpace(coworking)
        if (!res.ok) {
            try {
                const res = await refresh()
            } catch (e) {
                console.log(e)
                router.push("/login")
            }

            const res = await createSpace(coworking)
            if (!res.ok) {
                setErrorMessage({ text: res.message })
                return
            }
        }
        window.location.reload();
    }

    const handleUpdateAction = async () => {
        const res = await updateSpace(data.space.id, coworking)
        if (!res.ok) {
            try {
                const res = await refresh()
            } catch (e) {
                console.log(e)
                router.push("/login")
            }

            const res = await updateSpace(data.space.id, coworking)
            if (!res.ok) {
                setErrorMessage({ text: res.message })
                return
            }
        }
        router.refresh()
    }

    const handleDeleteAction = async () => {
        const res = await deleteSpace(data.space.id)
        if (!res.ok) {
            try {
                const res = await refresh()
            } catch (e) {
                console.log(e)
                router.push("/login")
            }

            const res = await deleteSpace(data.space.id)
            if (!res.ok) {
                setErrorMessage({ text: res.message })
                return
            }
        }
        window.location.reload();
    }

    if (!isLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <ErrorMessage text={errorMessage.text} className="col-start-1 col-end-3 text-center" />
            <form
                className="grid grid-flow-col grid-cols-2 grid-rows-9 gap-5 rounded-default border border-allports bg-ice p-4"
                action={handleFormSubmit}
            >
                <div className={`col-span-2 ${type != "own" ? 'items-center justify-around' : 'items-center justify-center'} flex`}>
                    <Brand text={type == "own" ? "Your reserve space" : type == "edit" ? "Edit Your Space" : "Create Your Space"} className="w-full text-center text-[28px]" />
                    {type == "edit" &&
                        <div className="flex w-full items-end justify-end gap-x-4">
                            <Button text="Update" variant="primary" type="submit" onClick={handleUpdateAction} />
                            <Button text="Delete" variant="secondary" onClick={handleDeleteAction} />
                        </div>
                    }
                    {type == "create" &&
                        <div className="flex w-full items-end justify-end gap-x-4">
                            <Button text="Create" variant="primary" type="submit" onClick={handleCreateAction} />
                        </div>
                    }
                </div>
                <Input name="Title" type="text" label="Title" value={coworking?.name} onChange={(e) => { type != "own" && setCoworking({ ...coworking, name: e.target.value }) }} />
                {
                    type != "own" ?
                        <PlacesAutocomplete
                            initialValue={coworking?.location}
                            onAddressSelect={(address) => {
                                getGeocode({ address: address }).then((results) => {
                                    const { lat, lng } = getLatLng(results[0]);
                                    setCoworking({ ...coworking, latitude: lat, longitude: lng, location: address });
                                });
                            }}
                        />
                        : <Input name="Location" type="text" label="Location" value={coworking?.location} />
                }
                <Input name="Availability" type="text" label="Availability" value={coworking?.available} onChange={(e) => { type != "own" && setCoworking({ ...coworking, available: e.target.value }) }} />
                <Input name="Capacity" type="number" label="Capacity" value={coworking?.Rooms?.toString()} onChange={(e) => { type != "own" && setCoworking({ ...coworking, Rooms: Number(e.target.value) }) }} />
                <Input name="Amenities" type="text" label="Amenities" className="col-span-2" value={coworking?.Amenities} onChange={(e) => { type != "own" && setCoworking({ ...coworking, Amenities: e.target.value }) }} />
                <Input name="Rules" type="text" label="Rules" className="col-span-2" value={coworking?.Rules} onChange={(e) => { type != "own" && setCoworking({ ...coworking, Rules: e.target.value }) }} />
                <Input name="Community" type="text" label="Community" className="col-span-2" value={coworking?.Community} onChange={(e) => { type != "own" && setCoworking({ ...coworking, Community: e.target.value }) }} />
                { type != "create" && <ReservationList data={data.reservations} className="col-span-2" spaceId={spaceId} /> }
                <div className="row-span-4">
                    <div className="container h-full">
                        <SingleLocationMap latitude={coworking?.latitude} longitude={coworking?.longitude} editable={false} />
                    </div>
                </div>
            </form>
        </div>
    )
}
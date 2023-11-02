"use client"
import Input from "@/components/input";
import { Space } from ".prisma/client";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import MultiLocationMap from "@/components/multiLocationMap";
import PlacesAutocomplete from "@/components/placesAutoComplete";
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useLoadScript } from "@react-google-maps/api";
import Loading from "@/components/loading";
import { getSpace } from "@/api/space/space";

const libraries = ['places'];

export default function Explore() {
  const [errorMessage, setErrorMessage] = useState({ text: "" })
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [locationSearch, setLocationSearch] = useState<{ lat: number, lng: number }>(spaces.length > 0 ? { lat: spaces[0].latitude, lng: spaces[0].longitude } : { lat: 0, lng: 0 });
  const [selectedCard, setSelectedCard] = useState<{ id: string, lat: number, lng: number }>({} as { id: string, lat: number, lng: number });
  const [amenities, setAmenities] = useState<string>('');

  useEffect(() => {
    const getExploreSpace = async () => {
      const res = await getSpace(amenities, locationSearch.lat, locationSearch.lng)
      if (!res.ok) {
        return setErrorMessage({ ...errorMessage, text: res.message })
      }

      return res.data
    }

    getExploreSpace().then((data) => {
      if (data === undefined) {
        return
      }
      setSpaces(data);

      if (data.length > 0) {
        setSelectedCard({
          id: data[0].id,
          lat: data[0].latitude,
          lng: data[0].longitude
        });
      }
    })
  }, [locationSearch, amenities, errorMessage]);


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
    <div className="my-[33px]">
      <div className="flex justify-center">
        <div className="container grid grid-cols-2 gap-x-3">
          <Input name="Amenities" label="Amenities" placeholder="Amenities" className="h-fit" type="text" value={amenities} onChange={(e) => { setAmenities(e.target.value) }} />
          <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setLocationSearch({ lat: lat, lng: lng });
              });
            }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container mt-[29.5px] grid grid-cols-2">
          <div className="col-span-1">
            {spaces.map((space) => (
              <div key={space.id} className="mb-2.5 mr-2.5" onClick={() => {
                setSelectedCard({
                  id: space.id,
                  lat: space.latitude,
                  lng: space.longitude
                });
              }}>
                <Card name={space.name} location={space.location} availability={space.available} capacity={space.Rooms}
                  amenities={space.Amenities} rules={space.Rules} community={space.Community} style={selectedCard.id == space.id ? "reserve" : "default"}
                />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="sticky top-2">
              {spaces.length > 0 && <MultiLocationMap locations={spaces} selectedLocation={selectedCard} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

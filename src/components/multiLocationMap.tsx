"use client"
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import haversine from "haversine";
import { styles } from './googleMapStyle';
import Loading from "./loading";
import { Space } from ".prisma/client";
import { useEffect, useState } from "react";

const libraries = ['places'];

export default function MultiLocationMap({ locations, selectedLocation }: { locations: Space[], selectedLocation: {lat: number, lng: number} }) {
    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: true,
        styles: styles,
        maxZoom: 17,
        minZoom: 13,
    };

    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    
    useEffect(() => {
        setMapCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }, [selectedLocation]);

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
        <div className="flex items-center justify-center">
            <GoogleMap
                options={mapOptions}
                zoom={15}
                center={ mapCenter }
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '690px', height: '637px', borderRadius: '20px', borderWidth: '1px' }}
            >
                {
                    locations.filter((item) => {
                        return item.latitude !== selectedLocation.lat && item.longitude !== selectedLocation.lng
                            && haversine({ latitude: item.latitude, longitude: item.longitude }, { latitude: selectedLocation.lat, longitude: selectedLocation.lng }, { threshold: 10, unit: 'km' })
                    }).map((item, index) => (
                        <MarkerF key={index} position={
                            {
                                lat: item.latitude,
                                lng: item.longitude
                            }
                        } />
                    ))
                }
                <MarkerF position={{
                    lat: mapCenter.lat,
                    lng: mapCenter.lng
                }} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
            </GoogleMap>
        </div>
    );
}
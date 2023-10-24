"use client"
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import haversine from "haversine";
import { ILocation } from "@/types/map";
import { styles } from './googleMapStyle';
import Loading from "./loading";

export default function MultiLocationMap({locations, selectedLocation}: {locations: ILocation[], selectedLocation: ILocation}) {
    const libraries = useMemo(() => ['places'], []);
    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            styles: styles,
        }),
        []
    );

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
            center={selectedLocation}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '690px', height: '637px', borderRadius: '20px', borderWidth: '1px' }}
            onLoad={(map) => console.log('Map Loaded')}
        >
            {
                locations.filter((item) => {
                    return item.lat !== selectedLocation.lat && item.lng !== selectedLocation.lng 
                    && haversine({ latitude: item.lat, longitude: item.lng }, { latitude: selectedLocation.lat, longitude: selectedLocation.lng }, {threshold: 10, unit: 'km'})
                }).map((item, index) => (
                    <MarkerF key={index} position={item} onLoad={() => console.log('Marker Loaded')} />
                ))
            }
            <MarkerF position={selectedLocation} onLoad={() => console.log('Marker Loaded')} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
        </GoogleMap>
    </div>
    );
}
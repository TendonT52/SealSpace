"use client"
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import haversine from "haversine";
import { styles } from './googleMapStyle';
import Loading from "./loading";
import { Space } from ".prisma/client";

export default function MultiLocationMap({ locations, selectedLocation }: { locations: Space[], selectedLocation: Space }) {
    const libraries = ['places'];
    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: true,
        styles: styles,
        maxZoom: 17,
        minZoom: 13,
    };

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

                center={
                    {
                        lat: selectedLocation.latitude,
                        lng: selectedLocation.longitude
                    }
                }
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '690px', height: '637px', borderRadius: '20px', borderWidth: '1px' }}
            >
                {
                    locations.filter((item) => {
                        return item.latitude !== selectedLocation.latitude && item.longitude !== selectedLocation.longitude
                            && haversine({ latitude: item.latitude, longitude: item.longitude }, { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }, { threshold: 10, unit: 'km' })
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
                    lat: selectedLocation.latitude,
                    lng: selectedLocation.longitude
                }} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
            </GoogleMap>
        </div>
    );
}
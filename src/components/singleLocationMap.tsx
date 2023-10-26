"use client"
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import PlacesAutocomplete from '@/components/placesAutoComplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { styles } from './googleMapStyle';
import Loading from './loading';

export default function SingleLocationMap({ latitude, longitude, editable }: { latitude?: number, longitude?: number, editable: boolean }) {
    const libraries = ['places'];
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        setLat(latitude || 13.7380895);
        setLng(longitude || 100.5272542);
    }, [latitude, longitude]);

    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: true,
        styles: styles,
        maxZoom: 17,
        minZoom: 13,
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (editable && e.latLng) {
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
        }
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
        <div className='h-full w-full'>
            {editable && <PlacesAutocomplete
                onAddressSelect={(address) => {
                    getGeocode({ address: address }).then((results) => {
                        const { lat, lng } = getLatLng(results[0]);
                        setLat(lat);
                        setLng(lng);
                    });
                }}
            />}
            <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width:"100%", height: "100%", borderRadius: '20px', borderWidth: '1px' }}
                onClick={onMapClick}
            >
                <MarkerF position={mapCenter} />
            </GoogleMap>
        </div>
    );
};
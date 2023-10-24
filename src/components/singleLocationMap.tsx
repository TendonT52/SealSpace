"use client"
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import PlacesAutocomplete from '@/components/placesAutoComplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { styles } from './googleMapStyle';
import Loading from './loading';

export default function SingleLocationMap() {
    const libraries = useMemo(() => ['places'], []);
    const [lat, setLat] = useState(13.7380895);
    const [lng, setLng] = useState(100.5272542);

    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            styles: styles,
        }),
        []
    );

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
            alert(`Lat: ${e.latLng.lat()} Lng: ${e.latLng.lng()}`);
        }
        console.log(e);
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
    <div>
        <PlacesAutocomplete
            onAddressSelect={(address) => {
                getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);

                setLat(lat);
                setLng(lng);
                });
            }}
        />
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '382px', height: '220px', borderRadius: '20px', borderWidth: '1px' }}
            onLoad={(map) => console.log('Map Loaded')}
            onClick={onMapClick}
        >
            <MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />
        </GoogleMap>
    </div>
  );
};
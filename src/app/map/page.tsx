"use client"
import MultiLocationMap from "@/components/multiLocationMap";
import SingleLocationMap from "@/components/singleLocationMap";
import { ILocation } from "@/types/map";
import { useState } from "react";

export default function LocationForm() {
    const locations: ILocation[] = [
        {
            name: 'Chulalongkorn University',
            lat: 13.7380895,
            lng: 100.5272542
        },
        {
            name: 'Ashton Chula',
            lat: 13.7313035,
            lng: 100.5310158
        },
        {
            name: 'Chulalongkorn Hospital',
            lat: 13.7324595,
            lng: 100.5360749
        },
        {
            name: 'Central World',
            lat: 13.7465337,
            lng: 100.5391488
        },
        {
            name: 'Future Park Rangsit',
            lat: 13.9895334,
            lng: 100.6184851
        },
        {
            name: "Benchakitti Park",
            lat: 13.7295129,
            lng: 100.5587134
        }
    ];

    const [selectedLocation, setSelectedLocation] = useState<ILocation>(locations[0]); 

    return(
        <div>
            {/* <SingleLocationMap /> */}
            {/* <MultiLocationMap locations={locations} selectedLocation={selectedLocation} /> */}
        </div>
    )
}
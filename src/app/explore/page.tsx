"use client"
import Input from "@/components/input";
import { Space } from ".prisma/client";
import Card from "@/components/card";
import { useState } from "react";
import MultiLocationMap from "@/components/multiLocationMap";

export default function Explore() {
  const spaces: Space[] = [
    {
      id: '0',
      name: 'CoWorkBear Place',
      location: 'Austin, Texas',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 50,
      Amenities: 'WiFi, Fresh Coffee, Indoor lounge, Lockers',
      Rules: "Clean up after yourself, Respect others' space",
      Community: 'Creatives, Entrepreneurs, Tech Professionals',
      latitude: 13.7380895,
      longitude: 100.5272542,
      hostId: 'host1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      name: 'Samyan Mitrtown',
      location: 'Wang Mai, Pathum Wan, Bangkok 10330',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 2,
      Amenities: 'High-speed Internet, Kitchen, Projector, Chill-out-zone',
      Rules: 'Guests allowed with prior notice, No outside food',
      Community: 'SMEs, Remote Workers, Startups',
      latitude: 13.7313035,
      longitude: 100.5310158,
      hostId: 'host1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'BearLoft Studios',
      location: 'Brooklyn, New York',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 75,
      Amenities: 'Mail service, Kitchen, Meditation Room, Printer/Copier',
      Rules: 'No smoking, Keep quiet in meditation room',
      Community: 'Freelancers, Design and Media Companies',
      latitude: 13.7324595,
      longitude: 100.5360749,
      hostId: 'host2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'CoWorkBear Place',
      location: 'Austin, Texas',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 50,
      Amenities: 'WiFi, Fresh Coffee, Indoor lounge, Lockers',
      Rules: "Clean up after yourself, Respect others' space",
      Community: 'Creatives, Entrepreneurs, Tech Professionals',
      latitude: 13.7380895,
      longitude: 100.5272542,
      hostId: 'host1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Samyan Mitrtown',
      location: 'Wang Mai, Pathum Wan, Bangkok 10330',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 2,
      Amenities: 'High-speed Internet, Kitchen, Projector, Chill-out-zone',
      Rules: 'Guests allowed with prior notice, No outside food',
      Community: 'SMEs, Remote Workers, Startups',
      latitude: 13.7313035,
      longitude: 100.5310158,
      hostId: 'host1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'BearLoft Studios',
      location: 'Brooklyn, New York',
      available: 'Mon-Sat, 7AM to 9AM',
      Rooms: 75,
      Amenities: 'Mail service, Kitchen, Meditation Room, Printer/Copier',
      Rules: 'No smoking, Keep quiet in meditation room',
      Community: 'Freelancers, Design and Media Companies',
      latitude: 13.7324595,
      longitude: 100.5360749,
      hostId: 'host2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const [selectedSpace, setSelectedSpace] = useState<Space>({
    latitude: 13.7380895,
    longitude: 100.5272542,
  } as Space);
  return (
    <div className="my-[33px]">
      <div className="flex justify-center">
        <div className="container grid grid-cols-2 gap-x-3">
          <Input name="Amenities" label="Amenities" placeholder="Amenities" />
          <Input name="Location" label="Location" placeholder="Samyan" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container mt-[29.5px] grid grid-cols-2">
          <div className="col-span-1">
            {spaces.map((space) => (
              <div key={space.id} className="mb-2.5 mr-2.5" onClick={() => setSelectedSpace(space)}>
                <Card name={space.name} location={space.location} availability={space.available} capacity={space.Rooms}
                  amenities={space.Amenities} rules={space.Rules} community={space.Community} style={selectedSpace.id === space.id ? "reserve" : "default"}
                />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="sticky top-2">
              <MultiLocationMap locations={spaces} selectedLocation={selectedSpace} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import Card from "@/components/card";
import ReservationForm from "@/components/reservationForm";
import { Reservation } from "@/types/reservation";
import { useState } from "react";
export default function Reservation() {
    const reservations: Reservation[] = [
        {
            id: '1',
            userId: 'user1',
            space: {
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
            date: [new Date('2023-11-01'), new Date('2023-12-01'), new Date('2023-12-02')],
            Rooms: 2,
            Amenities: 'WiFi, Parking',
            createdAt: new Date('2023-10-01'),
            updatedAt: new Date('2023-10-02'),
        },
        {
            id: '2',
            userId: 'user2',
            space: {
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
            date: [new Date('2023-01-01'), new Date('2023-02-01'), new Date('2023-03-01')],
            Rooms: 3,
            Amenities: 'Kitchen, Pool',
            createdAt: new Date('2023-10-02'),
            updatedAt: new Date('2023-10-03'),
        },
        {
            id: '3',
            userId: 'user3',
            space: {
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
            date: [new Date('2023-11-02'), new Date('2023-11-04'), new Date('2023-11-05')],
            Rooms: 1,
            Amenities: 'WiFi',
            createdAt: new Date('2023-10-03'),
            updatedAt: new Date('2023-10-04'),
        },
        {
            id: '4',
            userId: 'user2',
            space: {
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
            date: [new Date('2023-05-01'), new Date('2023-05-02'), new Date('2023-05-03')],
            Rooms: 4,
            Amenities: 'Parking, Gym',
            createdAt: new Date('2023-10-04'),
            updatedAt: new Date('2023-10-05'),
        },
        {
            id: '5',
            userId: 'user1',
            space: {
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
            date: [new Date('2023-11-01'), new Date('2023-12-01'), new Date('2023-12-22')],
            Rooms: 2,
            Amenities: 'WiFi, Kitchen',
            createdAt: new Date('2023-10-05'),
            updatedAt: new Date('2023-10-06'),
        },
    ];
    const [selectedReservation, setSelectedReservation] = useState<Reservation>({} as Reservation);
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className="flex justify-center">
            <div className="container mt-[29.5px] grid grid-cols-2 gap-2.5">
                <div className="col-span-1">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="mb-2.5" onClick={() => { setSelectedReservation(reservation); setIsClicked(true) }}>
                            <Card name={reservation.space.name} location={reservation.space.location} availability={reservation.space.available} capacity={reservation.space.Rooms}
                                amenities={reservation.space.Amenities} rules={reservation.space.Rules} community={reservation.space.Community} style={selectedReservation.id === reservation.id ? "selected" : "default"}
                            />
                        </div>
                    ))}
                </div>
                { isClicked &&
                <div className="col-span-1">
                    <div className="sticky top-2">
                        <ReservationForm reservation={selectedReservation} />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
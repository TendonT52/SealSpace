function getRandomDateInPast(days: number) {
  let tempDate = new Date()
  tempDate.setDate(tempDate.getDate() - Math.floor(Math.random() * days))
  return tempDate
}

export function genReservationSeed(numberOfReservations: number) {
  const reservationSeed: {
    userId: string
    spaceId: string
    date: Date
    Rooms: number
    Amenities: string
  }[] = []
  for (let i = 0; i < numberOfReservations; i++) {
    reservationSeed.push({
      userId: "",
      spaceId: "",
      date: getRandomDateInPast(7),
      Rooms: 1,
      Amenities: "Wifi, Fresh Coffee, Meeting Rooms, Lounge",
    })
  }
  return reservationSeed
}

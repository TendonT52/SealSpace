import prisma from "@/db"
import { createUser } from "../src/api/user/createUser"
import { genReservationSeed } from "./reservation"
import { spaceSeed } from "./spaceSeed"
import { userHostSeed, userRenterSeed } from "./userSeed"

async function main() {
  const hostIds: string[] = []
  const hosts = userHostSeed.map(async (user) => {
    const resUser = await createUser(user)
    if (!resUser.data?.id) {
      console.log(resUser)
      throw new Error("user not created")
    }
    hostIds.push(resUser.data.id)
  })
  await Promise.all(hosts)
  console.log(hostIds)

  const spaceIds: string[] = []
  const spaces = spaceSeed.map(async (space) => {
    const resSpace = await prisma.space.create({
      data: {
        ...space,
        hostId: hostIds[Math.floor(Math.random() * hostIds.length)],
      },
    })
    spaceIds.push(resSpace.id)
  })
  await Promise.all(spaces)
  console.log(spaceIds)

  const renterIds: string[] = []
  const renters = userRenterSeed.map(async (user) => {
    const resUser = await createUser(user)
    if (!resUser.data?.id) {
      console.log(resUser)
      throw new Error("user not created")
    }
    renterIds.push(resUser.data.id)
  })
  await Promise.all(renters)
  console.log(renterIds)

  const reservationIds: string[] = []
  const reservations = genReservationSeed(30).map(async (res) => {
    const resSpace = await prisma.reservation.create({
      data: {
        ...res,
        userId: renterIds[Math.floor(Math.random() * renterIds.length)],
        spaceId: spaceIds[Math.floor(Math.random() * spaceIds.length)],
      },
    })
    reservationIds.push(resSpace.id)
  })
  await Promise.all(reservations)
  console.log(reservationIds)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

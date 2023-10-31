import { ReqCreateUser, createUser } from "../src/api/user/createUser"
import { Role } from "../src/types/user"

async function main() {
  const users: ReqCreateUser[] = [
    {
      name: "host1",
      telephone: "1234567890",
      email: "host1@localhost",
      password: "host1234",
      role: Role.HOST,
    },
    {
      name: "host2",
      telephone: "1234567890",
      email: "host2@localhost",
      password: "host1234",
      role: Role.HOST,
    },
    {
      name: "host3",
      telephone: "1234567890",
      email: "host3@localhost",
      password: "host1234",
      role: Role.HOST,
    },
    {
      name: "renter1",
      telephone: "1234567890",
      email: "renter1@localhost",
      password: "renter1234",
      role: Role.RENTER,
    },
    {
      name: "renter2",
      telephone: "1234567890",
      email: "renter2@localhost",
      password: "renter1234",
      role: Role.RENTER,
    },
    {
      name: "renter3",
      telephone: "1234567890",
      email: "renter3@localhost",
      password: "renter1234",
      role: Role.RENTER,
    },
  ]

  users.forEach((user) => {
    console.log(user)
    createUser(user)
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

import { ReqCreateUser } from "@/api/user/createUser"
import { Role } from "@/types/user"

export const userHostSeed: ReqCreateUser[] = [
  {
    name: "host",
    telephone: "1234567890",
    email: "host@localhost",
    password: "host1234",
    role: Role.HOST,
  },
  {
    name: "John Doe",
    telephone: "5417543044",
    email: "john.doe@gmail.com",
    password: "johnDoeSecure123",
    role: Role.HOST,
  },
  {
    name: "Emily Davis",
    telephone: "4155552692",
    email: "emily.davis@hotmail.com",
    password: "emilyDavisSecure123",
    role: Role.HOST,
  },
  {
    name: "Robert Smith",
    telephone: "4155552692",
    email: "robert.smith@yahoo.com",
    password: "robertSmithSecure123",
    role: Role.HOST,
  },
]

export const userRenterSeed: ReqCreateUser[] = [
  {
    name: "renter",
    telephone: "1234567890",
    email: "renter@localhost",
    password: "renter1234",
    role: Role.RENTER,
  },
  {
    name: "Jake Black",
    telephone: "3017645528",
    email: "jake.black@gmail.com",
    password: "jakeBlackSecure123",
    role: Role.RENTER,
  },
  {
    name: "Rachel Green",
    telephone: "2024561118",
    email: "rachel.green@hotmail.com",
    password: "rachelGreenSecure123",
    role: Role.RENTER,
  },
  {
    name: "Monica Geller",
    telephone: "2024561441",
    email: "monica.geller@yahoo.com",
    password: "monicaGellerSecure123",
    role: Role.RENTER,
  },
]

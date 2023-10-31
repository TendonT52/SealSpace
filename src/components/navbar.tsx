"use client"
import { logout } from "@/api/auth/logout"
import { AuthContext } from "@/app/authContext"
import Banner from "@/components/banner"
import Button from "@/components/button"
import { Role } from "@/types/user"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useContext } from "react"

// export default function Navbar({ action }: { action: () => Promise<ResLogout> }) {
export default function Navbar() {
  const rounter = useRouter()
  const { userId, role, setAuth } = useContext(AuthContext)
  return (
    <nav className="flex justify-center border-b border-allports bg-ice py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Banner onClick={() => rounter.push("/")} />
          <Button text="Explore spaces" variant="link" onClick={() => rounter.push("/explore")} />
          {(role === Role.HOST || role === Role.RENTER) && (
            <Button text="My reservation" variant="link" onClick={() => rounter.push("/reservation")} />
          )}
          {role === Role.HOST && <Button text="My spaces" variant="link" />}
        </div>
        <div className="flex items-center gap-3">
          {role === Role.GUEST && (
            <Button text="Register" variant="secondary" onClick={() => rounter.push("/register")} />
          )}
          {role === Role.GUEST && <Button text="Login" variant="primary" onClick={() => rounter.push("/login")} />}
          {(role === Role.HOST || role === Role.RENTER) && (
            <Button
              text="Logout"
              variant="secondary"
              onClick={async () => {
                try {
                  const res = await logout()
                  console.log(res)
                } catch (e) {
                  console.log(e)
                }
                rounter.push("/")
                localStorage.removeItem("role")
                localStorage.removeItem("userId")
                deleteCookie("access_token")
                deleteCookie("refresh_token")
                setAuth({ userId: "", role: Role.GUEST })
              }}
            />
          )}
        </div>
      </div>
    </nav>
  )
}

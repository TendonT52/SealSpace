import Banner from "@/components/banner"
import Button from "@/components/button"

export default function Navbar({ role }: { role: "host" | "renter" | "guest" }) {
  return (
    <nav className="flex justify-center border-b border-allports bg-ice py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Banner />
          <Button text="Explore spaces" type="link" />
          {(role === "host" || role === "renter") && <Button text="My reservation" type="link" />}
          {role === "host" && <Button text="My spaces" type="link" />}
        </div>
        <div className="flex items-center gap-3">
          {role === "guest" && <Button text="Register" type="secondary" />}
          {role === "guest" && <Button text="Login" type="primary" />}
          {(role === "host" || role === "renter") && <Button text="Logout" type="secondary" />}
        </div>
      </div>
    </nav>
  )
}

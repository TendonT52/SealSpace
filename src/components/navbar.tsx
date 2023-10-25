import Banner from "@/components/banner"
import Button from "@/components/button"

export default function Navbar({ role }: { role: "host" | "renter" | "guest" }) {
  return (
    <nav className="flex justify-center border-b border-allports bg-ice py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Banner />
          <Button text="Explore spaces" variant="link" />
          {(role === "host" || role === "renter") && <Button text="My reservation" variant="link" />}
          {role === "host" && <Button text="My spaces" variant="link" />}
        </div>
        <div className="flex items-center gap-3">
          {role === "guest" && <Button text="Register" variant="secondary" />}
          {role === "guest" && <Button text="Login" variant="primary" />}
          {(role === "host" || role === "renter") && <Button text="Logout" variant="secondary" />}
        </div>
      </div>
    </nav>
  )
}

"use client"
import { ReqLogin, ResLogin, login } from "@/api/auth/login"
import Brand from "@/components/brand"
import Button from "@/components/button"
import ErrorMessage from "@/components/errrorMessage"
import Input from "@/components/input"
import { Role } from "@/types/user"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { AuthContext } from "../authContext"
import { getCookie } from "cookies-next"

export default function Form() {
  const router = useRouter()
  const [formState, setFormState] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState({ text: "" })
  const { userId, role, setAuth } = useContext(AuthContext)

  const handleFormSubmit = async () => {
    const res = await login(formState as ReqLogin)
    console.log(res)
    if (!res.ok) {
      setErrorMessage({ ...errorMessage, text: res.message })
      return
    }
    const access_token = getCookie("access_token")
    if (access_token === undefined) {
      setErrorMessage({ ...errorMessage, text: "Something went wrong" })
      return
    }
    const user: { userId: string; role: string } = jwt.decode(access_token) as {
      userId: string
      role: string
    }
    localStorage.setItem("userId", user.userId)
    localStorage.setItem("role", user.role)
    console.log(user)
    setAuth({ userId: user.userId, role: user.role as Role })
    router.push("/explore")
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleRoutToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/register")
  }
  return (
    <div className="flex grow items-center justify-center">
      <form
        className="inline-grid grid-cols-2 grid-rows-[auto_1fr] gap-2 rounded-default border border-allports bg-ice p-4"
        action={handleFormSubmit}
      >
        <Brand text="Log In" className="col-start-1 col-end-3 text-center" />
        <Input
          name="email"
          type="email"
          label="Email"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.email}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.password}
        />
        <Button text="Register" variant="secondary" onClick={handleRoutToLogin} />
        <Button text="Log In" variant="primary" type="submit" />
        <ErrorMessage text={errorMessage.text} className="col-start-1 col-end-3 text-center" />
      </form>
    </div>
  )
}

"use client"
import Brand from "@/components/brand"
import Button from "@/components/button"
import CheckBox from "@/components/checkBox"
import ErrorMessage from "@/components/errrorMessage"
import Input from "@/components/input"
import { Role } from "@/types/user"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ReqCreateUser, ResCreateUser, validateEmail, validateName, validatePassword, validateTelephone } from "./data"

export default function Form({ action }: { action: (req: ReqCreateUser) => Promise<ResCreateUser> }) {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    telephone: "",
    email: "",
    password: "",
    rePassword: "",
    host: false,
  })
  const [errorMessage, setErrorMessage] = useState({
    text: "",
    name: false,
    telephone: false,
    email: false,
    password: false,
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "host") {
      setFormState({ ...formState, [e.target.name]: e.target.checked })
      return
    }
    if (
      e.target.name === "telephone" &&
      e.target.value.length != 0 &&
      (e.target.value.length > 10 || !/^[\d]+$/.test(e.target.value))
    ) {
      return
    }
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleRoutToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/login")
  }

  const handleFormSubmit = async () => {
    setErrorMessage({ name: false, telephone: false, email: false, password: false, text: "" })
    const req: ReqCreateUser = {
      name: formState.name,
      telephone: formState.telephone,
      email: formState.email,
      password: formState.password,
      role: formState.host ? Role.HOST : Role.RENTER,
    }

    if (!validateName(req.name).isValid) {
      setErrorMessage((prev) => {
        return { ...prev, name: true, text: validateName(req.name).error }
      })
      return
    }

    if (!validateTelephone(req.telephone).isValid) {
      setErrorMessage((prev) => {
        return { ...prev, telephone: true, text: validateTelephone(req.telephone).error }
      })
      return
    }

    if (!validateEmail(req.email).isValid) {
      setErrorMessage((prev) => {
        return { ...prev, email: true, text: validateEmail(req.email).error }
      })
      return
    }

    if (formState.password !== formState.rePassword) {
      setErrorMessage({ ...errorMessage, password: true, text: "Password and re-password not match" })
      return
    }

    if (!validatePassword(req.password).isValid) {
      setErrorMessage((prev) => {
        return { ...prev, password: true, text: validatePassword(req.password).error }
      })
      return
    }

    const res = await action(req)
    if (res.access_token) {
      const { userId, role }: { userId: string; role: string } = jwt.decode(res.access_token) as {
        userId: string
        role: string
      }
      localStorage.setItem("userId", userId)
      localStorage.setItem("role", role)
      return
    }
    if (res.error) {
      setErrorMessage({ ...errorMessage, text: res.error })
      return
    }
  }

  return (
    <div className="flex grow items-center justify-center">
      <form
        className="inline-grid grid-cols-2 grid-rows-[auto_1fr] gap-2 rounded-default border border-allports bg-ice p-4"
        action={handleFormSubmit}
      >
        <Brand text="Register" className="col-start-1 col-end-3 text-center" />
        <Input
          name="name"
          label="Name"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.name}
          alert={errorMessage.name}
        />
        <Input
          type="tel"
          name="telephone"
          label="Telephone"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.telephone}
          alert={errorMessage.telephone}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.email}
          alert={errorMessage.email}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.password}
          alert={errorMessage.password}
        />
        <Input
          type="password"
          name="rePassword"
          label="Re-password"
          className="col-start-1 col-end-3"
          onChange={handleFormChange}
          value={formState.rePassword}
          alert={errorMessage.password}
        />
        <CheckBox
          text="I want to host a space"
          className="col-start-1 col-end-3 px-3"
          name="host"
          onChange={handleFormChange}
          value={formState.host}
        />
        <Button text="Login" variant="secondary" onClick={handleRoutToLogin} />
        <Button text="Register" variant="primary" type="submit" />
        <ErrorMessage text={errorMessage.text} className="col-start-1 col-end-3 text-center" />
      </form>
    </div>
  )
}

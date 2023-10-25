"use client"
import Brand from "@/components/brand"
import Button from "@/components/button"
import ErrorMessage from "@/components/errrorMessage"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Form() {
    const router = useRouter()
    const [formState, setFormState] = useState({ email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState({ text: "", email: false, password: false })
    const handleFormSubmit = async () => { }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => { }
    const handleRoutToLogin = (e: React.MouseEvent<HTMLButtonElement>) => { }
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
                <Button text="Sign Up" variant="secondary" onClick={handleRoutToLogin} />
                <Button text="Log In" variant="primary" type="submit" />
                <ErrorMessage text={errorMessage.text} className="col-start-1 col-end-3 text-center" />
            </form>
        </div>
    )
}

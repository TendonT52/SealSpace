"use client"
import { Role } from "@/types/user"
import { ReactNode, createContext, useEffect, useState } from "react"

interface AuthContextValue {
  userId: string
  role: Role
}

interface AuthContextProviderValue extends AuthContextValue {
  setAuth: ({ userId, role }: { userId: string; role: Role }) => void
}

export const AuthContext = createContext<AuthContextProviderValue>({
  userId: "",
  role: Role.GUEST,
  setAuth: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  let userId = ""
  let role = Role.GUEST
  useEffect(() => {
    let roleStorage = Role.GUEST
    const userIdLocal = localStorage.getItem("userId")
    const roleLocal = localStorage.getItem("role")

    if (roleLocal === Role.HOST) {
      roleStorage = Role.HOST
    } else if (roleLocal === Role.RENTER) {
      roleStorage = Role.RENTER
    }

    setAuth({
      userId: userIdLocal || "",
      role: roleStorage,
    })
  }, [])

  const [auth, setAuth] = useState<AuthContextValue>({
    userId: userId,
    role: role,
  })

  return (
    <AuthContext.Provider value={{ userId: auth.userId, role: auth.role, setAuth: setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

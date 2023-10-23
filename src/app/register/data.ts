import { Role } from "@/types/user"
import { Validation } from "@/types/validation"

export interface ReqCreateUser {
  name: string
  telephone: string
  email: string
  password: string
  role: Role
}

export function validateName(name: string): Validation {
  if (name === "") return { isValid: false, error: "Name is required." }
  if (name.length < 2) return { isValid: false, error: "The name must be at least 2 characters." }
  if (name.length > 30) return { isValid: false, error: "The name must be at most 30 characters." }
  if (!/^[A-Za-z\s]+$/.test(name)) return { isValid: false, error: "The name can only contain alphabets and spaces" }
  return { isValid: true, error: "" }
}

export function validateTelephone(telephone: string): Validation {
  if (telephone === "") return { isValid: false, error: "Telephone is required." }
  if (!/^\d{10}$/.test(telephone)) return { isValid: false, error: "The telephone number should be 10 digits long." }
  return { isValid: true, error: "" }
}

export function validateEmail(email: string): Validation {
  if (email === "") return { isValid: false, error: "Email is required." }
  if (!/^\S+@\S+$/.test(email)) return { isValid: false, error: "Invalid email." }
  return { isValid: true, error: "" }
}

export function validatePassword(password: string): Validation {
  if (password === "") return { isValid: false, error: "Password is required." }
  if (password.length < 8) return { isValid: false, error: "The password must be at least 8 characters." }
  if (password.length > 30) return { isValid: false, error: "The password must be at most 30 characters." }
  return { isValid: true, error: "" }
}

export function validateRole(role: string): Validation {
  if (role === undefined) return { isValid: false, error: "Role is required." }
  if (role !== Role.HOST && role !== Role.RENTER) return { isValid: false, error: "Invalid role." }
  return { isValid: true, error: "" }
}

export interface ResCreateUser {
  error?: string
  access_token?: string
}

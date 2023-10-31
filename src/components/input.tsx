"use client"
export default function Input({
  type = "text",
  name = "",
  label = "",
  value = "",
  placeholder = "",
  className = "",
  alert = false,
  onChange = () => {},
}: {
  type?: "text" | "password" | "email" | "number" | "tel"
  name?: string
  label?: string
  value?: string
  placeholder?: string
  disable?: boolean
  className?: string
  alert?: boolean
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div
      className={`${
        alert ? "border-alert" : "border-allports"
      } inline-flex min-w-0 items-center gap-x-2 overflow-hidden rounded-default border bg-stone px-3 ${className}`}
    >
      <label className={`${alert ? "text-alert" : "text-cyan"} inline text-center font-normal `}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className={`${
          alert ? "text-alert" : "text-allports"
        } grow bg-stone font-roboto text-base placeholder:text-jetstream focus:border-transparent focus:outline-none`}
      />
    </div>
  )
}

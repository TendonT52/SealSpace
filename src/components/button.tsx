"use client"

export default function Button({
  text,
  type = "button",
  variant,
  className = "",
  onClick = () => {},
}: {
  text: string
  type?: "button" | "submit" | "reset"
  variant: "primary" | "secondary" | "link"
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        self-stretch rounded-[20px] text-lg font-normal transition-colors
        ${
          variant === "primary"
            ? "bg-gradient-to-t from-allports to-mint px-4 text-ice hover:from-navy hover:to-allports hover:drop-shadow-md"
            : variant === "secondary"
            ? "border px-4 text-allports hover:text-navy hover:drop-shadow-md"
            : variant === "link"
            ? "px-1 text-allports hover:text-navy hover:drop-shadow-md"
            : ""
        }
        ${className}
      `}
    >
      {text}
    </button>
  )
}

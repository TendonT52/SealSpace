export default function Brand({
  text,
  clickAble = false,
  className,
}: {
  text: string
  clickAble?: boolean
  className?: string
}) {
  return (
    <h1
      className={`
        inline-block
        bg-gradient-to-b from-mint to-cyan bg-clip-text text-center
        font-nunito text-4xl font-bold text-transparent
        ${clickAble ? "cursor-pointer hover:to-navy hover:drop-shadow-md" : "cursor-default"}
        ${className}
      `}
    >
      {text}
    </h1>
  )
}

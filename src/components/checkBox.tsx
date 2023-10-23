export default function CheckBox({
  name,
  text,
  className,
  value = false,
  onChange = () => {},
}: {
  name: string
  text: string
  className?: string
  value?: boolean
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className={`flex items-center hover:drop-shadow-md ${className}`}>
      <input
        name={name}
        checked={value}
        onChange={(e) => onChange(e)}
        id="default-checkbox"
        type="checkbox"
        value=""
        className="
        peer
        h-4 w-4 shrink-0 appearance-none rounded-md
        border-2
        border-allports bg-stone
        checked:border-0 checked:bg-allports focus:outline-none focus:ring-0
        focus:ring-cyan focus:ring-offset-0
        "
      />
      <label htmlFor="default-checkbox" className="ml-2  text-sm font-normal text-allports">
        {text}
      </label>
    </div>
  )
}

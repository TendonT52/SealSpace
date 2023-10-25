import Button from "@/components/button"
import Input from "@/components/input"

export default function Card({
  style = "default",
  name,
  location,
  availability,
  capacity,
  amenities,
  rules,
  community,
}: {
  style?: "default" | "selected" | "reserve"
  name: string
  location: string
  availability: string
  capacity: string
  amenities: string
  community: string
  rules: string
}) {
  const textColor = style === "default" ? "text-cyan" : "text-ice"
  const date = new Date()
  return (
    <div
      className={`rounded-[20px] p-4
                  ${style === "default" && "border border-navy"}
                  ${style !== "default" && "bg-radial-gradient"}`}
    >
      <div className="flex justify-between pb-2">
        <div className="inline-flex flex-col">
          <h2 className={`text-xl font-medium leading-none ${style === "default" ? "text-cyan" : "text-ice"}`}>
            {name}
          </h2>
          <p className={`text-sm leading-none ${style === "default" ? "text-cyan" : "text-ice"}`}>{location}</p>
        </div>
        {style === "reserve" && <Button text="Reserve" variant="secondary" className="text-ice hover:text-jetstream" />}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2">
        <p className={`font-normal ${textColor}`}>Availability</p>{" "}
        <p className={`font-normal ${textColor}`}>{availability}</p>
        <p className={`font-normal ${textColor}`}>Rooms</p>
        <p className={`font-normal ${textColor}`}>{capacity}</p>
        <p className={`font-normal ${textColor}`}>Amenities</p>{" "}
        <p className={`font-normal ${textColor}`}>{amenities}</p>
        <p className={`font-normal ${textColor}`}>Rules</p>{" "}
        <p className={`font-normal ${textColor}`}>{rules}</p>
        <p className={`font-normal ${textColor}`}>Community</p>{" "}
        <p className={`font-normal ${textColor}`}>{community}</p>
      </div>
      {style === "reserve" && (
        <div className="grid grid-cols-[3fr_3fr_4fr_3fr] gap-x-1.5 gap-y-1 pt-2">
          <Input placeholder={date.getDate().toString()} label="Date" />
          <Input placeholder={date.getMonth().toString()} label="Month" />
          <Input placeholder={date.getFullYear().toString()} label="Year" />
          <Input placeholder="1" label="Rooms" />
          <Input placeholder={amenities} label="Amenities" className="col-start-1 col-end-5" />
        </div>
      )}
    </div>
  )
}

import PlacesAutocomplete from "@/components/placesAutoComplete"
import Brand from "@/components/brand"
import Button from "@/components/button"
import Card from "@/components/card"
import Dropdown from "@/components/dropdown"
import Footer from "@/components/footer"
import Input from "@/components/input"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Dropdown />
      <Button text="primary" variant="primary" />
      <Button text="secondary" variant="secondary" />
      <Input placeholder="placeholder" />
      <Input placeholder="placeholder" value="value" />
      <Input placeholder="placeholder" label="label" />
      <Input placeholder="placeholder" label="label" value="value" />
      <Input placeholder="placeholder" disable />
      <Input placeholder="placeholder" disable value="value" />
      <Input placeholder="placeholder" disable label="label" />
      <Input placeholder="placeholder" disable label="label" value="value" />
      <Button text="link" variant="link" />
      <Brand text="Seal Space" clickAble />
      <Card
        name="Samyan Mitrtown"
        location="Wang Mai, Pathum Wan, Bangkok 10330"
        availability="24/7"
        capacity="29"
        amenities="High-speed Internet, Kitchen, Projector, Chill-out-zone"
        community="SMEs, Remote Workers, Startups"
      />
      <Card
        style="selected"
        name="Samyan Mitrtown"
        location="Wang Mai, Pathum Wan, Bangkok 10330"
        availability="24/7"
        capacity="29"
        amenities="High-speed Internet, Kitchen, Projector, Chill-out-zone"
        community="SMEs, Remote Workers, Startups"
      />
      <Card
        style="reserve"
        name="Samyan Mitrtown"
        location="Wang Mai, Pathum Wan, Bangkok 10330"
        availability="24/7"
        capacity="29"
        amenities="High-speed Internet, Kitchen, Projector, Chill-out-zone"
        community="SMEs, Remote Workers, Startups"
      />
    </div>
  )
}

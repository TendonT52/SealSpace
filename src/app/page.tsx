import Brand from "@/components/brand"
import Image from "next/image"
import Link from "next/link"
export default function Home() {
  return (
    <div>
      <div className="my-16 flex flex-row items-center justify-center gap-x-16">
        <div className="flex h-[177px] w-[579px] flex-col">
          <div className="flex flex-col items-start">
            <Brand text="Discover the Perfect" className="text-5xl/[72px]"/>
            <Brand text="Co-Working space for you" className="text-5xl/[72px]"/>
          </div>
          <div className="flex flex-row-reverse text-allports">
            <p className="font-roboto text-base font-normal"> 
              For co-working hosts 
              <Link href="/reservation" className="font-medium"> click </Link> 
            </p>
          </div>
        </div>
        <div>
          <Image src="/home/map.png" width={465} height={420} alt="home-map" className="-rotate-6 rounded-default border border-allports"/>
        </div>
      </div>

    </div>
  )
}

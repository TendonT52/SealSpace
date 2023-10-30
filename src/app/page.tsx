import Benefit from "@/components/benefit"
import Brand from "@/components/brand"
import Image from "next/image"
import Link from "next/link"
export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="container my-16 flex flex-row items-center justify-around gap-x-16">
          <div className="flex flex-col">
            <Brand text="Discover the Perfect" className="text-5xl/[72px]" />
            <Brand text="Co-Working space for you" className="text-5xl/[72px]" />
            <div className="flex flex-row-reverse text-allports">
              <p className="font-roboto text-base font-normal">
                For co-working hosts
                <Link href="/reservation" className="font-medium">
                  {" "}
                  click{" "}
                </Link>
              </p>
            </div>
          </div>
          <Image
            src="/home/map.png"
            width={465}
            height={420}
            alt="home-map"
            className="-rotate-6 rounded-default border border-allports"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container my-20 flex flex-row items-center justify-around gap-8">
          <Image src="/home/reservation_list.png" width={570} height={209} alt="home-reservation-list" />
          <div className="flex flex-col items-start">
            <Brand text="Streamline" className="text-5xl/[72px]" />
            <Brand text="Workspace Management" className="text-5xl/[72px]" />
            <Brand text="With Powerful Tools" className="text-5xl/[72px]" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container my-12 flex flex-row items-center justify-around gap-14">
          <div className="flex shrink grow-0 basis-[600px] flex-col items-start">
            <Brand text="Discover and Reserve the Perfect Co-Working Space for Your Needs" className="text-left" />
            <br></br>
            <p className="text-navy">
              Our platform makes it easy to find and book co-working spaces that meet your requirements. With just a few
              clicks, you can secure a workspace that suits your needs and preferences.
            </p>
            <br></br>
            <div className="flex flex-row gap-6">
              <Benefit
                title="Convenient"
                description="Effortlessly search and reserve co-working spaces with our user-friendly platform."
              />
              <Benefit
                title="Flexible"
                description="Customize your workspace by adding facilities according to your specific needs."
              />
            </div>
          </div>
          <Image src="/home/reservation.png" width={480} height={284} alt="home-reservation-list" />
        </div>
      </div>
    </div>
  )
}

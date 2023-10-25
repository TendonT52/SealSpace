import Image from "next/image"
export default function Benefit({title, description}: {title: string, description: string}){
    return (
        <div className="flex w-[296px] flex-col text-navy">
            <Image src="/home/box.png" width={48} height={48} alt="home-benefit"/>
            <p className="my-4"> {title} </p>
            <p className="my-4"> {description} </p>
        </div>
    )
}
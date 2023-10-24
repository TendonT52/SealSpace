"use client"
import { IReservationItem } from "@/types/reservation";
import Image from 'next/image'
import { useState } from "react";

export default function ReservationRow({item, selectedId, setSelectedId}: {item: IReservationItem, selectedId: string, setSelectedId: (id: string) => void}) {
    if (selectedId == item.id) {
        return (
            <tr className="text-center text-navy">
                <InputBox title={item.date.toString()} type="number"/>
                <InputBox title={item.month} type="text"/>
                <InputBox title={item.year.toString()} type="number"/>
                <InputBox title={item.amenities} type="text"/>
                <td>
                    <div className="flex justify-center gap-1">
                        <button onClick={(e) => {setSelectedId("")}}>
                            <Image
                                src="/icon/confirm.png"
                                width={19}
                                height={19}
                                alt="Confirm"
                            />
                        </button>
                        <button onClick={(e) => {setSelectedId("")}}> 
                            <Image
                                src="/icon/cancel.png"
                                width={19}
                                height={19}
                                alt="Cancel"
                            />
                        </button> 
                    </div> 
                </td>
            </tr>
        )
    } else {
        return (
            <tr className="text-center text-navy">
                <td> {item.date} </td>
                <td> {item.month} </td>
                <td> {item.year} </td>
                <td> {item.amenities} </td>
                {/* <InputBox title={item.date.toString()} type="number"/>
                <InputBox title={item.month} type="text"/>
                <InputBox title={item.year.toString()} type="number"/>
                <InputBox title={item.amenities} type="text"/> */}

                <td>
                    <div className="flex justify-center gap-1">
                        <button>
                            <Image
                                src="/icon/delete.png"
                                width={19}
                                height={19}
                                alt="Delete"
                            />
                        </button>
                        <button onClick={() => {
                            setSelectedId(item.id)
                        }}> 
                            <Image
                                src="/icon/edit.png"
                                width={19}
                                height={19}
                                alt="Edit"
                            />
                        </button> 
                    </div> 
                </td>
            </tr>
        )
    }
}

function InputBox({title, type}: {title: string | number, type: string}) {
    const [value, setValue] = useState<string | number>(title);
    return (
        <td> 
            <input type={type} name="date" value={value} className="w-fit rounded-default border text-center" onChange={(e) => {setValue(e.target.value)}} /> 
        </td>
    )
}
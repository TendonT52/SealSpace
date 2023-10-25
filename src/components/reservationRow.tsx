"use client"
import { IReservationItem } from "@/types/reservation";
import Image from 'next/image'
import { useState } from "react";

export default function ReservationRow({item, selectedId, setSelectedId}: {item: IReservationItem, selectedId: string, setSelectedId: (id: string) => void}) {
    if (selectedId == item.id) {
        return (
            <tr className="text-center text-navy">
                <InputBox title={item.date.toString()} type="date"/>
                <InputBox title={item.month} type="month"/>
                <InputBox title={item.year.toString()} type="year"/>
                <InputBox title={item.amenities} type="amenities"/>
                <td colSpan={1}>
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
                <td colSpan={1}> {item.date} </td>
                <td colSpan={1}> {item.month} </td>
                <td colSpan={1}> {item.year} </td>
                <td colSpan={2}> {item.amenities} </td>

                <td colSpan={1}>
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
    let width = 1
    let typeInput = "text"
    if (type == "date" || type == "year") {
        typeInput = "number"
    }
    if (type == "amenities") {
        width = 2
    }
    
    return (
        <td colSpan={width}>
            <div>
                <input type={typeInput} name="date" value={value} className="w-full rounded-default border px-1 text-center" onChange={(e) => {setValue(e.target.value)}} /> 
            </div>
        </td>
    )
}
"use client"

import { useState } from "react"

export default function Dropdown() {
    const [search, setSerach] = useState("")
    const mockList = ["Upperlow Case", "Lower Case", "Camel Case", "Kebab Case"]
    
    return (
        <>
            <div id="dropdown-menu" className="inline-flex w-80 gap-x-2 rounded-t-2xl border bg-stone px-3">
                <label className="font-normal text-cyan"> Location </label>
                <input id="search-input" className="bg-stone font-roboto text-base placeholder:text-jetstream focus:border-transparent focus:outline-none" type="text" 
                placeholder="Search items" value={search} onChange={(e) => {setSerach(e.target.value)}}/>
            </div>
            <div className="w-80">
                {mockList.filter((item) => item.toLowerCase().includes(search.toLowerCase())).map((item, index, array) => {
                    return (
                    <div className={`${ index === array.length - 1 ? 'rounded-b-2xl': '' } border ${ index % 2 === 1 ? 'bg-ice' : '' } px-3 font-roboto text-base`} key={item}>
                        <p> {item} </p>
                    </div>
                    )
                })}
            </div>
        </>
    )
}
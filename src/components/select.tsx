"use client"

import { UserData } from "@/api/user/user"

export default function Select({
    className = "",
    defaultValue = "",
    userNames,
    onChange,
}: {
    className?: string,
    defaultValue: string,
    userNames: UserData[],
    onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void
}) {
    return (
        <div
            className={`${className} inline-flex min-w-0 items-center gap-x-2 overflow-hidden rounded-default border border-allports bg-stone px-3`}
        >
            <label className={"inline text-center font-normal text-cyan"}> User </label>
            <select
                className={"w-full bg-stone font-roboto text-base text-allports placeholder:text-jetstream focus:border-transparent focus:outline-none"}
                onChange={onChange}
                defaultValue={defaultValue}
            >
                {userNames.map((user) => (
                    <option key={user.id} value={user.id}> {user.name} </option>
                ))}
            </select>
        </div>
    )
}





import React, { useEffect, useRef } from 'react'

function FloorData({
    floorData,
    isFocused,
    setfocusElm,
    item,
    setIsElmFocused
}: {
    floorData: any,
    isFocused: any,
    setfocusElm: any,
    item: any,
    setIsElmFocused: any
}) {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.addEventListener("click", () => {
            setfocusElm(floorData)
            setIsElmFocused(true)
        })

        ref.current?.addEventListener("blur", () => {
            setIsElmFocused(false)
        })
    }, [])


    return (
        <div ref={ref} className={`w-full mb-1 cursor-pointer ${isFocused ? "bg-sky-800" : ""} flex justify-between px-2`}>
            <div className='font-semibold font-normal text-[15px]'>{floorData?.code}</div>
            <div className='font-semibold font-normal text-[15px]'>{floorData?.name}</div>
        </div>
    )
}

export default FloorData


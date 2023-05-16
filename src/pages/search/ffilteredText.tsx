


import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FilteredText({
    employee,
    filtered
}: {
    employee: any,
    filtered: any
}) {

    let [hover, setHover] = useState(false)
    let ref = useRef<HTMLDivElement>(null)
    let navigate = useNavigate()
    useEffect(() => {
        ref.current?.addEventListener("mouseenter", () => {
            setHover(true)
        })

        ref.current?.addEventListener("mouseleave", () => {
            setHover(false)
        })

    }, [])

    function navigateToResultPage() {
        navigate(`../result/${employee.code}`)
    }


    return (
        <div onClick={navigateToResultPage} ref={ref} className={`flex ${hover ? "bg-gray-100" : ""} cursor-pointer justify-between p-2 border-b-2 border-[#000000]`}>
            <div>{employee.code}</div>
            <div>{employee.name}</div>
        </div>
    )
}

export default FilteredText

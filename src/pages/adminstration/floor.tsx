



import { query, collection, where, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/src/app'
import FloorData from './floorData'

function Floor({
    floorData,
    setExpandIndex,
    expand,
    index,
    setIsElmFocused,
    focusElm,
    setfocusElm,
    setFocusedFloor,

}: {
    floorData: any,
    setExpandIndex: any,
    expand: any,
    setIsElmFocused: any
    index: number,
    focusElm: any,
    setFocusedFloor: any,
    setfocusElm: any
}) {

    const { employees: employeesArray, offices: officesArray } = floorData

    let [data, setData] = useState<any>([])


    async function getEmployees(employees: any) {

        let employeesData = await Promise.all(employees.map(async (employee: any) => {
            let q = query(collection(db, "employees"), where("code", "==", employee))

            return (await getDocs(q)).docs.map(doc => doc.data())

        }))

        return employeesData.map(employee => employee[0])
    }


    async function getOffices(offices: any) {
        let officesData = await Promise.all(offices.map(async (office: any) => {
            let q = query(collection(db, "offices"), where("code", "==", office))

            let data = (await getDocs(q)).docs.map(doc => doc.data())

            return data
        }))

        return officesData.map(office => office[0])
    }


    useEffect(() => {
        (async () => {
            let employees = await getEmployees(employeesArray)
            let offices = await getOffices(officesArray)
            setData([...employees, ...offices])
        })()
    }, [])


    return (
        <div className='w-full'>

            <div className='flex  justify-between w-full'>
                <div></div>
                <div onClick={() => {
                    if (expand) {
                        setExpandIndex(-1)
                        setIsElmFocused(false)
                        setfocusElm(null)
                    } else {
                        setFocusedFloor(floorData)
                        setIsElmFocused(false)
                        setExpandIndex(index)
                    }
                }} className='flex gap-2 items-center '>
                    <div className='font-semibold  text-[#000000] Lato cursor-pointer p-1  text-lg'>{floorData.name}</div>
                    <div className={` text-3xl cursor-pointer scale-x-125 ${expand ? "rotate-0" : "rotate-180"} w-[20px]`}>{"^"}</div>
                </div>
            </div>


            {expand && <div>
                {data.length && data.map((item: any, index: number) => {
                    return (
                        <FloorData
                            setIsElmFocused={setIsElmFocused}
                            floorData={item}
                            isFocused={item?.code == focusElm?.code}
                            item={item}
                            setfocusElm={setfocusElm}
                        />
                    )
                })}

            </div>}
        </div>
    )
}

export default Floor

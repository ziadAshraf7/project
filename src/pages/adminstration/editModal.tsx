


import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function EditModal({
    floorName,
    code,
    name,
    setEdit,
    floor,
    updateFloor,
    updateEmployee,
    employees,
    updateOffice,
    addFloor,
    addStatus
}: {
    floorName: any,
    code: any,
    name: any,
    floor: any,
    setEdit: any,
    updateFloor: any,
    updateEmployee: any,
    employees: any,
    updateOffice: any,
    offices: any,
    addFloor: any,
    addStatus: any
}) {

    let [newFloorName, setFloorName] = useState(floorName)
    let [newCode, setCode] = useState(code)
    let [newName, setNewName] = useState(name)
    let targetRef = useRef(null)
    let [newAddedFloorName, setNewAddedFloorName] = useState("")

    const { t } = useTranslation();

    let codeData = {
        prev: code,
        new: newCode
    }


    async function handleUpdateEmployee() {
        try {
            await Promise.all([
                updateFloor({ codeData, type: "employee" }),
                updateEmployee({ newName, codeData, newFloorName })
            ])

            alert("action success")
            window.location.reload()

        } catch {
            alert("the office code or name you want to cahnge to is already exist")
        }
    }

    async function handleUpdateoffices() {
        try {
            await Promise.all([
                updateFloor({ codeData, type: "office" }),
                updateOffice({ newName, codeData, newFloorName })
            ])

            alert("action success")
            window.location.reload()

        } catch {
            alert("the office code or name you want to cahnge to is already exist")
        }
    }


    function checkCode() {
        if (employees.map((item: any) => item?.code).includes(code)) {
            return "employee"
        } else {
            return "office"
        }
    }


    if (addStatus) {
        return (
            <div ref={targetRef} className='absolute p-4 z-10 rounded-lg  h-[196px] flex flex-col items-end left-[50%] w-[294px] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#33363F]'>

                <div onClick={() => setEdit(false)} className='absolute text-white cursor-pointer px-1 top-[3px] left-[3px] rounded-full border-2 border-grey-500'>x</div>

                <div className='mb-4'>
                    <input className='w-[167px]' onChange={(e) => setNewAddedFloorName(e.target.value)} value={newFloorName} type='text' />
                    <span className='text-white p-2'>{t("floor")}</span>
                </div>

                <div onClick={async () => {
                    if (newAddedFloorName.length) {
                        try {
                            await addFloor({ name: newAddedFloorName })
                            alert("action success")
                            window.location.reload()
                        } catch {
                            alert("error")
                        }
                    }
                }} className='absolute bottom-[5px] right-[5px] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                </div>
            </div>
        )
    }


    return (
        <div ref={targetRef} className='absolute p-4 z-10 rounded-lg  h-[196px] flex flex-col items-end left-[50%] w-[294px] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#33363F]'>

            <div onClick={() => setEdit(false)} className='absolute text-white cursor-pointer px-1 top-[3px] left-[3px] rounded-full border-2 border-grey-500'>x</div>

            <div className='mb-4'>
                <input className='w-[167px]' onChange={(e) => setNewName(e.target.value)} value={newName} type='text' />
                <span className='text-white p-2'>{t("name")}</span>
            </div>

            <div className='mb-4'>
                <input className='w-[167px]' onChange={(e) => setFloorName(e.target.value)} value={newFloorName} type='text' />
                <span className='text-white p-2'>{t("floor")}</span>
            </div>

            <div className=''>
                <input className='w-[167px]' onChange={(e) => setCode(e.target.value)} value={newCode} type='text' />
                <span className='text-white p-2'>{t("office number")}</span>
            </div>


            <div onClick={async () => {
                if (checkCode() == "employee") {
                    try {
                        await handleUpdateEmployee()
                        alert("action success")
                        window.location.reload()
                    } catch {
                        alert("err")
                    }
                } else {
                    try {
                        await handleUpdateoffices()
                        alert("action success")
                        window.location.reload()
                    } catch {
                        alert("err")
                    }
                }
                return
            }} className='absolute bottom-[5px] right-[5px] text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

            </div>
        </div >
    )
}

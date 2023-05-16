




import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function EditModal({
    floorName,
    code,
    name,
    setEdit,
    offices,
    employees,
    updateOffice,
    updateEmployee,
    updateFloor,
    deleteOffice,
    deleteEmployee,
    addStatus,
    floorNameStatus,
    add
}: {
    floorName: any,
    code: any,
    name: any,
    setEdit: any,
    offices: any,
    employees: any,
    updateOffice: any,
    updateEmployee: any,
    floorNameStatus: any,
    updateFloor: any,
    deleteOffice: any,
    deleteEmployee: any,
    addStatus: any,
    add: any
}) {

    let [newFloorName, setFloorName] = useState(floorName)
    let [newCode, setCode] = useState(addStatus ? "" : code)
    let [newName, setNewName] = useState(addStatus ? "" : name)
    let [type, setType] = useState("")

    const { t } = useTranslation();


    let codeData = {
        prev: code,
        new: newCode
    }


    console.log(codeData)

    let nameData = {
        prev: floorName,
        new: newFloorName
    }

    async function handleUpdate() {

        if (offices.map((item: any) => item.code).includes(codeData.prev)) {
            try {
                await Promise.all([
                    updateOffice({ codeData, newName, newFloorName }),
                    updateFloor({ codeData, type: "office", nameData: { prev: floorName, new: newFloorName } })
                ])
                alert("action success refresh the page to see the changes")
                window.location.reload()
            } catch {
                alert("error")
            }
        }

        if (employees.map((item: any) => item.code).includes(codeData?.prev)) {
            try {
                await Promise.all([
                    updateFloor({ codeData, type: "employee", nameData: { prev: floorName, new: newFloorName } }),
                    updateEmployee({ codeData, newName, newFloorName })
                ])
                alert("action success refresh the page to see the changes")
            } catch (e) {
                alert(e)
            }
        }

        if (floorNameStatus) {
            try {
                await updateFloor({ nameData, type: "name" })
                alert("action success refresh the page to see the changes")
            } catch {
                alert("error the floor name is already exist")
            }
            return
        }
    }


    async function handleOpen() {
        try {
            await add({ floor: floorName, type: type, code, newCode, name: newName })
            alert("action success")
            window.location.reload()
        } catch {
            alert("err")
        }
    }

    if (addStatus) {
        return (
            <form onSubmit={handleOpen} className='absolute z-10 p-4 rounded-lg  h-[196px] flex flex-col items-end left-[50%] w-[294px] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#33363F]'>

                <div onClick={() => setEdit(false)} className='absolute text-white cursor-pointer px-1 top-[3px] left-[3px] rounded-full border-2 border-grey-500'>x</div>

                <div className='mb-4'>
                    <input className='w-[167px]' onChange={(e) => setNewName(e.target.value)} value={newName} type='text' />
                    <span className='text-white p-2'> {t("name")} </span>
                </div>

                <div className='mb-4'>
                    <input className='w-[167px]' onChange={(e) => setCode(e.target.value)} value={newCode} type='text' />
                    <span className='text-white p-2'> {t("office number")}</span>
                </div>

                <div className='mb-4 gap-2'>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option>{t('employee')}</option>
                        <option>{t('office')}</option>
                    </select>
                    <label className='text-white'>{t('type')}</label>
                </div>

                <button type='submit' className='absolute bottom-[5px] right-[5px] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>

            </form>
        )
    }



    if (floorNameStatus) {
        return (
            <form onSubmit={handleUpdate} className='absolute z-10 p-4 rounded-lg  h-[196px] flex flex-col items-end left-[50%] w-[294px] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#33363F]'>

                <div onClick={() => setEdit(false)} className='absolute text-white cursor-pointer px-1 top-[3px] left-[3px] rounded-full border-2 border-grey-500'>x</div>

                <div className='mb-4'>
                    <input className='w-[167px]' onChange={(e) => setFloorName(e.target.value)} value={floorName} type='text' />
                    <span className='text-white p-2'> {t("floor")}</span>
                </div>

                <button className='absolute bottom-[5px] right-[5px] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                </button>

            </form>
        )
    }

    return (
        <div className='absolute z-10 p-4 rounded-lg  h-[196px] flex flex-col items-end left-[50%] w-[294px] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#33363F]'>

            <div onClick={() => setEdit(false)} className='absolute text-white cursor-pointer px-1 top-[3px] left-[3px] rounded-full border-2 border-grey-500'>x</div>

            <div className='mb-4'>
                <input className='w-[167px]' onChange={(e) => setNewName(e.target.value)} value={newName} type='text' />
                <span className='text-white p-2'>{t("name")}</span>
            </div>

            <div className=''>
                <input className='w-[167px]' onChange={(e) => setCode(e.target.value)} value={newCode} type='text' />
                <span className='text-white text-xs p-2'>{t("office number")}</span>
            </div>


            <div onClick={handleUpdate} className='absolute bottom-[5px] right-[5px] text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
        </div>
    )
}

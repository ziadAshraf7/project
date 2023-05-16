

import { query, collection, where, getDocs } from '@firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { db } from '../../firebase/src/app'
import Floor from './floor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditModal from './editModal'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Adminstration({
    getFloors,
    updateFloor,
    updateEmployee,
    add,
    user,
    getEmployees,
    getOffices,
    updateOffice,
    addFloor,
    deleteFloor
}: {
    getFloors: any,
    updateFloor: any,
    updateEmployee: any,
    add: any,
    user: any,
    getEmployees: any,
    getOffices: any,
    updateOffice: any,
    addFloor: any,
    deleteFloor: any
}) {
    const { t } = useTranslation();

    let [floors, setFloors] = useState([])
    let [expandIndex, setExpandIndex] = useState(-1)
    let [edit, setEdit] = useState(false)
    let [isElmFocused, setIsElmFocused] = useState(false)
    let [focusElm, setfocusElm] = useState<any>({})
    let [focusedFloor, setFocusedFloor] = useState<any>()
    let [employees, setEmployees] = useState([])
    let [offices, setOffices] = useState([])
    let [addStatus, setAddStatus] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let data = await getOffices()
            setOffices(data)
        })()
    }, [])


    useEffect(() => {
        (async () => {
            let data = await getEmployees()
            setEmployees(data)
        })()
    }, [])


    useEffect(() => {
        (async () => {
            let data = await getFloors()
            setFloors(data)
        })()
    }, [])


    function handleExpand() {
        if (expandIndex > -1) {
            navigate(`../edit/${focusedFloor.name}`)
        }
    }



    useLayoutEffect(() => {
        if (!user) {
            navigate("../login")
        }
    }, [user])

    if (!user) {
        return <></>
    }

    return (
        <div className='relative w-[100vw] h-[100vh] bg-[#0A969F]'>
            <div className='absolute top-[5px] right-[5px]'>
                <img className='w-[100px] h-[100px] ' src={require("../../assets/88ee2e29-d2c1-4875-a13c-6758adc4a24e.jpg")} />
            </div>

            <div className='absolute bg-[#D9D9D9] w-[297px] h-[409px] rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                <div className='flex justify-between py-1 px-2'>
                    <div onClick={() => {
                        setfocusElm(null)
                        setAddStatus(true)
                        setEdit(true)
                    }} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div className='cursor-pointer' onClick={() => {
                        if (isElmFocused) {
                            setEdit(true)
                            setAddStatus(false)
                        }
                        else {
                            setEdit(false)
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <div onClick={async () => {
                        if (focusElm.code) {
                            if (employees.map((item: any) => item.code).includes(focusElm.code)) {
                                try {
                                    await deleteFloor({ type: "employee", code: focusElm.code })
                                    alert("action success")
                                    window.location.reload()
                                } catch {
                                    alert("err")
                                }
                            } else {
                                try {
                                    await deleteFloor({ type: "office", code: focusElm.code })
                                    alert("action success")
                                    window.location.reload()
                                } catch {
                                    alert("err")
                                }
                            }
                        } else {
                            alert("you should select a field first to delete (employee or office)")
                        }
                    }} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>


                {edit && <EditModal
                    setEdit={setEdit}
                    addFloor={addFloor}
                    addStatus={addStatus}
                    employees={employees}
                    offices={offices}
                    floor={focusedFloor?.name}
                    updateEmployee={updateEmployee}
                    updateFloor={updateFloor}
                    name={focusElm?.name}
                    updateOffice={updateOffice}
                    code={focusElm?.code}
                    floorName={focusElm?.floor}
                />}

                <div className='max-h-[380px] overflow-x-hidden overflow-y-scroll'>
                    {floors.length && floors.map((floor, index) => {
                        return (
                            <Floor
                                focusElm={focusElm}
                                setfocusElm={setfocusElm}
                                setIsElmFocused={setIsElmFocused}
                                index={index}
                                setFocusedFloor={setFocusedFloor}
                                floorData={floor}
                                setExpandIndex={setExpandIndex}
                                expand={expandIndex == index}
                            />
                        )
                    })}
                </div>
            </div>

            <div className='absolute  bottom-[30px] left-[30px] flex justify-between'>
                <button onClick={() => handleExpand()} className='bg-[#33363F] rounded-3xl w-[105px] text-center p-2 text-white text-lg'>{t('expand')}</button>
            </div>

            <div className='absolute  bottom-[30px]  right-[30px]'>
                <svg onClick={() => navigate("../")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
        </div>
    )
}

export default Adminstration

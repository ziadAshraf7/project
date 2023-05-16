import { query, collection, where, getDocs } from '@firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase/src/app'
import EditModal from './editModal'

function Edit({
    getFloor,
    updateOffice,
    updateEmployee,
    updateFloor,
    deleteOffice,
    deleteEmployee,
    deleteFloor,
    add,
    user,
    getFloors
}: {
    getFloor: any,
    updateOffice: any,
    updateEmployee: any,
    updateFloor: any,
    deleteOffice: any,
    deleteEmployee: any,
    deleteFloor: any,
    user: any,
    getFloors: any,
    add: any
}) {

    let { code } = useParams()


    let [data, setData] = useState<any>([])
    let [sec1, setSec1] = useState([])
    let [sec2, setSec2] = useState([])
    let [sec3, setSec3] = useState([])
    let [focusElm, setFocusElm] = useState<any>({})
    let [edit, setEdit] = useState(false)
    let [employees, setEmployees] = useState([])
    let [offices, setOffices] = useState([])
    let [addStatus, setAddStatus] = useState(false)
    let navigate = useNavigate()
    let [floorNameStatus, setFloorNameStatus] = useState(false)
    let [floors, setFloors] = useState([])
    let [selectedFloor, setSelectedFloor] = useState(code)

    useEffect(() => {
        (async () => {
            let data = await getFloors()

            setFloors(data)
        })()
    }, [])

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
            let { employees: employeesArray, offices: officesArray } = await getFloor(code)
            let employees = await getEmployees(employeesArray)
            let offices = await getOffices(officesArray)
            setData([...employees, ...offices])

            let data: any = [...employees, ...offices]

            setEmployees(employees as any)
            setOffices(offices as any)


            if (data.length > 12) {
                setSec1(data.slice(0, 6))
                setSec3(data.slice(6, 12))
                setSec2(data.slice(12, data.length))
            }
            if (data.length > 10 && data.length < 12) {
                setSec1(data.slice(0, 5))
                setSec3(data.slice(5, 10))
                setSec2(data.slice(10, data.length))
            }

            if (data.length < 10) {
                let length = data.length
                setSec1(data.slice(0, length / 2))
                setSec3(data.slice(length / 2, data.length))
            }

        })()
    }, [selectedFloor])


    useEffect(() => {
        navigate(`../edit/${selectedFloor}`)
    }, [selectedFloor])

    async function handleDelete() {

        if (!focusElm?.code) {
            return
        }

        if (offices.map((item: any) => item.code).includes(focusElm.code)) {
            try {
                await Promise.all([
                    deleteFloor({ type: "office", name: code }),
                    deleteOffice(focusElm.code)
                ])

            } catch {
                alert("err")
            }
            return
        }

        if (employees.map((item: any) => item.code).includes(focusElm.code)) {
            try {
                await Promise.all([
                    deleteFloor({ type: "employee", name: code }),
                    deleteEmployee(focusElm.code)
                ])
            } catch {
                alert("err")
            }
        }
    }


    useLayoutEffect(() => {
        if (!user) {
            navigate("../login")
        }
    }, [user])

    if (!code || !user) {
        return <></>
    }


    if (!data?.length) {
        return <div className='top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute text-semibold text-2xl'>Loading ...</div>
    }

    return (
        <div className='relative  h-[100vh] bg-[#0A969F]'>
            <div className='absolute top-[5px] right-[5px]'>
                <img className='w-[100px] h-[100px] ' src={require("../../assets/88ee2e29-d2c1-4875-a13c-6758adc4a24e.jpg")} />
            </div>


            <div className='absolute top-[40px] left-[20px]'>
                <select className='bg-[#D9D9D9] border-none rounded-xl p-1 text-right w-[341px]' value={code} onChange={(e) => setSelectedFloor(e.target.value)}>
                    {floors.length && floors.map((floor: any) => {
                        return (
                            <option value={floor.name}>
                                {floor.name}
                            </option>
                        )
                    })}
                </select>
            </div>

            {edit && <EditModal
                add={add}
                addStatus={addStatus}
                deleteOffice={deleteOffice}
                deleteEmployee={deleteEmployee}
                floorNameStatus={floorNameStatus}
                updateOffice={updateOffice}
                updateEmployee={updateEmployee}
                updateFloor={updateFloor}
                offices={offices}
                employees={employees}
                floorName={focusElm?.floor}
                code={focusElm?.code}
                name={focusElm?.code ? focusElm?.name : ""}
                setEdit={setEdit}
            />
            }

            <div className='w-full  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute'>

                <div className='w-[400px] p-3 mx-auto flex justify-between'>
                    <div className='cursor-pointer' onClick={() => {
                        setAddStatus(true)
                        setEdit(true)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </div>
                    <div className='cursor-pointer' onClick={() => {
                        if (Object.keys(focusElm).length > 0) {
                            setEdit(true)
                            setAddStatus(false)
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                    </div>
                    <div className='cursor-pointer' onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                    </div>
                </div>


                <div className='w-fit overflow-x-scroll  sm:w-full rounded-2xl overflow-y-scroll bg-[#D9D9D9] h-fit max-h-[350px] flex flex-col items-center p-5  justify-between ' >
                    <div className='w-full flex justify-between'>
                        {sec1?.map((item: any) => {
                            return (
                                <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} onClick={() => {
                                    setFocusElm(item)
                                    setFloorNameStatus(false)
                                }} className={`w-fit mr-4 ${focusElm.name == item.name ? "bg-red-800 font-bold" : ""} text-center p-4 bg-white`}>
                                    <div className='mb-3'>{item.name}</div>
                                    <div>{item.code}</div>
                                </div>
                            )
                        })}
                    </div>


                    <div className='w-full flex justify-between'>
                        <div className='flex flex-col items-center'>
                            {sec2.length > 0 && sec2.slice(0, sec2.length / 2).map((item: any) => {
                                return (
                                    <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} onClick={() => {
                                        setFocusElm(item)
                                        setFloorNameStatus(false)
                                    }} className={`w-fit ${focusElm.name == item.name ? "bg-red-800 font-bold" : ""}  text-center p-4 my-4 bg-white`}>

                                        <div className='mb-3'>{item.name}</div>
                                        <div>{item.code}</div>

                                    </div>
                                )
                            })}
                        </div>

                        <div className=' flex justify-center items-center'>
                            <div style={{ backgroundColor: floorNameStatus ? "#FF3333" : "white" }} onClick={() => {
                                setFocusElm({ floor: code })
                                setFloorNameStatus(true)
                            }} className={`w-fit ${focusElm.name == code ? "bg-red-800 text-white" : ""}  text-center p-4 bg-white h-[165px] flex items-center bg-white px-5 border-2 border-black rounded-2xl`}>{code}</div>
                        </div>

                        <div className='flex flex-col items-center'>
                            {sec2.length > 0 && sec2.slice(sec2.length / 2, sec2.length).map((item: any) => {
                                return (
                                    <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} onClick={() => {
                                        setFocusElm(item)
                                        setFloorNameStatus(false)
                                    }} className={`w-fit  text-xs md:text-sm ${focusElm.name == item.name ? "bg-red-800 font-bold" : ""}  text-center p-4 my-4 bg-white`}>
                                        <div className='mb-3'>{item.name}</div>
                                        <div>{item.code}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='w-full flex justify-between'>
                        {sec3?.map((item: any) => {
                            return (
                                <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} onClick={() => {
                                    setFocusElm(item)
                                    setFloorNameStatus(false)
                                }} className={`w-fit mr-4 text-xs md:text-sm ${focusElm.name == item.name ? "bg-red-800 font-bold" : ""}  text-center p-4 bg-white`}>
                                    <div className='mb-3'>{item.name}</div>
                                    <div>{item.code}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div onClick={() => navigate("../")} className='absolute cursor-pointer bottom-[30px] right-[30px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

            </div>
        </div>
    )
}

export default Edit

import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase/src/app'
import { useTranslation } from 'react-i18next'

function Result({
    getFloorByEmployee,
    getEmployee,
    getOffices: getOff,
    getEmployees: getEmp,
    getOffice,
    getFloorByOffice,
    getFloorName
}: {
    getFloorByEmployee: any,
    getEmployee: any,
    getOffices: any,
    getEmployees: any,
    getFloorByOffice: any,
    getOffice: any,
    getFloorName: any
}) {

    let { code } = useParams()
    let [floorName, setFloorName] = useState("")
    let [displayedData, setDisplayedData] = useState([])
    let [sec1, setSec1] = useState([])
    let [sec2, setSec2] = useState([])
    let [sec3, setSec3] = useState([])
    let [focusElm, setFocusElm] = useState<any>({})
    let navigate = useNavigate()
    const { t } = useTranslation();


    useEffect(() => {
        (async () => {
            let employees = (await getEmp()).map((item: any) => item.code)
            let offices = (await getOff()).map((item: any) => item.code)
            if (employees.includes(code)) {
                let data = await getEmployee(code)
                setFocusElm(data)
            }
            if (offices.includes(code)) {
                // let floor = await getFloorName(code)
                // setFloorName(floor)
                let data = await getOffice(code)
                setFocusElm(data)
            }
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
            let data: any

            let employees = (await getEmp()).map((item: any) => item.code)
            let offices = (await getOff()).map((item: any) => item.code)


            if (employees.includes(code)) {
                data = await getFloorByEmployee(code)
            }

            if (offices.includes(code)) {
                data = await getFloorByOffice(code)
            }

            data.docs.forEach(async (element: any) => {
                let { employees, offices, name } = element.data()
                await Promise.all([
                    getEmployees(employees),
                    getOffices(offices)
                ]).then(([employees, offices]) => {
                    setDisplayedData([...employees, ...offices])
                    let data: any = [...employees, ...offices]
                    console.log(data, "data")
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
                })
                setFloorName(name)
            });
        })()
    }, [])



    if (!displayedData.length) {
        return <></>
    }

    return (
        <div className='relative h-[100vh] bg-[#0A969F]'>
            <div className='absolute top-[5px] right-[5px]'>
                <img className='w-[100px] h-[100px] ' src={require("../../assets/88ee2e29-d2c1-4875-a13c-6758adc4a24e.jpg")} />
            </div>

            <div className='absolute top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                <div className='w-[300px] text-sm sm:w-[400px] mx-auto sm:text-xl font-semibold mb-4'>
                    <div className='flex w-full justify-between'>
                        <div>{focusElm?.floor ? focusElm.floor : floorName}</div>
                        <div>{focusElm?.name}</div>
                    </div>

                    <div className='flex justify-between w-full'>
                        <div></div>
                        <div>رقم المكتب :{focusElm?.code}</div>
                    </div>
                </div>


                <div className=' w-fit text-xs sm:text-md max-w-fit overflow-x-scroll sm:w-full sm:max-w-full sm:w-[1000px] rounded-2xl overflow-y-scroll bg-[#D9D9D9] h-fit max-h-[350px] flex flex-col items-center p-5  justify-between ' >
                    <div className='w-full flex justify-between'>
                        {sec1?.map((item: any) => {
                            return (
                                <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} className={`w-fit mr-4 ${focusElm?.name == item?.name ? "font-bold bg-[#FF3333] " : ""} text-center p-4 bg-white`}>
                                    <div className='mb-3'>{item?.name}</div>
                                    <div>{item?.code}</div>
                                </div>
                            )
                        })}
                    </div>


                    <div className='w-full flex justify-between'>
                        <div className='flex flex-col items-center'>
                            {sec2.length > 0 && sec2.slice(0, sec2.length / 2).map((item: any) => {
                                return (
                                    <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} className={`w-fit ${focusElm?.name == item?.name ? " text-black-100 bg-[#FF3333] " : ""}  text-center p-4 my-4 bg-white`}>
                                        <div className='mb-3'>{item?.name}</div>
                                        <div>{item?.code}</div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='py-4 flex justify-center items-center'>
                            <div className={`w-fit mr-2 ${focusElm?.name == code ? "text-black bg-[#FF3333] " : ""}  text-center p-4 bg-white h-[100px] flex flex-col justify-center bg-white px-5 border-2 border-black rounded-3xl`}>
                                <div className='mb-2'>{focusElm.floor ? focusElm?.floor : floorName}</div>
                                <div>{code}</div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            {sec2.length > 0 && sec2.slice(sec2.length / 2, sec2.length).map((item: any) => {
                                return (
                                    <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} className={`w-fit mr-2${focusElm?.name == item?.name ? "text-black bg-[#FF3333] " : ""}  text-center p-4 my-4 bg-white`}>
                                        <div className='mb-3'>{item?.name}</div>
                                        <div>{item?.code}</div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                    <div className='w-full flex justify-between'>
                        {sec3?.map((item: any) => {
                            return (
                                <div style={{ backgroundColor: focusElm?.name == item?.name ? "#FF3333" : "white" }} className={`w-fit mr-2 ${focusElm?.name == item?.name ? "text-black font-semibold bg-[#FF3333]" : ""}  text-center p-4 bg-white`}>
                                    <div className='mb-3'>{item?.name}</div>
                                    <div>{item?.code}</div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

            <div className='absolute  bottom-[30px] left-[30px] flex justify-between'>
                <Link to={"../login"} className='bg-[#33363F] text-xs sm:text-sm rounded-3xl w-[105px] text-center p-2 text-white text-lg'>{t('Login')}</Link>
            </div>

            <div className='absolute  bottom-[30px]  right-[30px]'>
                <svg onClick={() => navigate("../")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>

        </div>
    )
}

export default Result

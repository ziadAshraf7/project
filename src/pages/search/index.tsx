

import React, { useEffect, useState } from 'react'
import SearchFilter from './searchFilter'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Search({
    getOffices,
    getEmployees,
}: {
    getOffices: any,
    getEmployees: any,
}) {
    const { t, i18n } = useTranslation();

    let [offices, setOffices] = useState([])
    let [employees, setEmployees] = useState([])
    let [searchQuery, setSearchQuery] = useState("")
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let data = await getOffices()
            setOffices(data)
        })()
    }, [])

    function navigateToResultPage(code: any) {
        navigate(`../result/${code}`)
    }


    useEffect(() => {
        (async () => {
            let data = await getEmployees()
            setEmployees(data)
        })()
    }, [])


    return (
        <div className='p-0 m-0 relative w-[100vw] h-[100vh] bg-[#0A969F]'>
            <div className='absolute right-[5px] top-[5px]'>
                <img className='w-[100px] h-[100px]' src={require("../../assets/88ee2e29-d2c1-4875-a13c-6758adc4a24e.jpg")} />
            </div>

            <div className='flex overflow-hidden flex-col align-items-center absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <input onBlur={() => {
                    setTimeout(() => {
                        setShow(false)
                    }, 200);

                }} onFocus={() => setShow(true)} onChange={(e) => setSearchQuery(e.target.value)} className='p-2 mb-2 rounded-3xl' type='text' />

                {show && <SearchFilter
                    setShow={setShow}
                    searchQuery={searchQuery}
                    employees={employees}
                    setSearchQuery={setSearchQuery}
                />}

                <div className='  w-[301px] h-[362px] bg-[#EAEAEA] rounded-3xl p-3 '>
                    <div className='text-lg font-semibold p-1 border-b-2 border-[#000000]'>{t('Common offices')}</div>

                    <div className='overflow-y-scroll h-[301px]'>
                        {!offices.length && <div>Loading ...</div>}
                        {offices.length && offices.map((office: any) => {
                            return (
                                <div onClick={() => navigateToResultPage(office.code)} className='cursor-pointer p-1 border-b-2 border-gray-400 opacity-0.5'>
                                    {office.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>



            <div className='absolute  bottom-[30px] left-[30px] flex justify-between'>
                <Link to={"../login"} className='bg-[#33363F] rounded-3xl w-[105px] text-center p-2 text-white text-xs sm:text-lg'>{t('Login')}</Link>
            </div>

            <div className='absolute  bottom-[30px]  right-[30px]'>
                <svg onClick={() => navigate("../")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
        </div>
    )
}

export default Search

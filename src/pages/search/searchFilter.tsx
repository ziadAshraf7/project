


import React, { useEffect, useRef } from 'react'
import FilteredText from './ffilteredText'
import { useTranslation } from 'react-i18next';

function SearchFilter({
    employees,
    searchQuery,
    setSearchQuery,
    setShow
}: {
    employees: any,
    searchQuery: any,
    setSearchQuery: any,
    setShow: any
}) {
    let targetRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation();

    const filtered = searchQuery ? employees.filter((employee: any) => employee.name.includes(searchQuery)) : []




    return (
        <div ref={targetRef} className='absolute h-[200px]  max-h-[50%] overflow-y-scroll w-full rounded-2xl bg-white'>
            <div className='flex items-center p-1'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input className='w-full border-0 p-1 border-none focus:border-none' type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className='w-full h-[1px] bg-[#33363F]'></div>

            {filtered.map((employee: any) => {
                return (
                    <FilteredText
                        employee={employee}
                        filtered={filtered} />
                )
            })}

            {filtered.length == 0 && <div className='text-[#ACACAC] p-1'>{t('No matches result')}</div>}
        </div>
    )
}

export default SearchFilter

import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'

export default function Home() {
    let navigate = useNavigate()

    const { t, i18n } = useTranslation();

    function handleLang(lang: any) {
        localStorage.setItem("lang", lang)
    }


    return (
        <div>
            <div className='absolute w-[100vw] h-[100vh]'>
                <img className='bg-cover w-full h-full' src={require("../../assets/f5d618ff-e08e-420d-9c3e-8bdcf144ffef.jpg")} />
            </div>

            <div style={{ opacity: 0.8 }} className='absolute w-[100vw] h-[100vh] bg-[#000000]'>

            </div>


            <div className='absolute rounded-2xl text-center flex w-[299px] h-[199px] flex-col items-center p-3 bg-[#EAEAEA] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='text-[#0A969F] pb-2 text-lg font-bold text-[25px]'>Welcome to SGSC!</div>

                <div className='text-[#0A969F] text-[18px] font-bold'>Plesase choose language</div>

                <div className='text-[#0A969F] text-[16px] font-bold'>فضلاً اختر اللغه</div>

                <div className='flex py-4 gap-2'>
                    <button onClick={() => {
                        //  handleLang("en")
                        i18n.changeLanguage("en")
                        handleLang("en")
                        navigate("../search")
                    }} className='bg-[#0A969F] w-[115px] rounded-2xl p-2 text-center'>English</button>
                    <button onClick={() => {
                        //  handleLang("ar")
                        i18n.changeLanguage("ar")
                        handleLang("ar")
                        navigate("../search")
                    }} className='bg-[#0A969F] w-[115px] rounded-2xl p-2 text-center'>العربية</button>
                </div>
            </div>

        </div>
    )
}

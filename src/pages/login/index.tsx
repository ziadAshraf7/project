

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'

function Login({
    login,
    user
}: {
    login: any,
    user: any
}) {
    const { t } = useTranslation();
    let [email, setEmail] = useState("")
    let [Password, setPassword] = useState("")
    let [error, setError] = useState(false)
    let [emailErr, setEmailErr] = useState(false)
    let [passErr, setPassErr] = useState("")
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()


    async function handleLogin(e: any) {
        e.preventDefault()
        if (email.includes("!") || email.includes("$") || email.includes("%") || email.includes("&")) {
            setEmailErr(true)
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        try {
            await login(email, Password)
            navigate("../adminstration")
        } catch (err: any) {
            setIsLoading(false)
            console.log(err)
            setError(true)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("../adminstration")
        }
    }, [user])



    if (user) {
        return <></>
    }
    return (
        <div className='relative w-[100vw] h-[100vh] bg-[#0A969F]'>
            <div className='absolute top-[5px] right-[5px]'>
                <img className='w-[100px] h-[100px] ' src={require("../../assets/88ee2e29-d2c1-4875-a13c-6758adc4a24e.jpg")} />
            </div>

            <form onSubmit={handleLogin} className='absolute flex flex-col items-center pt-10 px-5 rounded-xl w-[352.92px] h-[350.08px] bg-[#EAEAEA] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                <div className='absolute flex justify-center items-center z-10 top-[-15px] bg-white left-[-15px] rounded-full w-[45px] h-[45px]'>
                    <div className='absolute bg-[#33363F] rounded-full w-[35px] h-[35px]'></div>
                </div>
                <div className='text-[#0A969F] mb-[10px] text-[20px] font-bold font-alto'>{t('SGSC LOGIN')}</div>

                {!error && <div className='h-[46px]'></div>}
                {error && <div className='mb-[5px] h-[46px] flex justify-center items-center w-[220px] p-2 bg-[#FFDCE0]'>
                    <div className='text-[#8B1A13] text-sm '>{t("Incorrect username or password.")}</div>
                </div>}

                <div className='w-[255.33px] flex flex-col items-center'>
                    {!emailErr && <input onChange={(e) => setEmail(e.target.value)} required placeholder={t('Username')} className='w-full mb-3 p-2 h-[40.29px] rounded-2xl' type='text' />}
                    {emailErr && <input onChange={(e) => setEmail(e.target.value)} required placeholder={t('Username')} className='w-full  p-2 h-[40.29px] rounded-2xl border-2 bg-[#FFDCE0] border-[#FF0000]' type='text' />}
                    {emailErr && <div className='text-sm mb-3 text-[#FF0000]'>{t('you can’t use symbols eg. !$%& etc.')}</div>}

                    {!passErr && <input onChange={(e) => setPassword(e.target.value)} required placeholder={t('Password')} className='w-full rounded-2xl p-2 h-[40.29px]' type='password' />}
                    {passErr && <input onChange={(e) => setPassword(e.target.value)} required placeholder={t('Password')} className='w-full rounded-2xl p-2 h-[40.29px] border-2 bg-[#FFDCE0] border-[#FF0000]' type='password' />}
                    {passErr && <div className='text-sm text-[#FF0000]'></div>}

                    <div className='mt-3 flex w-full justify-between'>
                        <div className='flex text-xs gap-1'>
                            <input type='checkbox' />
                            <div>{t('remember me')}</div>
                        </div>
                        <div className='text-xs text-[#0A969F]'>{t('forget passwored')}</div>
                    </div>
                    <button type='submit' className='mt-5 text-[#FFFFFF] bg-[#33363F] rounded-xl h-[34.04px] text-center w-full'>{isLoading ? t("Loading") : t("Login")}</button>

                </div>

            </form>
            <div onClick={() => navigate("../")} className='absolute cursor-pointer bottom-[20px] right-[30px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
        </div>
    )
}

export default Login

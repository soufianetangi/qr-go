"use client"
import Login from "@/components/Login";
import SideView from "@/components/SideView";
import SignUp from "@/components/SignUp";
import { useState } from "react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center py-8 md:py-0">
            {isLogin ?
                <div className="grid gap-2 md:hidden mb-5 px-[5%]">
                    <h1 className="text-[28px] md:text-[36px] lg:text-[40px] text-dark text-center font-semibold">Welcome back to <br /> <span className="text-blue">QR-Go</span></h1>
                    <p className="text-[14px] md:text-[16px] text-dark text-center">Login with your details you entered during registration.</p>
                </div>
                :
                <div className="grid gap-2 md:hidden mb-5 px-[5%]">
                    <h1 className="text-[28px] md:text-[36px] lg:text-[40px] text-dark text-center font-semibold">Generate a <span className="text-blue">QR code</span></h1>
                    <p className="text-[14px] md:text-[16px] text-dark text-center">Get started and generate a Qr code on the go</p>
                </div>
            }

            <SideView />

            <section className="grid gap-4 pt-5 pb-5 md:py-10">
                <div className="flex items-center justify-center gap-10 text-[20px] md:text-[24px] xl:text-[26px] font-semibold bg-liteskyblue rounded-lg md:rounded-none mx-[5%] md:mx-0">
                    <h1
                        className={isLogin ? "p-2 border-b-4 border-b-blue transition-all delay-150 cursor-pointer" : "p-2 hover:bg-blue hover:text-white transition-all delay-150 cursor-pointer"}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </h1>

                    <h1
                        className={!isLogin ? "p-2 border-b-4 border-b-blue transition-all delay-150 cursor-pointer" : "p-2 hover:bg-blue hover:text-white transition-all delay-150 cursor-pointer"}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign up
                    </h1>
                </div>

                {isLogin ?
                    <Login onSwitch={() => setIsLogin(false)} />
                    :
                    <SignUp onSwitch={() => setIsLogin(true)} setIsLogin={setIsLogin}/>
                }
            </section>
        </main>
    );
}

export default Auth;
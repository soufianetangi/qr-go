"use client"
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbLoader3 } from "react-icons/tb";

const GetStartedBtn = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    
    const [user] = useAuthState(auth)

    let userLoggedIn: string | null;

    if (typeof window !== 'undefined') {
        userLoggedIn = localStorage.getItem('user');
    }

    const handleGetStarted = () => {
        setIsLoading(true);

        if (user && userLoggedIn === 'loggedIn') {
            setTimeout(() => {
                setIsLoading(false);
                router.replace("/create");
            }, 1000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                router.replace("/auth");
            }, 1000);
        }
    };
    
    return ( 
        <main>
            <button 
            className="w-[120px] flex items-center justify-center text[14px] md:text-[16px] py-[10px] bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150"
            onClick={handleGetStarted}
            >
                {isLoading ? (
                    <>
                        <TbLoader3 className="animate-spin text-white text-2xl text-center font-semibold cursor-not-allowed" />
                    </>
                ) : (
                    "Get Started"
                )}
                </button>
        </main>
     );
}
 
export default GetStartedBtn;
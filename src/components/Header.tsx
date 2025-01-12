"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GetStartedBtn from "./GetStartedBtn";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { UserContext } from "./context/UserContext";
import React, { useContext } from 'react';

const Header = () => {
    // Manage visibility of nav menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    
    const { user } = useContext(UserContext);

    const [authUser] = useAuthState(auth)

    const pathName = usePathname()

    let userLoggedIn;

    if (typeof window !== 'undefined') {
        userLoggedIn = localStorage.getItem('user');
    }

    //Control nav hide and show
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Signout logics
    const router = useRouter()

    const handleSignOut = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            signOut(auth)
            localStorage.removeItem('user')
            router.replace("/home");
        }, 2000);
    }

    return (
        <main className="w-full fixed top-0 bg-white z-30">
            <header className="flex items-center justify-between bg-skyblue px-[5%] py-2">
                <Link href="/" className="w-[60px]">
                    <Image src="/img/logo.png" width={70} height={70} alt="logo" className="w-full" />
                </Link>

                <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-[82px] md:top-auto left-0 md:left-auto md:relative w-full md:w-[70%] xl:w-[60%] md:flex flex-col md:flex-row items-start md:items-center justify-between bg-skyblue md:bg-none py-10 md:p-0`}>
                    <div className="text-dark text-[16px] font-semibold  flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10 md:mb-0 px-[5%]">
                        <Link href="/home" className={pathName === "/home" ? " visited:text-darkblue transition-colors delay-200" : "hover:text-gray-600 transition-colors delay-200"}>Home</Link>
                        <Link href="/about" className={pathName === "/about" ? " visited:text-darkblue transition-colors delay-200" : "hover:text-gray-600 transition-colors delay-200"}>About</Link>
                        <Link href="contact" className={pathName === "/contact" ? " visited:text-darkblue transition-colors delay-200" : "hover:text-gray-600 transition-colors delay-200"}>Contact</Link>
                        {authUser && userLoggedIn != undefined && 
                            <div className="flex md:hidden flex-col gap-10">
                                <Link href="contact" className={pathName === "/create" ? " visited:text-darkblue transition-colors delay-200" : "hover:text-gray-600 transition-colors delay-200"}>Create</Link>
                                <Link href="contact" className={pathName === "/profile" ? " visited:text-darkblue transition-colors delay-200" : "hover:text-gray-600 transition-colors delay-200"}>Profile</Link>
                                <p onClick={handleSignOut} className="hover:text-gray-600 transition-colors delay-200 cursor-pointer">
                                    {isLoading ? (
                                        'Signing Out...'
                                    ) : (
                                        'Sign Out'
                                    )}
                                </p>
                            </div>
                        }
                    </div>
                    {authUser && userLoggedIn != undefined ?
                        <div className="hidden md:block">
                            <UserInfo user={ user }/>
                        </div>
                        :
                        <div className="pl-[5%]">
                            <GetStartedBtn />
                        </div>
                    }

                </nav>

                {isMenuOpen ?
                    <IoClose className="text-4xl text-darkblue block md:hidden cursor-pointer" onClick={toggleMenu} />
                    :
                    <FaBars className="text-3xl text-darkblue block md:hidden cursor-pointer" onClick={toggleMenu} />
                }
            </header>

            <hr className="h-3 bg-darkblue mt-1" />
        </main>
    );
}

export default Header;

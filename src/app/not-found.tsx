import Image from "next/image";
import Link from "next/link";
const Error404 = () => {
    return (
        <main className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen gap-1 md:gap-10 px-[5%] py-5 sm:py-10">
            <section className="w-full flex items-center justify-center">
                <Image src="/img/error404.png" width={300} height={300} alt="error-img" className="w-[80%] dangling-picture" />
            </section>
            <section className="flex flex-col items-center justify-center gap-4 text-[14px] md:text-[16px] text-center text-dark font-normal">
                <h1 className="text-5xl lg:text-6xl text-darkblue font-extrabold">PAGE NOT FOUND</h1>
                <p className="w-[70%]">We Couldn&apos;t Find The Page You Were Looking For...</p>

                <div>
                    <Link href={"/home"} className={`bg-darkblue hover:bg-blue hover:shadow-2xl transition-all delay-150 w-[200px] px-5 py-3 rounded-md text-white flex items-center justify-center cursor-pointer`}
                    >Back To Home</Link>
                </div>
            </section>
        </main>
    );
}

export default Error404;
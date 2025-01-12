import Image from "next/image";
import Link from "next/link";
import GetStartedBtn from "./GetStartedBtn";
import { motion } from "framer-motion";

const HomeHero = () => {
    return (
        <main className="w-full min-h-screen grid items-center justify-center px-[5%] relative top-[70px] md:top-[50px] py-5">
            <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center">
                <motion.section
                    className="grid gap-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <h1 className="w-full lg:w-[80%] text-3xl md:text-4xl lg:text-5xl text-dark font-semibold text-center md:text-left tracking-wide leading-10"><span className="text-blue mt-20">QR Code</span> Generator That Makes All The <span className="text-blue"> Difference.</span></h1>

                    <p className="w-full lg:w-[60%] text-[15px] md:text-[18px] text-dark font-medium text-center md:text-left">Monitor, share, download
                        and generate your Qr Codes all in
                        one place.</p>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <GetStartedBtn />
                        <Link href="#guildlines" className="text-[14px] md:text-[16px] px-2.5 md:px-4 py-2 bg-white text-blue border-2 border-blue font-semibold rounded-md hover:shadow-lg transition-all delay-150">Explore More</Link>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/img/homehero.png" width={600} height={600} alt="hero-img" loading="lazy" />
                </motion.section>
            </section>
        </main>
    );
}

export default HomeHero;
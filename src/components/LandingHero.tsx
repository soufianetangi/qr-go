import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import GetStartedBtn from "./GetStartedBtn";
import { motion } from "framer-motion";

const LandingHero = () => {
    return (
        <main className="w-full min-h-screen relative top-[80px] grid place-items-center">
            <main className="w-full px-[5%] py-7">
                <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center">
                    <motion.div
                        className="grid gap-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="w-full lg:w-[90%] text-3xl md:text-4xl lg:text-5xl lg:text-[40px] xl:text-[42px] text-dark font-bold text-center md:text-left leading-10 tracking-wide"><span className="text-blue">Create A QR Code</span> To Both Safeguard Your Data
                            And <span className="text-blue">Advertise</span> Your <span>Business</span> Or
                            <span className="text-blue"> Idea.</span></h1>

                        <p className="w-full lg:w-[80%] text-[14px] md:text-[16px] lg:text-[18px] text-dark font-medium text-center md:text-left">Our platform allows you to effortlessly generate QR codes,
                            keep track of them, and analyze their performance
                            through detailed statistics.</p>

                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <GetStartedBtn />
                            <Link href="/home" className="text-[14px] md:text-[16px] px-3 md:px-5 py-2 bg-white text-blue border-2 border-blue font-semibold rounded-md hover:shadow-lg transition-all delay-150">Learn More</Link>
                        </div>
                    </motion.div>

                    <motion.section
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <Image src="/img/landing-img.png" width={580} height={580} alt="hero-img" loading="lazy" />
                    </motion.section>
                </section>

                <motion.section
                    className="flex items-center gap-6 mt-6"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4">
                        <FaXTwitter className="text-dark text-3xl p-1.5 rounded-full bg-skyblue hover:bg-darkblue hover:text-white transition-all delay-200 cursor-pointer" />
                        <FaFacebookF className="text-dark text-3xl p-1.5 rounded-full bg-skyblue hover:bg-darkblue hover:text-white transition-all delay-200 cursor-pointer" />
                        <FaYoutube className="text-dark text-3xl p-1.5 rounded-full bg-skyblue hover:bg-darkblue hover:text-white transition-all delay-200 cursor-pointer" />
                    </div>

                    <hr className="bg-darkblue h-1 w-full" />
                </motion.section>
            </main>
        </main>
    );
}

export default LandingHero;
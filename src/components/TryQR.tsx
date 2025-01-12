import Image from "next/image";
import GetStartedBtn from "./GetStartedBtn";
import { motion } from "framer-motion";

const TryQR = () => {
    return (
        <main className="w-full px-[5%] relative top-[100px] py-20">
            <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center">
                <motion.section
                    className="grid gap-6 items-center justify-center place-items-center md:place-items-start md:justify-start"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <h1 className="w-full lg:w-[80%] text-3xl md:text-4xl lg:text-5xl text-dark font-semibold text-center md:text-left">Try QR Go Today!</h1>

                    <p className="w-full lg:w-[70%] text-[14px] md:text-[16px] text-dark font-medium text-center md:text-left">Get started for free. Generate codes
                        for anything you want. Have all digital information
                        saved in a QR code. Sign in to create your own QR code now!</p>

                    <GetStartedBtn />
                </motion.section>

                <motion.section
                    className="mt-12 md:mt-0"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/img/qr-go.png" width={250} height={250} alt="hero-img" loading="lazy" />
                </motion.section>
            </section>
        </main>
    );
}

export default TryQR;
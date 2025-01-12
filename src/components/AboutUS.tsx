import { motion } from "framer-motion";
import Image from "next/image";

const AboutUs = () => {
    return ( 
        <main className="relative top-[100px] min-h-screen md:top-[60px] grid grid-cols-1 md:grid-cols-2 items-center justify-center">

            <motion.div 
            className="md:hidden px-[5%] mb-5 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
            >
                <h1 className="text-[28px] md:text-[36px] lg:text-[40px] text-dark font-semibold text-center">About Us</h1>
                <p className="text-[14px] md:text-[16px] text-dark text-center max-w-[70%]">Get to know more about QR-Go, what it does, how it does it and other interesting information about QR-Go</p>
            </motion.div>

            <motion.section 
            className="bg-liteskyblue flex items-center justify-center py-8 md:py-20 h-full"
            initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
            >
                <Image src="/img/about.png" width={400} height={400} alt="aboutus-img" loading="lazy"/>
            </motion.section>

            <section className="pt-10 pb-20 md:py-20 px-[5%] md:px-[10%]">
                <motion.h1 
                className="text-[28px] md:text-[36px] lg:text-[40px] text-dark font-semibold text-center hidden md:block"
                initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >About Us</motion.h1>

                <motion.div 
                className="grid gap-8"
                initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-[14px] md:text-[16px] text-dark text-center">QR Go is the easiest way to generate QR codes for websites and file downloads. Simply enter the URL or select the file, and QR Go will generate a QR code that can be scanned by any QR code reader.</p>

                    <p className="text-[14px] md:text-[16px] text-dark text-center">QR Go was created by a team of developers and designers who saw the potential for QR codes to revolutionize the way people access information. Since then, QR Go has been used by businesses of all sizes to generate QR codes for everything from product pages to downloadables.</p>

                    <p className="text-[14px] md:text-[16px] text-dark text-center">QR Go is constantly evolving to make it even easier for businesses to use QR codes. Our latest features include custom branding, tracking, and analytics so businesses can see how their QR codes are being used and make changes accordingly.</p>
                </motion.div>
            </section>
        </main>
     );
}
 
export default AboutUs;
import { motion } from "framer-motion";
import Image from "next/image";
const QRGuildlines = () => {
    return (
        <main className="relative top-[100px] bg-skyblue w-full px-[5%] pt-28 pb-20 grid gap-4 bg-background" id="guildlines">
            <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl text-dark font-semibold text-center"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
            >Create Your Qr Code In Matter Of Minutes.</motion.h1>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <motion.div
                    className="flex flex-col items-center justify-center text-center gap-2"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/img/content.png" width={150} height={150} alt="content" loading="lazy" />

                    <h1 className="text-[18px] md:text-[22px] text-dark font-semibold max-w-[60%]">Choose the content of your Qr Code.</h1>

                    <p className="text-[14px] md:text-[16px] text-dark max-w-[40%]">Select either Url or File Upload</p>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center justify-center text-center gap-2"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/img/design.png" width={150} height={150} alt="content" loading="lazy" />

                    <h1 className="text-[18px] md:text-[22px] text-dark font-semibold max-w-[60%]">Customize and design</h1>

                    <p className="text-[14px] md:text-[16px] text-dark max-w-[70%]">Fill in all the information and use our QR generator to get a unique design</p>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center justify-center text-center gap-2"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Image src="/img/download.png" width={150} height={150} alt="content" loading="lazy" />

                    <h1 className="text-[18px] md:text-[22px] text-dark font-semibold max-w-[70%]">Download your QR code.</h1>

                    <p className="text-[14px] md:text-[16px] text-dark max-w-[70%]">Get your QR code in jpeg or PNG format, print it or show in digital form and Voila!</p>
                </motion.div>
            </section>
        </main>
    );
}

export default QRGuildlines;
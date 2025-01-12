import { motion } from "framer-motion";
import Image from "next/image";

const FAQ = () => {
    return (
        <main className="relative top-[100px] w-full">
            <hr className="bg-darkblue h-3 w-full mb-2" />
            <section className=" relative w-full h-[150px] bg-darkblue flex items-center justify-center">
                <motion.div
                    className="bg-white p-3 xs:p-5 md:p-10 shadow-xl absolute bottom-[-50px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-[28px] md:text-4xl lg:text-5xl text-center font-semibold text-dark">Frequently Asked Questions</h1>
                </motion.div>
            </section>

            <section className="relative top-[50px] px-[5%] grid gap-8 py-20 mb-[100px]">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center">
                    <motion.div
                        className="mb-5 md:mb-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <Image src="/img/faq1.png" width={300} height={300} alt="hero-img" loading="lazy" />
                    </motion.div>

                    <motion.div
                        className="grid gap-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-[28px] md:text-4xl lg:text-5xl text-dark font-semibold text-center md:text-left">What is QR Code?</h1>

                        <p className="text-[14px] md:text-[16px] text-dark font-medium text-center md:text-left">A  QR code (Quick Response Code) is a type of barcode
                            that stores information and can be read by a digital device,
                            such as a cell phone.</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center flex-col-reverse">
                    <motion.div
                        className="flex flex-col items-center md:items-end justify-center md:justify-end gap-4 md:order-first order-second"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-[28px] md:text-4xl lg:text-5xl text-dark font-semibold text-center md:text-right">Who uses QR Code?</h1>

                        <p className="text-[14px] md:text-[16px] text-dark font-medium text-center md:text-right">QR Codes are used by virtually everyone.
                            It has documents, links to pages and websites attached to it,
                            With a QR Coode information can be stored safely
                            for easy access.</p>
                    </motion.div>

                    <motion.div
                        className="mb-5 md:mb-0 md:order-second order-first"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <Image src="/img/faq2.png" width={300} height={300} alt="hero-img" loading="lazy" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center place-items-center">
                    <motion.div
                        className="mb-5 md:mb-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <Image src="/img/faq3.png" width={300} height={300} alt="hero-img" loading="lazy" />
                    </motion.div>

                    <motion.div
                        className="grid gap-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-[28px] md:text-4xl lg:text-5xl text-center md:text-left text-dark font-semibold">What kind of information
                            can I store on a QR Code?</h1>

                        <p className="text-[14px] md:text-[16px] text-center md:text-left text-dark font-medium">QR Codes are so versatile, they are able to
                            store a variety of information depending on your needs.
                            It can store a URL to make it easier for you to open a page on the web
                            with just a scan. It can also store contact details so you don&rsquo;t have to
                            manually type the name, phone number, and email address to save it
                            to your phone.</p>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}

export default FAQ;
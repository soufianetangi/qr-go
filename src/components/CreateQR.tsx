import { FaFile, FaLink } from "react-icons/fa6";
// import { IoLinkSharp } from "react-icons/io5";
// import { IoMdAttach } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

const CreateQR = () => {
    return (
        <main className="relative top-[100px] w-full min-h-screen pt-5 pb-20 px-[5%] grid gap-10">
            <section className="flex flex-col items-center justify-center gap-8">
                <motion.h1
                    className="text-[28px] md:text-[34px] text-dark text-center font-semibold"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >Create QR-Code for</motion.h1>
                <motion.div
                    className="flex items-center justify-center gap-8 md:gap-16"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Link href="/link" className="px-10 py-5 rounded-lg border-2 border-blue text-dark text-[18px] font-semibold flex flex-col items-center justify-center gap-4 hover:bg-liteskyblue transition-all delay-150">
                            <FaLink className="text-4xl text-blue" />
                            Link
                        </Link>
                    </motion.div>

                    <motion.p 
                    className="text-3xl font-bold text-dark"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    >
                        or
                    </motion.p>

                    <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Link href="/file" className="px-10 py-5 rounded-lg border-2 border-blue text-dark text-[18px] font-semibold flex flex-col items-center justify-center gap-4 hover:bg-liteskyblue transition-all delay-150">
                            <FaFile className="text-4xl text-blue" />
                            File
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* <motion.section
                className="grid gap-4 w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                <h1 className="text-[20px] md:text-[24px] text-dark font-semibold">Recent</h1>

                <div className="w-full text-[16px] md:text-[18px] text-dark font-semibold flex items-center justify-between pb-4 border-b-4 border-b-skyblue">
                    <h1>Name</h1>
                    <h1>Date</h1>
                </div>

                <div className="w-full text-[14px] md:text-[16px] text-dark flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <IoLinkSharp className="text-3xl p-1 rounded-full bg-gray-300" />
                        <h1>https://www.somefancyurl.com</h1>
                    </div>

                    <h1>22-Dec-2023</h1>
                </div>

                <div className="w-full text-[14px] md:text-[16px] text-dark flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <IoMdAttach className="text-3xl p-1 rounded-full bg-gray-300" />
                        <h1>myselfie.jpg</h1>
                    </div>

                    <h1>22-Dec-2023</h1>
                </div>

                <div className="w-full text-[14px] md:text-[16px] text-dark flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <IoMdAttach className="text-3xl p-1 rounded-full bg-gray-300" />
                        <h1>myselfie.jpg</h1>
                    </div>

                    <h1>22-Dec-2023</h1>
                </div>

                <div>

                </div>
            </motion.section> */}

        </main>
    );
}

export default CreateQR;
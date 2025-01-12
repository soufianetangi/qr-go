"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => {
    const pathName = usePathname()
    return (
        <main className="bg-darkblue px-[5%] py-10 relative top-[50px] grid gap-8">
            <section className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Link href="/" className="flex items-center justify-center md:justify-start">
                        <Image src="/img/footer-logo.png" width={50} height={50} alt="footer-img" />
                    </Link>
                </motion.div>

                <motion.div
                    className="text-[14px] md:text-[16px] text-offwhite font-semibold flex items-center justify-center md:justify-between gap-6 md:gap-0"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Link href="/home" className={pathName === "/home" ? "visited:text-dark transition-all delay-200" : "hover:text-dark transition-all delay-200"}>Home</Link>
                    <Link href="/about" className={pathName === "/about" ? "visited:text-dark transition-all delay-200" : "hover:text-dark transition-all delay-200"}>About US</Link>
                    <Link href="/contact" className={pathName === "/contact" ? "visited:text-dark transition-all delay-200" : "hover:text-dark transition-all delay-200"}>Contact US</Link>
                </motion.div>

                <motion.div
                    className="flex items-center md:items-end justify-center md:justify-end gap-4"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <FaXTwitter className="text-dark text-3xl p-1.5 rounded-full bg-offwhite hover:bg-skyblue transition-all delay-200 cursor-pointer" />
                    <FaFacebookF className="text-dark text-3xl p-1.5 rounded-full bg-offwhite hover:bg-skyblue transition-all delay-200 cursor-pointer" />
                    <FaYoutube className="text-dark text-3xl p-1.5 rounded-full bg-offwhite hover:bg-skyblue transition-all delay-200 cursor-pointer" />
                </motion.div>
            </section>

            <motion.hr
                className="w-full bg-offwhite"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
            />

            <motion.p
                className="text-[14px] md:text-[16px] text-offwhite text-center"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
            >Copyright@2024 QR-Go. All Rights Reserved.</motion.p>

        </main>
    );
}

export default Footer;
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const SideView = () => {
    return (
        <main className="h-full">
            <section className="bg-liteskyblue flex items-center justify-center py-5 md:py-20 h-full min-h-auto md:min-h-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <Link href={"/"}>
                        <Image src="/img/contactus.png" width={400} height={400} alt="aboutus-img" loading="lazy" />
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}

export default SideView;
import { motion } from "framer-motion";
import SideView from "./SideView";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLoader3 } from "react-icons/tb";

interface FormData {
    fullName: string;
    emailAddress: string;
    message: string;
}

const ContactUs = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        emailAddress: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = () => {
        return formData.fullName !== '' && formData.emailAddress !== '' && formData.message !== '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const clearForm = () => {
        setFormData({
            fullName: '',
            emailAddress: '',
            message: '',
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            console.log(formData);
            toast.success("Message sent successfully!");
            clearForm();
            setIsLoading(false);
        }, 2000);
    };

    return (
        <main className="relative top-[100px] md:top-[50px] grid grid-cols-1 md:grid-cols-2 items-center justify-center">
            <motion.div
                className="flex flex-col items-center justify-center mb-5 md:hidden"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                exit={{ opacity: 0, y: -40 }}
            >
                <h1 className="text-[28px] md:text-[36px] lg:text-[40px] text-dark font-semibold text-center">How can we help?</h1>
                <p className="text-[14px] md:text-[16px] text-dark text-center max-w-[70%]">We&rsquo;d love to hear from you. Leave a message
                    and we&rsquo;ll respond as soon as possible</p>
            </motion.div>

            <SideView />

            <section className="pt-8 pb-20 md:py-20 px-[5%] md:px-[10%]">
                <motion.div
                    className="md:flex flex-col items-center justify-center hidden"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    exit={{ opacity: 0, y: -40 }}
                >
                    <h1 className="text-[40px] text-dark font-semibold text-center">How can we help?</h1>
                    <p className="text-[16px] text-dark text-center max-w-[70%]">We&rsquo;d love to hear from you. Leave a message
                        and we&rsquo;ll respond as soon as possible</p>
                </motion.div>

                <motion.form
                    action=""
                    className="grid gap-4 text-[16px] text-dark"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    exit={{ opacity: 0, y: -40 }}
                    onSubmit={handleSubmit}
                >
                    <form
                        action=""
                        className="grid gap-4 text-[16px] text-dark"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="fullName">Name
                            <input type="text" name="fullName" id="fullName" placeholder="Enter full name" className="input" required onChange={handleInputChange} value={formData.fullName} />
                        </label>
                        <label htmlFor="emailAddress">Email
                            <input type="email" name="emailAddress" id="emailAddress" placeholder="Enter email" className="input" required onChange={handleInputChange} value={formData.emailAddress} />
                        </label>

                        <label htmlFor="message">Message
                            <textarea name="message" id="message" cols={30} rows={10} className="input" required onChange={handleInputChange} value={formData.message}></textarea>
                        </label>

                        <button
                            type="submit"
                            className="px-10 py-2 rounded-lg bg-blue hover:shadow-xl delay-150 text-[16px] text-white font-semibold flex items-center justify-center"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? (
                                <>
                                    <TbLoader3 className="animate-spin text-white text-2xl text-center font-semibold cursor-not-allowed" />
                                </>
                            ) : (
                                'Send'
                            )}
                        </button>
                    </form>
                    <ToastContainer />
                </motion.form>
            </section>
        </main>
    );
}

export default ContactUs;
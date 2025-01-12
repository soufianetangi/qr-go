"use client"
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserProvider } from "@/components/context/UserContext";

const Contact = () => {
    return (
        <main>
            <UserProvider>
                <Header />
                <ContactUs />
                <Footer />
            </UserProvider>
        </main>
    );
}

export default Contact;
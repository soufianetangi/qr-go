"use client"
import AboutUs from "@/components/AboutUS";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserProvider } from "@/components/context/UserContext";

const About = () => {
    return (
        <main>
            <UserProvider>
                <Header />
                <AboutUs />
                <Footer />
            </UserProvider>
        </main>
    );
}

export default About;
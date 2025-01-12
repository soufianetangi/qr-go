"use client"
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import QRGuildlines from "@/components/QRGuildlines";
import TryQR from "@/components/TryQR";
import { UserProvider } from "@/components/context/UserContext";

const Home = () => {
    return (
        <main>
            <UserProvider>
                <Header />
                <HomeHero />
                <QRGuildlines />
                <TryQR />
                <FAQ />
                <Footer />
            </UserProvider>
        </main>
    );
}

export default Home;
"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LinkQR from "@/components/LinkQR";
import PrivateRoute from "@/components/PrivateRoute";
import { UserProvider } from "@/components/context/UserContext";

const Link = () => {
    return (
        <main>
            <PrivateRoute>
                <UserProvider>
                    <Header />
                    <LinkQR />
                    <Footer />
                </UserProvider>
            </PrivateRoute>
        </main>
    );
}

export default Link;
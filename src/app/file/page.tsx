"use client"
import FileQR from "@/components/FileQR";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
import { UserProvider } from "@/components/context/UserContext";

const File = () => {
    return (
        <main>
            <PrivateRoute>
                <UserProvider>
                    <Header />
                    <FileQR />
                    <Footer />
                </UserProvider>
            </PrivateRoute>
        </main>
    );
}

export default File;
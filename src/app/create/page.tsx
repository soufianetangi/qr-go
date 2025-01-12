"use client"
import CreateQR from "@/components/CreateQR";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
import { UserProvider } from "@/components/context/UserContext";

const Create = () => {
    return (
        <main>
            <PrivateRoute>
                <UserProvider>
                    <Header />
                    <CreateQR />
                    <Footer />
                </UserProvider>
            </PrivateRoute>
        </main>
    );
}

export default Create;
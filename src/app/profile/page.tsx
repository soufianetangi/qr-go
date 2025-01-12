"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
import UserProfile from "@/components/UserProfile";
import { UserProvider } from "@/components/context/UserContext";

const Profile = () => {
    return (
        <main>
            <PrivateRoute>
                <UserProvider >
                    <Header />
                    <UserProfile />
                    <Footer />
                </UserProvider>
            </PrivateRoute>
        </main>
    );
}

export default Profile;
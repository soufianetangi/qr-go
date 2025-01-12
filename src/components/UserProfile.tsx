import { motion } from "framer-motion";
import Image from "next/image";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Modal from 'react-modal';
import { MdUpload } from "react-icons/md";

const UserProfile = () => {
    const [editing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(UserContext);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Getting the current user id
    const [currentUser] = useAuthState(auth);

    const [updatedUser, setUpdatedUser] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        userName: user?.userName || '',
        phoneNumber: user?.phoneNumber || '',
        gender: user?.gender || '',
        address: user?.address || '',
        state: user?.state || '',
        postalCode: user?.postalCode || '',
        country: user?.country || '',
        facebook: user?.facebook || '',
        twitter: user?.twitter || '',
        instagram: user?.instagram || '',
        youtube: user?.youtube || '',
        linkedin: user?.linkedin || '',
        website: user?.website || '',
    });

    useEffect(() => {
        setUpdatedUser({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            userName: user?.userName || '',
            phoneNumber: user?.phoneNumber || '',
            gender: user?.gender || '',
            address: user?.address || '',
            state: user?.state || '',
            postalCode: user?.postalCode || '',
            country: user?.country || '',
            facebook: user?.facebook || '',
            twitter: user?.twitter || '',
            instagram: user?.instagram || '',
            youtube: user?.youtube || '',
            linkedin: user?.linkedin || '',
            website: user?.website || '',
        });
    }, [user]);


    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        if (updatedUser && currentUser) {
            const userDocRef = doc(db, `users/${currentUser.uid}`);
            try {
                await updateDoc(userDocRef, updatedUser);
                toast.success("User details saved successfully.");
                setEditing(false);
            } catch (error) {
                console.error("Error updating user details:", error);
                toast.error("Failed to save user details. Please check console for error.");
            }
        } else {
            console.error("Error: User or user UID is undefined.");
            toast.error("Failed to save user details. User information is missing.");
        }
    };

    // Logic to get date of account creation
    let creationDate: null | any;
    if (currentUser && currentUser.metadata) {
        creationDate = currentUser.metadata.creationTime;
    }

    // Logic to choose and update profile picture
    const choosePicture = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                setProfilePicture(target.files[0]);
            }
        };
        inputElement.click();
    };

    const storage = getStorage(); // Initializing Firebase Storage

    const handleUpdateProfilePicture = async () => {
        if (profilePicture && currentUser) {
            try {
                // Upload profile picture to Firebase Storage
                setIsLoading(true)
                const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
                const snapshot = await uploadBytes(storageRef, profilePicture);
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Update profile picture URL in Firestore
                const userDocRef = doc(db, `users/${currentUser.uid}`);
                await updateDoc(userDocRef, { img: downloadURL });

                toast.success("Profile picture updated successfully.");
                setIsLoading(false)
                setProfilePicture(null)
            } catch (error) {
                console.error("Error updating profile picture:", error);
                toast.error("Failed to update profile picture. Please check console for error.");
            }
        } else {
            toast.error("Please select a profile picture to update.");
        }
    };


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <main className="w-full h-full relative top-[90px] md:top-[95px] mb-10">
            <section className="bg-darkblue w-full h-[150px] mb-20 px-[5%] py-5">
                <motion.div
                    className="relative flex justify-between gap-5 w-full h-full"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <div className="grid gap-2">
                        <h1 className="text-[24px] text-white font-semibold pt-3">Profile Information</h1>

                        <div className="absolute bottom-[-150px] left-0 flex flex-col items-center justify-center gap-4 z-10">
                            <div className="p-2 rounded-full bg-white shadow-lg w-[150px] h-[150px] text-center">
                                {user?.img ? (
                                    <Image src={user?.img} width={100} height={100} alt="user" loading="lazy" className="w-full h-full rounded-full" />
                                ) : (
                                    <div className="text-7xl font-extrabold p-6 rounded-full border-8 border-darkblue text-darkblue text-center flex items-center justify-center">
                                        <h1>
                                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                        </h1>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    className="text[14px] md:text-[16px] px-4 py-2 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150 cursor-pointer"
                                    onClick={openModal}
                                >
                                    View Picture
                                </button>
                                {profilePicture ? (
                                    <button
                                        className="text[14px] md:text-[16px] p-2 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150 cursor-pointer flex items-center justify-center gap-1"
                                        onClick={handleUpdateProfilePicture}
                                    >
                                        <MdUpload className="text-2xl animate-bounce"/>
                                        {isLoading ? (
                                            "Uploading..."
                                        ) : (
                                            "Upload Picture"
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        className="text[14px] md:text-[16px] px-4 py-2 bg-white text-blue border border-blue font-semibold rounded-md hover:shadow-lg transition-all delay-150 cursor-pointer"
                                        onClick={() => {
                                            choosePicture();
                                        }}
                                    >
                                        Change Picture
                                    </button>
                                )}
                            </div>
                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            className="fixed inset-0 flex items-center justify-center z-50"
                            overlayClassName="fixed inset-0 backdrop-blur-3xl z-50"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                viewport={{ once: true }}
                                className="relative p-2 bg-white shadow-lg w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] text-center"
                            >
                                {user?.img ? (
                                    <Image src={user?.img} width={500} height={500} alt="user" loading="lazy" className="w-full h-full" />
                                ) : (
                                    <div className="w-full h-full text-9xl font-extrabold p-6 border-8 border-darkblue text-darkblue text-center flex items-center justify-center">
                                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                    </div>
                                )}

                                <button
                                    className="text[14px] md:text-[16px] px-8 py-2 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150 cursor-pointer mt-5"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </motion.div>
                        </Modal>
                    </div>

                    <div>
                        {editing ? (
                            <button
                                className="text-[14px] md:text-[16px] px-3 md:px-5 py-2 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150"
                                onClick={handleSave}
                            >
                                Save Edit
                            </button>
                        ) : (
                            <button
                                className="text-[14px] md:text-[16px] px-3 md:px-5 py-2 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="relative py-10 mt-32 md:mt-0"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-start md:items-end justify-start md:justify-end">
                        <div>
                            <h1 className="text-[18px] text-dark font-semi-bold font-semibold mb-3">Account Details</h1>
                            <div className="text-[16px] text-dark font-semibold flex items-center basis-60 flex-wrap gap-3 md:gap-8">
                                <h1>User ID: <span className="font-normal ml-3">{user?.qrgId.toLocaleUpperCase()}</span></h1>
                                <h1>Member Since: <span className="font-normal ml-3">{new Date(creationDate).toLocaleDateString()}</span></h1>
                                <h1>Account Type: <span className="font-normal ml-3">{user?.accountType}</span></h1>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="relative w-full h-full px-[5%] py-20 mt-[250px] md:mt-[50px]">
                <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-[14px] md:text-[16px] text-dark">
                    <motion.div
                        className="grid gap-2 w-full"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-[20px] text-dark font-bold">Profile Details</h1>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Email Address:</h1>
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                className="profile-input"
                                readOnly
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">First Name:</h1>
                            <input
                                type="text"
                                name="firstName"
                                value={updatedUser.firstName}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Last Name:</h1>
                            <input
                                type="text"
                                name="lastName"
                                value={updatedUser.lastName}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">User Name:</h1>
                            <input
                                type="text"
                                name="userName"
                                value={updatedUser.userName}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Phone Number:</h1>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updatedUser.phoneNumber}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Gender:</h1>
                            <input
                                type="text"
                                name="gender"
                                value={updatedUser.gender}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Address:</h1>
                            <input
                                type="text"
                                name="address"
                                value={updatedUser.address}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">State:</h1>
                            <input
                                type="text"
                                name="state"
                                value={updatedUser.state}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Postal Code:</h1>
                            <input
                                type="text"
                                name="postalCode"
                                value={updatedUser.postalCode}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Country:</h1>
                            <input
                                type="text"
                                name="country"
                                value={updatedUser.country}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid gap-2 w-full"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-[20px] text-dark font-bold">Social Media Links and Websites</h1>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Facebook:</h1>
                            <input
                                type="url"
                                name="facebook"
                                value={updatedUser.facebook}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Twitter:</h1>
                            <input
                                type="url"
                                name="twitter"
                                value={updatedUser.twitter}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Instagram:</h1>
                            <input
                                type="url"
                                name="instagram"
                                value={updatedUser.instagram}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Youtube:</h1>
                            <input
                                type="url"
                                name="youtube"
                                value={updatedUser.youtube}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Linkedin:</h1>
                            <input
                                type="url"
                                name="linkedin"
                                value={updatedUser.linkedin}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold">Website:</h1>
                            <input
                                type="url"
                                name="website"
                                value={updatedUser.website}
                                onChange={handleInputChange}
                                className="profile-input"
                                readOnly={!editing}
                            />
                        </div>
                    </motion.div>
                </form>
                <ToastContainer />
            </section>
        </main>
    );
}

export default UserProfile;
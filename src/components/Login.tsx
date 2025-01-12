import React, { FC, MouseEventHandler, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { TbLoader3 } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

interface LoginProps {
  onSwitch: MouseEventHandler<HTMLSpanElement>;
}

const Login: FC<LoginProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!")
      return;
    }

    // Simulate a loading process
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Login successful")
        localStorage.setItem('user', "loggedIn");
        setTimeout(() => {
          setIsLoading(false);
          router.replace("/create");
        }, 3000);
      })

      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password")
          setIsLoading(false);
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid Email format");
          setIsLoading(false);
        } else if (error.code === "auth/invalid-login-credentials") {
          toast.error("Invalid login credentials, register");
          setIsLoading(false);
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid-credential, register");
          setIsLoading(false);
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too-many-requests, try in the next 2mins");
          setIsLoading(false);
        } else {
          toast.error(error.code);
          setIsLoading(false);
          return;
        }
      });

  };

  return (
    <main className="w-full grid gap-4 px-[5%] md:px-[10%]">
      <ToastContainer />
      <motion.div
        className="hidden md:grid gap-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-[28px] md:text-[36px] lg:text-[40px] text-dark text-center font-semibold">Welcome Back To <span className="text-blue">QR Go</span></h1>
        <p className="text-[14px] md:text-[16px] text-dark text-center">Login with your details you entered during registration.</p>
      </motion.div>

      <motion.form
        action=""
        className="grid gap-4 text-[14px] md:text-[16px] text-dark"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <label htmlFor="email">Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email" name='email' id='email' placeholder="Enter email" className="input" required />
        </label>
        <label htmlFor="pword">Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password" name="pword" id='pword' placeholder="Enter password" className="input" required />
        </label>

        {/* <label htmlFor="remember" className="text-[14px] flex items-center gap-2">
          <input type="checkbox" name='remember' id='remember' required />
          Remember password
        </label> */}

        <button
          onClick={handleLogin}
          className="flex items-center justify-center bg-blue px-10 py-2 rounded-md text-[15px] md:text-[16px] text-center text-white font-semibold"
        >
          {isLoading ? (
            <>
              <TbLoader3 className="animate-spin text-white text-2xl text-center font-semibold cursor-not-allowed" />
            </>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-[13px] md:text-[14px] text-dark text-center">New here? <span className="text-darkblue cursor-pointer" onClick={onSwitch}>Create an account</span></p>
      </motion.form>
    </main>
  );
}

export default Login;
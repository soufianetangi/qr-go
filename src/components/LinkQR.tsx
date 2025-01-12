"use client"
import { useState, useRef } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { FaBackward } from "react-icons/fa6";
import { motion } from "framer-motion";

const LinkQR = () => {
  const [url, setUrl] = useState<string>("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLImageElement>(null);

  const generateQRCode = async () => {
    if (url.trim() !== "") {
      try {
        const generatedQRCode = await QRCode.toDataURL(url);
        toast.success("QR-Code generated successfully!")
        setQrCode(generatedQRCode);
      } catch (error) {
        toast.error("Error generating QR code, check console for details")
        console.error("Error generating QR code:", error);
      }
    }
  };

  const handleGenerateClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (url.trim() === "") {
      toast.error("No URL provided. Please enter a valid URL.");
      return;
    }

    try {
      // Check if the entered value is a valid URL
      new URL(url);

      // If it's a valid URL, proceed to generate QR code
      await generateQRCode();
    } catch (error) {
      toast.error("Not a valid URL. Please enter a valid URL.");
    }
  };

  const downloadAsJPG = () => {
    if (qrCodeRef.current) {
      const link = document.createElement("a");
      link.href = qrCodeRef.current.src;
      link.download = "qrcode.jpg";
      link.click();
    }
  };

  const downloadAsPNG = () => {
    if (qrCodeRef.current) {
      const link = document.createElement("a");
      link.href = qrCodeRef.current.src;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="relative top-[100px] w-full min-h-screen pt-5 md:pt-10 pb-20 px-[5%] grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-10 md:gap-52">
        <motion.section
          className="grid gap-2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Link href="/create" className='flex items-center gap-2 text-dark font-semibold text-lg md:text-md mb-4'>
            <FaBackward className="text-blue" />  Back
          </Link>

          <h1 className="text-[28px] md:text-[32px] text-dark font-semibold text-center md:text-left">Enter URL</h1>

          <form onSubmit={handleGenerateClick} className="grid gap-4 text[14px] md:text-[16px] text-dark">
            <input

              placeholder="Enter your URL here"
              className="input pl-11"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150"
            >
              Generate
            </button>
          </form>
        </motion.section>

        <motion.section
          className="w-full grid place-items-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-[80%] border-dashed border-[3px] p-8 rounded-xl grid grid-cols-1 items-center justify-center place-items-center gap-4">
            {!qrCode && <h1 className="text-[24px] text-dark text-center font-semibold">Generated QR-Code appears here and ready to download. <br /><br /> Enter your link and click on generate to create your QR-Code. <br /><br /> Enjoy!!!</h1>}

            {qrCode && (
              <motion.div
                className="w-full grid grid-cols-1 items-center justify-center place-items-center gap-4"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              >

                <Image ref={qrCodeRef} src={qrCode} alt="qrcode" width={200} height={200} />

                <h1 className="text-[28px] text-dark text-center font-semibold">Download as</h1>

                  <button onClick={downloadAsJPG} className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150">
                    JPG
                  </button>

                  <button onClick={downloadAsPNG} className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150">
                    PNG
                  </button>
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default LinkQR;

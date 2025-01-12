"use client"
import { useState } from "react";
import Image from "next/image";
import { useDropzone, FileRejection } from "react-dropzone";
import QRCode from "qrcode";
import { BarLoader } from "react-spinners";
import { TbLoader3 } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { FaBackward } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const FileQR = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uniqueIdentifier, setUniqueIdentifier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); // Initialize useRouter

  const generateUniqueIdentifier = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx", ".ppt", ".pptx"] },
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        setBackgroundColor("rgba(204, 228, 243, 0.2)");
        setUploadProgress(0);
        setUploadedFileName(null);
        setUniqueIdentifier(null);

        reader.onload = () => {
          setUniqueIdentifier(generateUniqueIdentifier());
        };

        reader.readAsDataURL(file);

        const uploadInterval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            const newProgress = prevProgress + 10;
            return newProgress >= 100 ? 100 : newProgress;
          });
        }, 500);

        // Simulating an asynchronous file upload
        setTimeout(() => {
          setUploadProgress(100);
          setUploadedFileName(file.name);
          clearInterval(uploadInterval);
        }, 5000);
      }
    },
  });

  const generateQRCode = async () => {
    if (uploadedFileName && uniqueIdentifier) {
      try {
        const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL || window.location.origin; // Get the base URL
        const qrCodeData = `${baseURL}/${uniqueIdentifier}`;
        const generatedQRCode = await QRCode.toDataURL(qrCodeData);
        toast.success("QR-Code generated successfully!")
        setQrCode(generatedQRCode);
      } catch (error) {
        toast.error("Error generating QR code, check console for more details")
        console.error("Error generating QR code:", error);
      }
    }
  };
  

  const downloadAsJPG = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = `qrcode_${uniqueIdentifier}.jpg`;
      link.click();
    }
  };

  const downloadAsPNG = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = `qrcode_${uniqueIdentifier}.png`;
      link.click();
    }
  };

  // Handle and stimulate a loading process
  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleGenerateClick = () => {
    if (uploadProgress === 100) {
      generateQRCode();
    }
    if (uploadProgress === 0) {
      toast.error("No file selected. Please browse a file to upload.");
      setBackgroundColor("");
      setUploadProgress(0);
      setUploadedFileName(null);
      setUniqueIdentifier(null);
    } else if (uploadProgress < 100) {
      toast.error("File upload failed. Please try again.");
      setBackgroundColor("");
      setUploadProgress(0);
      setUploadedFileName(null);
      setUniqueIdentifier(null);
    }
  }

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

          <h1 className="text-[28px] md:text-[32px] text-dark font-semibold text-center md:text-left">Upload File</h1>

          <div
            {...getRootProps()}
            style={{ backgroundColor: backgroundColor }}
            className="grid items-center justify-center place-items-center gap-4 text[14px] md:text-[16px] text-dark border-dashed border-[3px] rounded-xl p-8"
          >
            <input {...getInputProps()} />
            <Image src="/img/upload-img.png" width={100} height={100} alt="upload-img" />
            {uploadProgress < 100 ? (
              <>
                <p className="text-[16px] text-dark text-center">
                  {uploadProgress === 0 ? "Drag and drop file to create QR code" : `Uploading: ${uploadProgress}%`}
                </p>
                {uploadProgress > 0 && <BarLoader color="#3498db" loading={true} height={4} />}
              </>
            ) : (
              <p className="text-[16px] text-dark text-center">
                {uploadedFileName ? `Uploaded File: ${uploadedFileName}` : ""}
              </p>
            )}
            <button onClick={handleClick} className="flex items-center justify-center w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150">
              {isLoading ? (
                <>
                  <TbLoader3 className="animate-spin text-white text-2xl text-center font-semibold cursor-not-allowed" />
                </>
              ) : (
                'Browse File'
              )}
            </button>
          </div>

          <button
            onClick={handleGenerateClick}
            className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150"
          >
            Generate
          </button>
        </motion.section>

        <motion.section
          className="w-full grid place-items-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-[80%] border-dashed border-[3px] p-8 rounded-xl grid grid-cols-1 items-center justify-center place-items-center gap-4">
            {!qrCode && (
              <h1 className="text-[24px] text-dark text-center font-semibold">
                Generated QR-Code appears here and ready to download. <br /><br /> Drag and drop a file or browse a file, then click on generate to create your QR-Code.
                <br /><br /> Enjoy!!!
              </h1>
            )}

            {qrCode && (<motion.section
              className="w-full grid place-items-center gap-4"
              initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
              <Image src={qrCode} alt="qrcode" width={200} height={200} />

              <h1 className="text-[28px] text-dark text-center font-semibold">Download as</h1>
              <button onClick={downloadAsJPG} className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150">
                JPG
              </button>

              <button onClick={downloadAsPNG} className="w-full text[14px] md:text-[16px] px-3 md:px-5 py-2.5 md:py-3 bg-blue text-white font-semibold rounded-md hover:shadow-lg transition-all delay-150">
                PNG
              </button>
            </motion.section>
            )}
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default FileQR;

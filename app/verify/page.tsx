'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/utils/axiosInstance";
import Navbar from "@/components/Navbar";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface User {
  id: string;
  email: string;
  username: string;
  isVerified: boolean;
}

const OTP_LENGTH = 6;

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    } else {
      const isVerified = (JSON.parse(user) as User).isVerified;
      if (isVerified) {
        window.location.href = "/";
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (otp.length !== OTP_LENGTH) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      const user  = localStorage.getItem("user") ;
      const username = user ? (JSON.parse(user) as User).username : "";

      const response = await api.post(
        "/api/v1/users/verifytoken",
        { verificationToken: otp, username },
        { withCredentials: true }
      );

      if (!response.data) {
        throw new Error("Invalid OTP");
      }
      
      const updatedUser = { ...(JSON.parse(user!) as User), isVerified: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("OTP verified successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center h-screen gap-6">

        {/* OTP Input */}
        <InputOTP
          maxLength={OTP_LENGTH}
          value={otp}
          onChange={(value) => setOtp(value)}
          disabled={loading}
        >
          <InputOTPGroup>
            {[0, 1, 2].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="
          border border-gray-500
          bg-white
          text-black
          focus-visible:ring-2
          focus-visible:ring-black
          dark:border-gray-700
          dark:bg-black
          dark:text-white
        "
              />
            ))}
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            {[3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="
          border border-gray-500
          bg-white
          text-black
          focus-visible:ring-2
          focus-visible:ring-black
          dark:border-gray-700
          dark:bg-black
          dark:text-white
        "
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-32 h-11
            bg-black text-white
            rounded-md
            font-semibold
            transition-all
            hover:bg-gray-900
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </div>
    </>
  );
}

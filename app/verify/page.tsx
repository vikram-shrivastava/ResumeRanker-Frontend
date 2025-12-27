'use client';

import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";

const OTP_LENGTH = 6;

export default function VerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== OTP_LENGTH) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      const user=localStorage.getItem("user");
      const username=user?JSON.parse(user).username:"";
      console.log("verifying OTP for user:",username)
      const response=await axios.post("http://localhost:8000/api/v1/users/verifytoken", { verificationToken: finalOtp,username:username }, { withCredentials: true })
      console.log("OTP verification response",response)
      if(!response.data){
        throw new Error("Invalid OTP")
      }
      toast.success("OTP verified successfully");
      window.location.href="/";
    } catch (error: any) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {inputsRef.current[index] = el}}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="
              w-12 h-16
              text-center
              text-2xl font-bold
              border-2 border-black
              rounded-md
              focus:outline-none
              focus:ring-2 focus:ring-black
              text-black
            "
          />
        ))}
      </div>

      {/* ✅ Submit Button */}
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
  );
}

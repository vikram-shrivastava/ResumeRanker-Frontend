'use client';

import { useState } from "react";
import { toast } from "sonner";
import api from "@/utils/axiosInstance";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(
        "/api/v1/users/forgotpassword",
        { email },
        { withCredentials: true }
      );

      toast.success(
        "If an account exists, a password reset link has been sent"
      );
      setEmail("");
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen gap-6 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your email to receive a password reset link.
          </p>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
            disabled={loading}
          />

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </div>
    </>
  );
}

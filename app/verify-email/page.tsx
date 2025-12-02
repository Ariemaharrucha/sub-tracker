"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { emailOtp } from "@/lib/auth/auth.client";
import { useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/sign-up");
    }
  }, [email, router]);

  const handleVerify = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const { data, error } = await emailOtp.verifyEmail({
        email: email,
        otp: otp,
      });

      if (error) {
        toast.error(error.message || "Kode salah atau kadaluarsa");
      } else {
        toast.success("Email berhasil diverifikasi! Silakan login."); 
        
        router.push("/sign-in");
      }
    } catch (err) {
      console.error(err);
      toast.warning("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  if (!email) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 text-center p-4 bg-background">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Verifikasi Email</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Kami telah mengirimkan kode OTP ke <strong>{email}</strong>.<br/>
          Silakan masukkan kode 6 digit tersebut di bawah ini.
        </p>
      </div>

      <div className="space-y-4">
        {/* Binding value dan onChange ke state otp */}
        <InputOTP 
            maxLength={6} 
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={(value) => setOtp(value)}
        >
            <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>

        <Button 
            onClick={handleVerify} 
            disabled={loading || otp.length < 6}
            className="w-full"
        >
            {loading ? (
                <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifikasi...
                </>
            ) : (
                "Verifikasi Email"
            )}
        </Button>
      </div>
    </div>
  );
}

// WAJIB: Bungkus dengan Suspense karena menggunakan useSearchParams
export default function VerifyEmailSentPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
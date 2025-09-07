"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MailCheck } from "lucide-react"; 

export default function CheckEmailPage() {
  return (
    <div className="bg-neutral-light text-foreground min-h-[73dvh] flex flex-col flex-1 items-center p-4 sm:pt-6 space-y-2">
      <Card className="bg-background-light w-full max-w-md border-neutral rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80">
              <Image
                src="/logo/ethioguide-logo.png"
                alt="EthioGuide Symbol"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full"
                priority
              />
              <span className="text-[#2e4d57] font-semibold">EthioGuide</span>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-primary rounded-full p-3 bg-primary-light">
              <MailCheck size={48} className="text-primary" /> {/* Using MailCheck icon */}
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Check Your Email
            </CardTitle>
          </div>
          <p className="text-sm text-center text-neutral-dark mt-2">
            We&#39;ve sent a verification link to your email address.
            Please check your inbox (and spam folder) to activate your account.
          </p>
        </CardHeader>
        <CardContent>
          {/* <p className="mt-4 text-sm text-center text-neutral-dark">
            Didn&#39;t receive the email?{" "}
            <Link href="/auth/resend-verification" className="text-primary hover:underline">
              Resend email
            </Link> */}
          {/* </p> */}
          <p className="mt-2 text-sm text-center text-neutral-dark">
            Already verified?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
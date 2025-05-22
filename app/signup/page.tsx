import { SignupForm } from "@/components/signup-form";
import { PincodeProtection } from "@/components/pincode-protection";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <PincodeProtection
      title="Sign Up Access"
      description="Enter the access code to create a new account."
    >
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/"
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex items-center gap-3">
                <div className="squircle shadow-lg shadow-sky-500/25">
                  <Image
                    src="/miamicaps-icon.png"
                    alt="Miami Captains Logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h1 className="text-xl font-extrabold">Miami Captains</h1>
                  <span className="text-xs text-muted-foreground">
                    The #1 place for finding and booking amazing boat captains
                    in and around Miami.
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/photo.jpeg"
            alt="Background image"
            className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
            fill
            priority
          />
        </div>
      </div>
    </PincodeProtection>
  );
}

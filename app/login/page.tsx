import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="squircle shadow-lg shadow-sky-500/25">
                <Image
                  src="/miamicaps-icon.png"
                  alt="Miami Captains Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <span className="font-extrabold text-foreground">
                  Miami Captains
                </span>
                <p className="text-xs text-muted-foreground">
                  Miami&apos;s #1 place for amazing boat captains
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted backdrop-blur-xl lg:block">
        <Image
          src="/photo.jpeg"
          alt="Background image"
          className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
          fill
          priority
        />
      </div>
    </div>
  );
}

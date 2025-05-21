import { EmailSignupForm } from "@/components/email-signup-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-svh flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/photo.jpeg"
          alt="Background"
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full px-4">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h0" />
                  <path d="M7 12h0" />
                  <path d="M7 17h0" />
                  <path d="M12 7h5" />
                  <path d="M12 12h5" />
                  <path d="M12 17h5" />
                </svg>
              </div>
              <span className="text-xl">Miami Caps</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Coming Soon</h1>
              <p className="text-muted-foreground">
                We&apos;re working on something exciting. Sign up to be the
                first to know when we launch.
              </p>
            </div>

            <EmailSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}

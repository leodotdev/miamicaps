import { EmailSignupForm } from "@/components/email-signup-form";
import Image from "next/image";
import { headers } from "next/headers";

export default function Home() {
  // Force server-side rendering and cache busting
  headers();
  return (
    <div className="relative min-h-svh flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute backdrop-blur-md inset-0 bg-black/50 z-10" />
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
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 font-medium">
                <Image
                  src="/miamicaps-icon.png"
                  alt="Miami Captains Logo"
                  width={64}
                  height={64}
                  className="rounded-md"
                />
                <span className="text-xl">Miami Captains</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Miami&apos;s #1 place for finding and booking amazing boat captains.
              </p>
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

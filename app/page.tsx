import { EmailSignupForm } from "@/components/email-signup-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If user is logged in, redirect to home page
  if (session) {
    redirect("/home");
  }
  return (
    <div className="relative min-h-svh flex items-center justify-center">
      {/* Auth buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-white hover:text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <Link href="/login">Log in</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-white hover:text-white hover:bg-primary/70 backdrop-blur-sm"
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>

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
        <div className="bg-background backdrop-blur-sm rounded-3xl p-7 shadow-xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg border border-primary/20">
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
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="flex items-center justify-center">
                <Image
                  src="/miamicaps-coming-soon.png"
                  alt="Miami Captains App Preview"
                  width={200}
                  height={200}
                  className="opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-medium tracking-tight">
                Coming soon!
              </h1>
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

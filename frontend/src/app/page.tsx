"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <section className="w-full max-w-2xl text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          AI Resume & Portfolio Generator
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Build stunning, AI-powered resumes and public portfolios in seconds.
          Secure, customizable, and ready to launch your career.
        </p>

        <SignedOut>
  <Button size="lg" className="mb-4">
    Get Started — Sign In
  </Button>
</SignedOut>

<SignedIn>
  <Link href="/dashboard">
    <Button size="lg" className="mb-4">
      Go to Dashboard
    </Button>
  </Link>
</SignedIn>


        <div className="mt-10 grid gap-6 md:grid-cols-2 text-left">
          <FeatureCard
            title="AI Resume Generation"
            description="Generate professional resumes instantly with Groq LLM."
            link="/generate-resume"
          />
          <FeatureCard
            title="Portfolio Publishing"
            description="Showcase your work publicly at /portfolio/:username. Share your unique link with recruiters."
          />
          <FeatureCard
            title="Multiple Templates"
            description="Choose from beautiful templates. Preview and switch anytime."
          />
          <FeatureCard
            title="Secure & Private"
            description="Your data is protected with Clerk authentication and Supabase RLS."
          />
        </div>
      </section>

      <footer className="mt-auto py-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} AI Resume & Portfolio Generator &mdash; by Aditya Pachouri
      </footer>
    </main>
  );
}

// ⬇️ Enhanced FeatureCard to support optional navigation
function FeatureCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link?: string;
}) {
  const card = (
    <div className="bg-white/80 rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

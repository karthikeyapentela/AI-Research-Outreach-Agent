import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/landing/BackgroundFX";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SearchExperience } from "@/components/landing/SearchExperience";
import { Workflow } from "@/components/landing/Workflow";
import { Dashboard } from "@/components/landing/Dashboard";
import { Memory } from "@/components/landing/Memory";
import { Analytics } from "@/components/landing/Analytics";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { CursorSpotlight } from "@/components/landing/CursorSpotlight";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen text-white">
      <BackgroundFX />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <SearchExperience />
        <Workflow />
        <Dashboard />
        <Memory />
        <Analytics />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

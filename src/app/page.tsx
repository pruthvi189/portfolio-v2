import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { BootSequence } from "@/components/boot-sequence";
import { AmbientBackground } from "@/components/ambient-bg";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/custom-cursor";
import { SectionDivider } from "@/components/section-divider";
import { BackToTop } from "@/components/back-to-top";
import { EasterEgg } from "@/components/easter-egg";

export default function Home() {
  return (
    <>
      <BootSequence />
      <CustomCursor />
      <AmbientBackground />
      <EasterEgg />
      <PageTransition>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Contact />
          <Footer />
        </main>
      </PageTransition>
      <BackToTop />
    </>
  );
}

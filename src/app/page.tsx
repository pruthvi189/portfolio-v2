import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { PageTransition } from "@/components/page-transition";
import { SectionDivider } from "@/components/section-divider";
import { SiteEffects } from "@/components/site-effects";

export default function Home() {
  return (
    <>
      <SiteEffects />
      <PageTransition>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Contact />
          <Footer />
        </main>
      </PageTransition>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

const BootSequence = dynamic(() =>
  import("./boot-sequence").then((m) => m.BootSequence), { ssr: false }
);
const CustomCursor = dynamic(() =>
  import("./custom-cursor").then((m) => m.CustomCursor), { ssr: false }
);
const AmbientBackground = dynamic(() =>
  import("./ambient-bg").then((m) => m.AmbientBackground), { ssr: false }
);
const EasterEgg = dynamic(() =>
  import("./easter-egg").then((m) => m.EasterEgg), { ssr: false }
);
const BackToTop = dynamic(() =>
  import("./back-to-top").then((m) => m.BackToTop), { ssr: false }
);

export function SiteEffects() {
  return (
    <>
      <BootSequence />
      <CustomCursor />
      <AmbientBackground />
      <EasterEgg />
      <BackToTop />
    </>
  );
}

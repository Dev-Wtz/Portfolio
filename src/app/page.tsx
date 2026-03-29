import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FramerProvider from "@/components/providers/FramerProvider";
import { LightInteractionProvider } from "@/components/providers/LightInteractionProvider";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import DynamicParticleField from "@/components/three/DynamicParticleField";
import AmbientBackdrop from "@/components/layout/AmbientBackdrop";

export default function Home() {
  return (
    <LightInteractionProvider>
      <SmoothScrollProvider>
        <FramerProvider>
          <Navbar />
          <div className="relative isolate">
            <DynamicParticleField />
            <AmbientBackdrop />
            <main
              id="contenu-principal"
              className="relative z-10"
              aria-label="Contenu principal"
            >
              <Hero />
              <Services />
              <Work />
              <Contact />
            </main>
            <Footer />
          </div>
        </FramerProvider>
      </SmoothScrollProvider>
    </LightInteractionProvider>
  );
}

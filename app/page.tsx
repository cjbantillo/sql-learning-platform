import React from "react";
import Navbar from "./components/sections/navigation";
import Hero from "./components/sections/hero";
import Footer from "./components/sections/footer";
import BackToTop from "./components/ui/BackToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      <BackToTop />
    </>
  );
}

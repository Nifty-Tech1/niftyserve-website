"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import LightRays from "./LightRays";
import React from "react";

// ================= UI =================

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-6 w-full">{children}</div>;
}

function Button({ children, variant = "primary" }: any) {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-xl font-semibold transition transform active:scale-[0.98]",
        variant === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
        variant === "ghost" && "border border-white/20 hover:bg-white/10 text-white"
      )}
    >
      {children}
    </button>
  );
}

// ================= NAVBAR =================

function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/20">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold tracking-tight">NiftyServe</div>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <Button>Get Started</Button>
        </div>
      </Container>
    </div>
  );
}

// ================= HERO (APPLE-LEVEL) =================

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* ================= LIGHTRAYS LAYER (CRITICAL FIXED WRAPPER) ================= */}
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6"
          raysSpeed={0.9}
          lightSpread={0.55}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.02}
          distortion={0.08}
          pulsating={false}
          fadeDistance={1}
          saturation={1.15}
        />
      </div>

      {/* ================= DEPTH LAYER (SOFT VIGNETTE) ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/60" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-3 py-1 mb-6 text-xs border border-white/10 bg-white/5 rounded-full text-gray-300">
              Digital Systems for African Growth
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Turn Your Business Into a
              <span className="text-blue-400"> Scalable Digital System</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              NiftyServe builds high-performance websites, automation systems,
              and custom software that help businesses in Zambia operate like modern tech companies.
            </p>

            <div className="mt-8 flex gap-4">
              <Button>Start Building</Button>
              <Button variant="ghost">View Services</Button>
            </div>

            {/* subtle social proof hint */}
            <div className="mt-10 text-xs text-gray-500">
              Trusted by growing businesses in Lusaka & beyond
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

// ================= SERVICES =================

function Services() {
  const services = [
    "Website Development",
    "Business Automation",
    "Custom Software",
  ];

  return (
    <section id="services" className="py-28">
      <Container>
        <h2 className="text-3xl font-semibold mb-12">Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/30 transition"
            >
              <h3 className="text-xl font-medium mb-2">{s}</h3>
              <p className="text-gray-400 text-sm">
                Built for performance, scalability, and real-world business impact.
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ================= PROCESS =================

function Process() {
  const steps = ["Audit", "Build", "Scale"];

  return (
    <section id="process" className="py-28 border-t border-white/10">
      <Container>
        <h2 className="text-3xl font-semibold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <h3 className="text-xl font-medium">{step}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {step === "Audit" && "We analyze your systems and identify growth bottlenecks."}
                {step === "Build" && "We design and develop your digital infrastructure."}
                {step === "Scale" && "We optimize systems for long-term growth."}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ================= CTA =================

function CTA() {
  return (
    <section id="contact" className="py-28 text-center">
      <Container>
        <h2 className="text-3xl font-semibold">Ready to scale?</h2>
        <p className="text-gray-400 mt-4">
          Let’s build your digital system the right way.
        </p>
        <div className="mt-6">
          <Button>Get Started</Button>
        </div>
      </Container>
    </section>
  );
}

// ================= FOOTER =================

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} NiftyServe. Built for modern African businesses.
    </footer>
  );
}

// ================= PAGE =================

export default function Page() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}

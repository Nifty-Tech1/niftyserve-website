"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import LightRays from "./LightRays";
import React from "react";

// ================= UI =================

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-6 w-full">{children}</div>;
}

function Button({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-xl font-semibold transition active:scale-[0.98]",
        variant === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
        variant === "ghost" &&
          "border border-white/20 hover:bg-white/10 text-white",
      )}
    >
      {children}
    </button>
  );
}

// ================= NAV =================

function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/30">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold">NiftyServe</div>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Demo</a>
          </div>

          <Button>Book Demo</Button>
        </div>
      </Container>
    </div>
  );
}

// ================= HERO =================

function Hero() {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
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
          saturation={1.2}
        />
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="text-xs text-gray-400 mb-4">
              WhatsApp AI Automation Systems
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Automate WhatsApp Sales for Your Business in Zambia
            </h1>

            <p className="mt-6 text-gray-300 text-lg">
              We build AI systems that instantly respond to customers, qualify
              leads, and help businesses close more sales automatically.
            </p>

            <div className="mt-8 flex gap-4">
              <Button>Book Demo</Button>
              <Button variant="ghost">View Services</Button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Works with your existing WhatsApp Business account
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

// ================= OFFER =================

function Offer() {
  return (
    <section className="py-24 border-t border-white/10">
      <Container>
        <h2 className="text-3xl font-semibold">
          WhatsApp AI Automation Systems
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl">
          We help businesses automate customer conversations using AI so they
          never miss leads or sales opportunities again.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-10 text-sm text-gray-300">
          <div>Instant Replies</div>
          <div>Lead Qualification</div>
          <div>Auto Follow-ups</div>
          <div>24/7 Sales Assistant</div>
        </div>
      </Container>
    </section>
  );
}

// ================= SERVICES =================

function Services() {
  return (
    <section id="services" className="py-24">
      <Container>
        <h2 className="text-3xl font-semibold mb-10">Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "WhatsApp AI Automation",
            "Business Workflow Systems",
            "Custom Software Tools",
          ].map((s) => (
            <div
              key={s}
              className="p-6 border border-white/10 rounded-2xl bg-white/5"
            >
              <h3 className="font-medium">{s}</h3>
              <p className="text-gray-400 text-sm mt-2">
                Built for real business operations and measurable results.
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
  const steps = [
    ["Audit", "We analyze your customer flow and bottlenecks"],
    ["Build", "We deploy your WhatsApp AI system"],
    ["Optimize", "We improve conversions and automation flows"],
  ];

  return (
    <section id="process" className="py-24 border-t border-white/10">
      <Container>
        <h2 className="text-3xl font-semibold mb-10">Process</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(([t, d]) => (
            <div key={t} className="p-6 border border-white/10 rounded-2xl">
              <h3 className="font-medium">{t}</h3>
              <p className="text-gray-400 text-sm mt-2">{d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ================= TRUST =================

function Trust() {
  return (
    <section className="py-24 border-t border-white/10">
      <Container>
        <div className="grid md:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="font-semibold">Faster Responses</h3>
            <p className="text-gray-400 text-sm mt-2">
              Never miss a customer again
            </p>
          </div>

          <div>
            <h3 className="font-semibold">More Sales</h3>
            <p className="text-gray-400 text-sm mt-2">
              Convert chats into paying customers
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Less Work</h3>
            <p className="text-gray-400 text-sm mt-2">
              Automate repetitive conversations
            </p>
          </div>
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
        <h2 className="text-3xl font-semibold">Book a Live Demo</h2>
        <p className="text-gray-400 mt-4">
          See how your business can run on WhatsApp AI automation.
        </p>

        <div className="mt-8">
          <Button>Book Demo</Button>
        </div>
      </Container>
    </section>
  );
}

// ================= FOOTER =================

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} NiftyServe — WhatsApp AI Automation Systems
    </footer>
  );
}

// ================= PAGE =================

export default function Page() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Offer />
      <Services />
      <Process />
      <Trust />
      <CTA />
      <Footer />
    </main>
  );
}

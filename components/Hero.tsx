function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">

      {/* ================= GPU LIGHTRAYS BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={2.8}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.02}
          distortion={0.1}
          pulsating={false}
          fadeDistance={1}
          saturation={1.1}
        />
      </div>

      {/* ================= READABILITY OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ================= HERO CONTENT ================= */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl relative z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-6">
            Built for African business growth
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Turn Your Business Into a
            <span className="text-blue-400"> Scalable Digital System</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            NiftyServe builds websites, automation systems, and custom software
            that help businesses in Zambia operate smarter, faster, and at scale.
          </p>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <Button>Start Now</Button>
            <Button variant="ghost">View Services</Button>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-xs text-gray-500">
            No templates. No shortcuts. Just engineered systems.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
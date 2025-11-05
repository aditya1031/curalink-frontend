import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/img1bg.png";

const LandingPage = () => {
  const features = [
    {
      title: "AI Health Insights",
      desc: "Instant health predictions and guidance powered by AI.",
      icon: "🤖",
    },
    {
      title: "Collaborative Research",
      desc: "Share data safely to fuel new healthcare breakthroughs.",
      icon: "🔬",
    },
    {
      title: "Clinical Trial Discovery",
      desc: "Smart matching connects you with the right health trials.",
      icon: "🧬",
    },
    {
      title: "Expert Consultations",
      desc: "Talk directly with verified health experts.",
      icon: "👨‍⚕️",
    },
    {
      title: "Community Forums",
      desc: "Join a safe space to learn, share, and support others.",
      icon: "💬",
    },
    {
      title: "Privacy First",
      desc: "Your health data stays protected, always.",
      icon: "🔒",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-900">
      {/* === Blurred Background === */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Healthcare background"
          className="w-full h-full object-cover object-center opacity-100 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF6FF]/90 via-[#F8FCFF]/85 to-white/90 backdrop-blur-[2px]" />
      </div>

     {/* === SECTION 1: Hero === */}
<section className="relative flex flex-col items-center text-center px-4 pt-24 pb-24 z-10">
  <motion.h1
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-10xl sm:text-8xl font-extrabold tracking-tight text-[#0F3961] leading-tight"
  >
    Your Health, <span className="text-[#2CB2BE]">Connected</span>.
  </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto mt-8 text-xl text-gray-700"
        >
          CuraLink connects patients, doctors, and researchers — making
          healthcare simpler, smarter, and more human.
        </motion.p>

        {/* === Join Buttons === */}
        <div className="mt-10 flex gap-5 flex-wrap justify-center">
          <Link
            to="/AuthPage"
            className="bg-[#2CB2BE] hover:bg-[#26a6b1] text-white px-10 py-4 rounded-full font-semibold shadow-md transition-transform hover:scale-105"
          >
            Join as Patient
          </Link>
          <Link
            to="/AuthPage"
            className="border-2 border-[#2CB2BE] text-[#2CB2BE] hover:bg-[#2CB2BE] hover:text-white px-10 py-4 rounded-full font-semibold transition-transform hover:scale-105"
          >
            Join as Researcher
          </Link>
        </div>

        {/* === Quick Stats === */}
        <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-10">
          <div>
            <h3 className="text-4xl font-bold text-[#2CB2BE]">5K+</h3>
            <p className="text-gray-700 font-medium">Clinical Trials</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#2CB2BE]">2K+</h3>
            <p className="text-gray-700 font-medium">Health Experts</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#2CB2BE]">50K+</h3>
            <p className="text-gray-700 font-medium">Active Members</p>
          </div>
        </div>

        {/* === Highlighted Features === */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 p-6 rounded-2xl shadow-md border border-gray-100 backdrop-blur-sm hover:-translate-y-1 transition-all"
          >
            <h4 className="text-xl font-semibold text-[#0F3961] mb-1">
              Clinical Trial Match
            </h4>
            <p className="text-gray-600 text-sm">
              Personalized recommendations based on your profile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/80 p-6 rounded-2xl shadow-md border border-gray-100 backdrop-blur-sm hover:-translate-y-1 transition-all"
          >
            <h4 className="text-xl font-semibold text-[#0F3961] mb-1">
              Expert Connection
            </h4>
            <p className="text-gray-600 text-sm">
              Direct access to top verified professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === SECTION 2: Why Choose CuraLink === */}
      <section className="relative text-center py-20 z-10">
        <h1 className="text-7xl sm:text-5xl font-bold text-[#0F3961] mb-6">
          Why Choose CuraLink?
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-14">
          Because health should be empowering, not confusing.  
          We simplify access, protect privacy, and connect you to better care.
        </p>

     <div className="max-w-6xl mx-auto px-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
  {features.map((f, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      viewport={{ once: true }}
      className="bg-white/80 rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 backdrop-blur-sm"
    >
      <div className="text-4xl mb-2">{f.icon}</div>
      <h3 className="text-xl font-semibold text-[#0F3961] mb-2">
        {f.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
    </motion.div>
  ))}
</div>

      </section>

      {/* === SECTION 3: Final CTA === */}
      <section className="relative flex flex-col items-center text-center px-6 pb-28 z-10">
  <motion.h2
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl sm:text-5xl font-bold text-[#0F3961] mb-5"
  >
    Ready to Experience Smarter Healthcare?
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-gray-600 text-lg sm:text-xl max-w-2xl mb-10"
  >
    Join a community where patients, experts, and researchers collaborate to make healthcare faster, smarter, and more connected.
  </motion.p>

  <div className="flex gap-5 flex-wrap justify-center">
    <Link
      to="/AuthPage"
      className="bg-[#2CB2BE] hover:bg-[#26a6b1] text-white px-10 py-4 rounded-full font-semibold shadow-md transition-transform hover:scale-105"
    >
      Get Started 
    </Link>
    <Link
      to="/about"
      className="border-2 border-[#2CB2BE] text-[#2CB2BE] hover:bg-[#2CB2BE] hover:text-white px-10 py-4 rounded-full font-semibold transition-transform hover:scale-105"
    >
      Learn More
    </Link>
  </div>
</section>

    </div>
  );
};

export default LandingPage;

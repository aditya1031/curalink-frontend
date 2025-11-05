import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaLightbulb, FaUsers, FaRobot } from "react-icons/fa";

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white py-16 px-6 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-5xl font-bold text-[#0F3961] text-center mb-6"
        >
          About <span className="text-[#2CB2BE]">CuraLink</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-gray-700 text-center max-w-3xl mx-auto text-lg mb-12"
        >
          CuraLink bridges the gap between <strong>patients</strong> and
          <strong> clinical researchers</strong> by building a transparent and
          intelligent ecosystem. Our mission is to make medical research more
          accessible, efficient, and patient-driven through AI-powered matching
          and community collaboration.
        </motion.p>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-16"
        >
          <h2 className="text-3xl font-semibold text-[#0F3961] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At CuraLink, our mission is to accelerate medical breakthroughs by
            simplifying how patients and researchers connect. We empower
            patients to explore clinical trials safely and confidently while
            helping researchers find qualified participants faster through
            precision AI matching.  
            <br />
            <br />
            Our vision is a world where innovation and care go hand in hand —
            where every patient’s journey contributes to advancing global
            health.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="text-3xl font-semibold text-[#0F3961] text-center mb-10"
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <FaHeartbeat className="text-3xl text-[#2CB2BE]" />,
              title: "Patient-Centric",
              desc: "We prioritize safety, privacy, and empowerment in every decision we make, ensuring that patients always remain at the heart of CuraLink.",
            },
            {
              icon: <FaRobot className="text-3xl text-[#2CB2BE]" />,
              title: "Precision Matching",
              desc: "Our intelligent AI engine analyzes data to perfectly connect patients with trials suited to their medical and personal profiles.",
            },
            {
              icon: <FaUsers className="text-3xl text-[#2CB2BE]" />,
              title: "Community Driven",
              desc: "We build a supportive space for patients, doctors, and researchers to collaborate and share insights that drive real-world impact.",
            },
            {
              icon: <FaLightbulb className="text-3xl text-[#2CB2BE]" />,
              title: "Innovation",
              desc: "CuraLink constantly evolves with new technology, enhancing efficiency and trust in medical research through intelligent automation.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 4}
              className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#0F3961] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={8}
          className="bg-[#2CB2BE] text-white rounded-2xl py-10 px-6 flex flex-wrap justify-around items-center text-center"
        >
          <div className="flex flex-col m-4">
            <span className="text-4xl font-bold">500+</span>
            <span className="text-lg opacity-90">Active Trials</span>
          </div>
          <div className="flex flex-col m-4">
            <span className="text-4xl font-bold">10K+</span>
            <span className="text-lg opacity-90">Registered Patients</span>
          </div>
          <div className="flex flex-col m-4">
            <span className="text-4xl font-bold">2K+</span>
            <span className="text-lg opacity-90">Researchers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

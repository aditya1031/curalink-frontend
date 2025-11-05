import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#2CB2BE] focus:border-transparent shadow-sm transition";

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#EAF6FF] to-white py-16 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-5xl border border-gray-100 grid md:grid-cols-2 gap-12"
      >
        {/* LEFT SIDE - CONTACT INFO */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-[#0F3961]">Get in Touch</h2>
          <p className="text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#2CB2BE] text-xl" />
              <p>
                <span className="font-semibold">Email:</span> support@curalink.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#2CB2BE] text-xl" />
              <p>
                <span className="font-semibold">Phone:</span> +1 (234) 567-8900
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#2CB2BE] text-xl mt-1" />
              <p>
                <span className="font-semibold">Address:</span> <br />
                123 Medical Plaza <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div>
          {sent ? (
            <p className="text-green-600 text-center font-semibold mt-10">
              ✅ Message sent successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className={inputStyle}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2CB2BE] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#26a6b1] transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

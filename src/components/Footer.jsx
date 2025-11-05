import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* === Brand Section === */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">CuraLink</h3>
          <p className="text-sm leading-relaxed">
            Connecting patients and researchers with innovation in healthcare.
          </p>
        </div>

        {/* === Product Section === */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#2CB2BE]">Features</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Pricing</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Security</a></li>
          </ul>
        </div>

        {/* === Company Section === */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#2CB2BE]">About</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Blog</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Careers</a></li>
          </ul>
        </div>

        {/* === Legal Section === */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#2CB2BE]">Privacy</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Terms</a></li>
            <li><a href="#" className="hover:text-[#2CB2BE]">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* === Bottom Bar === */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center flex flex-col md:flex-row items-center justify-between px-6 max-w-6xl mx-auto">
        <p className="text-sm">© 2025 CuraLink. All rights reserved.</p>
        <div className="flex space-x-5 mt-3 md:mt-0 text-lg">
          <a
            href="mailto:adityasingh1031@gmail.com"
            className="hover:text-[#2CB2BE]"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-kumar-589768195/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2CB2BE]"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/aditya1031"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2CB2BE]"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

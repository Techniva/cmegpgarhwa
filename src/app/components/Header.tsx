"use client";

import React, { useState } from "react";
import { Menu, X, UserCog } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

type Translation = {
  govt: string;
  login: string;
  navLinks: NavLink[];
};

const translations: Record<"en" | "hi", Translation> = {
  en: {
    govt: "GOVERNMENT OF JHARKHAND",
    login: "Employee Login",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Activities", href: "/activities" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  hi: {
    govt: "झारखंड सरकार",
    login: "कर्मचारी लॉगिन",
    navLinks: [
      { label: "होम", href: "/" },
      { label: "गतिविधियाँ", href: "/activities" },
      { label: "संपर्क करें", href: "/contact" },
    ],
  },
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const t = translations[lang];

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-600 to-lime-500 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-1">
          <span>{t.govt}</span>
          <div className="flex items-center space-x-4">
            <a href="/CMEGP-Garhwa/login" className="hover:underline">
              {t.login}
            </a>
            <select
              className="appearance-none bg-green-600 text-white text-xs font-medium px-3 py-1.5 pr-8 rounded-md shadow-md cursor-pointer border border-green-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
              value={lang}
              onChange={(e) => setLang(e.target.value as "en" | "hi")}
            >
              <option value="en" className="text-black">English</option>
              <option value="hi" className="text-black">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/Jharkhand_Rajakiya_Chihna.svg"
              alt="Jharkhand State Emblem"
              className="h-12 w-auto"
            />
            <span className="text-3xl font-semibold text-gray-800">
              CMEGP Garhwa
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {t.navLinks.map((link) => (
              <a key={link.href + link.label} href={link.href} className="hover:text-[#0c4da2]">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full border-2 border-pink-500 flex items-center justify-center cursor-pointer">
              <UserCog className="w-4 h-4 text-gray-700" />
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-40
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col px-6 space-y-4 mt-4">
            {t.navLinks.map((link) => (
              <a key={link.href + link.label} href={link.href} className="text-gray-800 font-medium hover:text-[#0c4da2]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HeroSection: React.FC = () => {
  return (
    <section className="relative mt-24 h-[75vh] flex flex-col items-center justify-center text-center
      bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-700 overflow-hidden">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'Times New Roman, serif' }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          CMEGP <span className="text-yellow-400 dark:text-yellow-300">Loan Assistance</span>
        </motion.h1>

        <motion.p
          className="text-md md:text-lg lg:text-xl text-gray-100 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          Empowering entrepreneurs and small businesses in Garhwa with financial support under 
          the Chief Minister’s Employment Generation Programme.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold 
            hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg 
            dark:bg-yellow-500 dark:hover:bg-yellow-400">
            Apply for Loan
          </button>

          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold 
            hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 shadow-lg 
            dark:border-gray-300 dark:hover:bg-gray-200 dark:hover:text-gray-900">
            Check Eligibility
          </button>
        </motion.div>
      </motion.div>

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-30 animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan-400 rounded-full opacity-20 animate-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Decorative floating wave */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(255,255,255,0.2)" fillOpacity="0.4" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,165.3C672,149,768,139,864,160C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection

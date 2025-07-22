"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar/navbar";
import Link from "next/link";

export function HeroSectionOne() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <Navbar />

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/06/15/166654-836903014_large.mp4"
            type="video/mp4"
          />
          {/* Fallback AI video */}
          <source
            src="https://cdn.pixabay.com/video/2023/04/25/158832-822748090_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/75" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/90" />
      </div>

      {/* Animated particles/dots */}
      <div className="absolute inset-0 z-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 pb-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 shadow-lg">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-blue-500 rounded-full mr-3"
              />
              The Future is Here
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 mb-6 leading-tight"
          >
            AI-Powered
            <br />
            <motion.span 
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Innovation
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Experience cutting-edge artificial intelligence that transforms the
            way you work, create, and innovate. Join thousands of professionals
            who are already leveraging AI to unlock their potential.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/product" passHref>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl cursor-pointer overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 text-lg">Start Your AI Journey</span>
              </motion.div>
            </Link>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgb(59, 130, 246)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-gray-400 text-gray-700 font-bold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-lg"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <motion.div 
                className="text-3xl font-bold text-blue-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                10,000+
              </motion.div>
              <div className="text-gray-600 font-medium">Professionals</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-3xl font-bold text-purple-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                99%
              </motion.div>
              <div className="text-gray-600 font-medium">Satisfaction</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-3xl font-bold text-indigo-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                24/7
              </motion.div>
              <div className="text-gray-600 font-medium">AI Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements - Enhanced AI Theme */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-25 blur-2xl"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl opacity-20 blur-lg"
      />

      {/* Additional floating elements for more wow factor */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, -10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-3/4 left-1/4 w-28 h-28 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-2xl opacity-15 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 12, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-lg"
      />
    </div>
  );
}

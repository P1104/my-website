"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Zap, ArrowRight, Play } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function HeroSectionOne() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setParticlesInit(true);
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated background elements - Same as hero-section-two */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Particles Background */}
      {particlesInit && (
        <div className="absolute inset-0 w-full h-full">
          <Particles
            id="hero-particles"
            className="w-full h-full"
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fullScreen: {
                enable: false,
                zIndex: 1,
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: false,
                    mode: "repulse",
                  },
                  resize: {
                    enable: true,
                  },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#6366f1",
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  random: false,
                  speed: {
                    min: 0.1,
                    max: 1,
                  },
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    width: 800,
                    height: 600,
                  },
                  value: 80,
                },
                opacity: {
                  value: {
                    min: 0.1,
                    max: 0.5,
                  },
                  animation: {
                    enable: true,
                    speed: 0.8,
                    sync: false,
                  },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: {
                    min: 0.3,
                    max: 1.5,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex items-start pt-20">
        <motion.div
          className="relative z-10 container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Content */}
          <motion.div
            className="lg:text-left text-center"
            variants={containerVariants}
          >
            <motion.div className="mb-6" variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen AI Technology</span>
                <Zap className="w-4 h-4" />
              </span>
            </motion.div>
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
              variants={itemVariants}
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                DEMOCRATIZING
              </span>
              <motion.span
                className="block text-gray-900 mt-2"
                style={{
                  transform: `perspective(1000px) rotateX(${
                    mousePosition.y * 0.1
                  }deg) rotateY(${mousePosition.x * 0.1}deg)`,
                }}
                whileHover={{ scale: 1.05 }}
              >
                TECHNOLOGY
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              by breaking all tech barriers with AI.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-12"
              variants={itemVariants}
            >
              <Link href="/product">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg"
                >
                  Explore
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-3 shadow-md text-lg"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Spline 3D Model */}
          {/* Right Content - Spline 3D Model (Perfect Circle) */}
          <motion.div
            className="lg:pl-12 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-[400px] h-[400px] mx-auto">
              {" "}
              {/* Fixed equal width & height */}
              {/* Background glow with border blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-white/10 to-purple-100/20 rounded-full blur-3xl scale-110" />
              <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full blur-sm" />
              {/* Spline 3D Scene (Circular Container) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: isSplineLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full h-full rounded-full overflow-hidden"
              >
                {!isSplineLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-full">
                    <div className="animate-pulse text-gray-500">
                      Loading 3D model...
                    </div>
                  </div>
                )}
                <Spline
                  scene="/models/voice-ai.splinecode"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    opacity: isSplineLoaded ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    borderRadius: "50%", // Force circular clipping
                  }}
                  onLoad={() => setIsSplineLoaded(true)}
                  onError={(error) => {
                    console.error("Spline error:", error);
                    setIsSplineLoaded(false);
                  }}
                />
              </motion.div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-purple-300/40 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
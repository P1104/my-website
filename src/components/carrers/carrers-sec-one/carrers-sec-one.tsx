"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

const StarsBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    animationDelay: Math.random() * 3,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const CarrerSecOne = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const floatingAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className=" bg-white text-gray-900 relative overflow-hidden pt-20">
       <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <StarsBackground className="opacity-30" />
      <section className="relative py-24 overflow-hidden px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* <motion.div variants={fadeInUp}>
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 backdrop-blur-sm mb-6"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.4)",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-blue-500" />
                </motion.div>
                <span className="text-sm font-medium text-gray-700">
                  We&apos;re hiring
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.div>
            </motion.div> */}
            
            <motion.div variants={floatingAnimation}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Build the future with us. We&apos;re looking for passionate
              individuals who want to make a difference in the world of
              technology.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
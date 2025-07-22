"use client";

import React from "react";
import { motion } from "framer-motion";
import {Sparkles} from "@/components/ui/sparkles";

export const UseCasesSecOne = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="bg-white text-gray-900 relative overflow-hidden pt-10">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
      <Sparkles
        background="transparent"
        minSize={0.3}
        maxSize={0.8}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
        className="opacity-70"
      />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        
        <motion.div
          className="container mx-auto px-4 py-16 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            AI Solutions
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl text-gray-600 mb-6"
            variants={itemVariants}
          >
            Industry-Specific AI Applications
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover how our AI-powered solutions transform industries through intelligent automation, predictive analytics, and conversational interfaces.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};


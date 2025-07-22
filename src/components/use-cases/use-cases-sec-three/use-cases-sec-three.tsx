"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

export const UseCasesSecThree = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
  <div className="relative bg-white text-gray-900 overflow-hidden py-16 px-4">
    {/* Sparkles Background */}
    <div className="absolute inset-0 z-0">
      <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
        className="opacity-70"
      />
    </div>

    {/* Foreground Content */}
    <div className="relative z-10 container mx-auto">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8 md:p-12"
          variants={cardVariants}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-semibold mb-4 text-black"
            variants={itemVariants}
          >
            Want to learn more?
          </motion.h3>

          <motion.p 
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Contact us to discuss how our AI solutions can transform your business.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

};


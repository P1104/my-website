"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";


export const UseCasesSecThree = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants:Variants = {
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
   
      <div className="relative text-gray-900 overflow-hidden py-16 px-4">
        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <Sparkles
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={50}
            particleColor="#3b82f6"
            speed={0.5}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 container mx-auto">
          <motion.div
            ref={containerRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div
              className="border border-gray-200 rounded-lg p-8 md:p-12 bg-white shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-semibold mb-4"
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

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

  );
};
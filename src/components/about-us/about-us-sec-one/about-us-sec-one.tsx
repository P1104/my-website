"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Calendar, MapPin } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

interface AboutSectionProps {
  companyName?: string;
  tagline?: string;
  description?: string;
  foundedYear?: string;
  headquarters?: string;
  specialization?: string;
  story?: string;
}

export const AboutSectionOne: React.FC<AboutSectionProps> = ({
  companyName = "Equilibrate",
  tagline = "Making AI practical for the business world.",
  description = "At Equilibrate.AI we are committed to bring the AI revolution to the most popular business tools.",
  foundedYear = "2024",
  headquarters = "Bangalore",
  specialization = "AI Specialists",
  story = "Equilibrate.AI came into existence when the founders saw the whole world overwhelmed by rapid AI growth and development. Many businesses want to integrate AI into their workflows but are not sure where to start and clueless about the effort. The core principle is to democratise existing tech with the use of AI. Determined to make AI more approachable in business settings, Equilibrate.AI is on the journey to build feature-rich, easy-to-use and cutting edge AI products and solutions. AI is here to make our lives better, so let us embrace it in the right way.",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Hero Content */}
      <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <div className="relative z-10 flex items-center justify-center pt-24">
        <motion.div
          className="max-w-6xl mx-auto px-6  w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h1
              className="text-5xl font-bold mb-4  bg-clip-text text-black"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About {companyName}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {tagline}
            </motion.p>
            <motion.p
              className="text-lg text-gray-500 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
          >
            {[
              {
                icon: (
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                ),
                title: "Founded",
                value: foundedYear,
              },
              {
                icon: (
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-green-500" />
                ),
                title: "Headquartered in",
                value: headquarters,
              },
              {
                icon: (
                  <Users className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                ),
                title: specialization,
                value: "Expert Team",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-6 text-center border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  {stat.icon}
                  <h3 className="font-semibold text-lg mb-1 text-black">
                    {stat.title}
                  </h3>
                  <p className="text-gray-500">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Our Story Section */}
          <motion.div className="mb-16" variants={itemVariants}>
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our Story
            </motion.h2>
            <motion.div variants={cardVariants}>
              <Card className="p-8 border-gray-200 bg-white">
                <p className="text-lg leading-relaxed text-gray-600">{story}</p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-60 blur-xl"
      />
    </div>
  );
};

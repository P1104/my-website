"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Target, CheckCircle, Lightbulb, Shield, Leaf, Award } from 'lucide-react';
import { Sparkles } from '@/components/ui/sparkles';

interface CoreValue {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ValuesSectionProps {
  coreValues?: CoreValue[];
}

export const AboutSectionThree: React.FC<ValuesSectionProps> = ({
  coreValues = [
    {
      title: "Quality",
      description: "We want our products of the finest quality and we will never launch any product of inferior quality.",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Easy-to-use",
      description: "All our products will be plug-n-play and have no training required to use them.",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: "Future-proof",
      description: "Regular updates to keep the products up to date and embrace new technologies.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Excellence",
      description: "Delivering exceptional quality and measurable results that exceed expectations.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Accountability",
      description: "Taking ownership of our commitments and delivering on our promises with reliability.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Sustainability",
      description: "Creating solutions that contribute to a greener, more sustainable future for all.",
      icon: <Leaf className="w-6 h-6" />
    }
  ]
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "backOut"
      }
    })
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <div className="relative z-10 flex items-center justify-center pt-4 pb-12">
        <motion.div 
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4 text-center text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At Equilibrate, we believe that true transformation is driven by a foundation of strong, unwavering values.
            </motion.p>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {coreValues.map((value, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  className="h-full" // Ensure the motion div takes full height
                >
                  <Card className="h-full p-6 border-gray-200 bg-white hover:shadow-lg transition-shadow flex flex-col">
                    <div className="flex items-start space-x-4 flex-grow">
                      <motion.div 
                        className="flex-shrink-0 p-2 bg-blue-100 rounded-lg"
                        whileHover={{ rotate: 10 }}
                      >
                        <div className="text-blue-600">
                          {value.icon}
                        </div>
                      </motion.div>
                      <div className="flex flex-col h-full">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">{value.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
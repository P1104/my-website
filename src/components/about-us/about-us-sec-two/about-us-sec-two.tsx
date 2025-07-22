"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from '@/components/ui/sparkles';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

export const AboutSectionTwo: React.FC<TeamSectionProps> = ({
  teamMembers = [
    {
      name: "Shrinivas Navali",
      role: "Advisor",
      description: "IT Veteran with over 30 years experience in delivering software products and services."
    },
    {
      name: "Anish Navali",
      role: "Founder",
      description: "Tech enthusiast focused on building GenAI products."
    },
    {
      name: "Gagandeep H S",
      role: "Founding member",
      description: "AI and Frontend technologies specialist."
    }
  ]
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "backOut"
      }
    })
  };

  return (
    <div className="relative bg-white overflow-hidden py-16">
      <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <div className="relative z-10 flex items-center justify-center">
        <motion.div 
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              THE TEAM
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="h-full" // Ensure container takes full height
                >
                  <Card className="h-full p-6 border-gray-200 bg-white hover:shadow-lg transition-shadow flex flex-col">
                    <div className="text-center flex flex-col items-center flex-grow">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white font-bold text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </motion.div>
                      <h3 className="font-bold text-lg mb-1 text-black">{member.name}</h3>
                      <Badge variant="secondary" className="mb-3 text-black">
                        {member.role}
                      </Badge>
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                        {member.description}
                      </p>
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
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 blur-lg"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-60 blur-lg"
      />
    </div>
  );
};
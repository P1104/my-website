"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  Factory,
  Heart,
  Zap,
  Battery,
  Settings,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { Sparkles } from "@/components/ui/sparkles";

export const UseCasesSectionTwo = () => {
  const useCases = [
    {
      id: "1",
      title: "Dynamic Process Intelligence for Modern Manufacturers",
      category: "Manufacturing",
      readTime: "5 min read",
      description:
        "AI-powered process intelligence and knowledge automation that drives yield, quality, and margin optimization for advanced manufacturers.",
      icon: <Factory className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Optimizing Hospital Performance with AI & ML",
      category: "Healthcare",
      readTime: "7 min read",
      description:
        "AI-powered knowledge and analytics platform that reduces hospital readmissions and equipment downtime, improving care quality and operational efficiency.",
      icon: <Heart className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "3",
      title: "Faster Quality Decisions with Conversational AI",
      category: "Quality Control",
      readTime: "6 min read",
      description:
        "Empower quality teams to query specifications, process parameters, and inspection criteria—cutting down search time and improving compliance.",
      icon: <Zap className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "4",
      title: "Battery Health Analytics & Predictive Maintenance",
      category: "Energy",
      readTime: "8 min read",
      description:
        "Battery-operated systems often face hidden performance degradation that traditional monitoring fails to catch early. Capacity fade, abnormal discharge patterns, or remaining useful life—especially when ...",
      icon: <Battery className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "5",
      title: "AI-Powered Knowledge Access for Process Precision",
      category: "Process Engineering",
      readTime: "5 min read",
      description:
        "Transforming disconnected SOPs, technical docs, and drawings into a conversational AI system for real-time, accurate process engineering support.",
      icon: <Settings className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "6",
      title: "Data-Driven Plant Optimization",
      category: "Analytics",
      readTime: "6 min read",
      description:
        "Dataraft empowers Plant Heads to unify production data, predict bottlenecks, and optimize energy use-enabling faster, data-driven decisions and measurable cost savings.",
      icon: <BarChart3 className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80",
    },
  ];

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
       <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Featured Use Cases
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Explore our industry-specific AI applications
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              variants={itemVariants}
              custom={index}
              whileHover="hover"
            >
              <motion.div variants={cardVariants} className="h-full">
                <Card className="h-full overflow-hidden transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    <Badge className="absolute bottom-4 left-4 bg-white text-gray-800 shadow-sm">
                      {useCase.category}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {useCase.readTime}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {useCase.description}
                    </CardDescription>

                    <Button
                      variant="link"
                      className="px-0 text-blue-600 hover:text-blue-800 group"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import React, { useId, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
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

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

// Memoized Sparkles component to prevent re-initialization
const Sparkles = React.memo((props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (isInitializing) return;

    setIsInitializing(true);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      setIsInitializing(false);
    });
  }, [isInitializing]);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      });
    }
  };

  const generatedId = useId();

  // Simplified particle configuration for better performance
  const particleOptions = {
    background: {
      color: {
        value: background || "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 60, // Reduced from 120
    interactivity: {
      events: {
        onClick: {
          enable: false, // Disabled for performance
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
    },
    particles: {
      color: {
        value: particleColor || "#6366f1",
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: false,
        speed: {
          min: 0.1,
          max: speed || 0.5, // Reduced speed
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 800,
          height: 600,
        },
        value: particleDensity || 30, // Reduced particle count
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.3, // Reduced opacity
        },
        animation: {
          enable: true,
          speed: speed || 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize || 1,
          max: maxSize || 2, // Reduced size
        },
      },
    },
    detectRetina: true,
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={particleOptions}
        />
      )}
    </motion.div>
  );
});

Sparkles.displayName = "Sparkles";

interface UseCase {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

// Optimized Card Component similar to ProductCard
const UseCaseCard = React.memo(
  ({ useCase, index }: { useCase: UseCase; index: number }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-full bg-white overflow-hidden transition-all duration-300 border border-gray-200 hover:border-indigo-300 hover:shadow-lg relative group">
          <motion.div
            className="relative h-48 overflow-hidden"
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              width={100}
              height={100}
              src={useCase.image}
              alt={useCase.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-4"
            >
              <Badge className="text-gray-800 shadow-sm bg-white/90">
                {useCase.category}
              </Badge>
            </motion.div>
          </motion.div>

          <CardHeader className="pb-3">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              {useCase.readTime}
            </div>
            <motion.div whileHover={{ scale: 1.02, x: 4 }}>
              <CardTitle className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {useCase.title}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div whileHover={{ scale: 1.01 }}>
              <CardDescription className="text-gray-600 mb-4">
                {useCase.description}
              </CardDescription>
            </motion.div>

            <motion.div whileHover={{ x: 6 }}>
              <Button
                variant="link"
                className="px-0 text-indigo-600 hover:text-indigo-800 group"
              >
                Read more
                <motion.div
                  whileHover={{ rotate: -45, x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

UseCaseCard.displayName = "UseCaseCard";

export const UseCasesSectionTwo = () => {
  const [particlesReady, setParticlesReady] = useState(false);
  const detailRef = useRef(null);
  const isDetailInView = useInView(detailRef, { once: true, amount: 0.2 });

  // Optimize particles loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setParticlesReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const useCases = [
    {
      id: "1",
      title: "Dynamic Process Intelligence for Modern Manufacturers",
      category: "Manufacturing",
      readTime: "5 min read",
      description:
        "AI-powered process intelligence and knowledge automation that drives yield, quality, and margin optimization for advanced manufacturers.",
      icon: <Factory className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecaseone.jpeg",
    },
    {
      id: "2",
      title: "Optimizing Hospital Performance with AI & ML",
      category: "Healthcare",
      readTime: "7 min read",
      description:
        "AI-powered knowledge and analytics platform that reduces hospital readmissions and equipment downtime, improving care quality and operational efficiency.",
      icon: <Heart className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasetwo.jpeg",
    },
    {
      id: "3",
      title: "Faster Quality Decisions with Conversational AI",
      category: "Quality Control",
      readTime: "6 min read",
      description:
        "Empower quality teams to query specifications, process parameters, and inspection criteria—cutting down search time and improving compliance.",
      icon: <Zap className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasefour.jpeg",
    },
    {
      id: "4",
      title: "Battery Health Analytics & Predictive Maintenance",
      category: "Energy",
      readTime: "8 min read",
      description:
        "Battery-operated systems often face hidden performance degradation that traditional monitoring fails to catch early. Capacity fade, abnormal discharge patterns, or remaining useful life—especially when ...",
      icon: <Battery className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasefive.jpeg",
    },
    {
      id: "5",
      title: "AI-Powered Knowledge Access for Process Precision",
      category: "Process Engineering",
      readTime: "5 min read",
      description:
        "Transforming disconnected SOPs, technical docs, and drawings into a conversational AI system for real-time, accurate process engineering support.",
      icon: <Settings className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasesix.jpeg",
    },
    {
      id: "6",
      title: "Data-Driven Plant Optimization",
      category: "Analytics",
      readTime: "6 min read",
      description:
        "Dataraft empowers Plant Heads to unify production data, predict bottlenecks, and optimize energy use-enabling faster, data-driven decisions and measurable cost savings.",
      icon: <BarChart3 className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecaseseven.jpeg",
    },
  ];

  return (
    <div className="text-gray-900 relative overflow-hidden">
      {/* Optimized Sparkles Background */}
      {particlesReady && (
        <div className="absolute inset-0 w-full h-full">
          <Sparkles
            background="transparent"
            minSize={0.5}
            maxSize={1}
            particleDensity={25}
            particleColor="#6366f1"
            speed={0.3}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Use Cases Overview */}
        <section className="py-16 px-6" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Use Cases
              </h2>
              <p className="text-xl text-gray-600">
                Explore our industry-specific AI applications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {useCases.map((useCase, index) => (
                <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
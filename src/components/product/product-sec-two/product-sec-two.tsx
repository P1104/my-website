"use client";
import React, { useId, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Globe, ArrowRight } from "lucide-react";
import { Bot, BarChart3, Headphones } from "lucide-react";

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

// Memoized Sparkles component
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
    fpsLimit: 60,
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
          max: speed || 1,
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 400,
          height: 400,
        },
        value: particleDensity || 80,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          enable: true,
          speed: speed || 4,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize || 1,
          max: maxSize || 3,
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

// Floating elements animation from product-sec-one
const FloatingElements = () => {
  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none ">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: i * 0.8 }}
        />
      ))}
    </div>
  );
};

// Magnetic effect component from product-sec-one
const MagneticZap = () => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.1,
          transition: { duration: 0.3 }
        }
      }}
    >
      <motion.div
        variants={{
          hover: {
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.6 }
          }
        }}
      >
        <Zap className="w-8 h-8 text-indigo-500" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-0"
        variants={{
          hover: {
            opacity: 0.4,
            scale: 1.5,
            transition: { duration: 0.3 }
          }
        }}
      />
    </motion.div>
  );
};

interface ProductSuite {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  detailedDescription: string;
}

const productSuites: ProductSuite[] = [
  {
    id: "chatbot",
    title: "ChatBot JS",
    description:
      "Customizable AI chatbot designed for seamless website integration.",
    detailedDescription:
      "Enhance your website with a simple and easy-to-integrate AI assistant.",
    icon: <Bot className="w-6 h-6" />,
    features: [
      "AI Bot Integration for Websites",
      "Knowledge Base Creation",
      "Custom Prompt Templates",
      "Support for Multiple AI Models",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "analytics",
    title: "Adro",
    description: "A comprehensive analytics platform for actionable insights.",
    detailedDescription:
      "Transform your data into powerful insights with our advanced analytics platform.",
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      "Real-time Data Processing",
      "Advanced Visualization",
      "Predictive Analytics",
      "Custom Dashboard Creation",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "customer-service",
    title: "Customer Service",
    description:
      "Cloud-based manufacturing intelligence powered by digital forms.",
    detailedDescription:
      "Deliver exceptional customer support with our comprehensive service platform.",
    icon: <Headphones className="w-6 h-6" />,
    features: [
      "Omnichannel Support",
      "Automated Ticket Routing",
      "Performance Analytics",
      "Integration Capabilities",
    ],
    color: "from-green-500 to-emerald-500",
  },
];

// Optimized Card Component
const ProductCard = React.memo(
  ({
    suite,
    index,
    isSelected,
    onClick,
  }: {
    suite: ProductSuite;
    index: number;
    isSelected: boolean;
    onClick: () => void;
  }) => {
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
        <Card
          className={cn(
            "cursor-pointer transition-all duration-300 border-4 overflow-hidden relative group h-full",
            isSelected
              ? "border-indigo-500 bg-indigo-50 shadow-lg"
              : "border-gray-400 hover:border-indigo-300 hover:shadow-md"
          )}
          onClick={onClick}
        >
          <CardHeader className="text-center relative z-10">
            <motion.div
              className={cn(
                "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white",
                "bg-gradient-to-r",
                suite.color
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {suite.icon}
            </motion.div>

            <h3 className="text-xl font-semibold mb-2">{suite.title}</h3>
            <p className="text-gray-600">{suite.description}</p>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="w-6 h-6 text-indigo-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

// Optimized Feature List
const FeatureList = React.memo(({ features }: { features: string[] }) => {
  return (
    <motion.ul
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, staggerChildren: 0.05 }}
    >
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
});

FeatureList.displayName = "FeatureList";

export function ProductSecTwo() {
  const [selectedSuite, setSelectedSuite] = useState<ProductSuite>(
    productSuites[0]
  );
  const detailRef = useRef(null);
  const heroRef = useRef(null);
  const isDetailInView = useInView(detailRef, { once: true, amount: 0.2 });
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Subtitle animation with magnetic effect from product-sec-one
  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="text-gray-900 relative overflow-hidden pt-14">
      {/* Enhanced Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Sparkles
          background="transparent"
          minSize={0.3}
          maxSize={1.5}
          particleDensity={80}
          particleColor="#6366f1"
          speed={0.8}
        />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              {/* Subtitle with magnetic hover effect */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-8"
                variants={subtitleVariants}
                whileHover="hover"
              >
                <motion.span 
                  className="text-2xl md:text-3xl text-gray-600"
                  whileHover={{ 
                    color: "#4f46e5",
                    transition: { duration: 0.3 }
                  }}
                >
                  Power It with
                </motion.span>
                <div className="flex items-center gap-2">
                  <MagneticZap />
                  <motion.span 
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-black relative"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    Equilibrate.AI
                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 2 }}
                    />
                  </motion.span>
                </div>
              </motion.div>

              {/* Call to action with ripple effect */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="mt-12"
              >
                {/* Additional content can be added here */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Product Suites Overview */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Product Suites
              </h2>
              <p className="text-xl text-gray-600">
                Choose a product suite to explore its capabilities and
                components
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {productSuites.map((suite, index) => (
                <ProductCard
                  key={suite.id}
                  suite={suite}
                  index={index}
                  isSelected={selectedSuite.id === suite.id}
                  onClick={() => setSelectedSuite(suite)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Product View */}
        <section className="py-16 px-6" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSuite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left Content */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-white",
                        "bg-gradient-to-r",
                        selectedSuite.color
                      )}
                    >
                      {selectedSuite.icon}
                    </div>
                    <h2 className="text-3xl font-bold">
                      {selectedSuite.title}
                    </h2>
                  </div>

                  <p className="text-xl text-gray-600 mb-8">
                    {selectedSuite.description}
                  </p>

                  <p className="text-lg mb-8">
                    {selectedSuite.detailedDescription}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                      Key Features:
                    </h3>
                    <FeatureList features={selectedSuite.features} />
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                      Why Choose {selectedSuite.title}?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Zap className="w-4 h-4 text-indigo-500" />
                        <span>Easy Integration</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <span>Cross-Framework Compatibility</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-indigo-500" />
                        <span>Fully Customizable</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                    >
                      View Suite
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-indigo-500 text-indigo-600 bg-indigo-50"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                {/* Right Content - Stats Card */}
                <div className="relative">
                  <Card className="p-8 border-4 border-indigo-200">
                    <div className="text-center">
                      <div
                        className={cn(
                          "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white",
                          "bg-gradient-to-r",
                          selectedSuite.color
                        )}
                      >
                        {React.cloneElement(
                          selectedSuite.icon as React.ReactElement<{
                            className?: string;
                          }>,
                          { className: "w-12 h-12" }
                        )}
                      </div>

                      <h3 className="text-2xl font-bold mb-4">
                        {selectedSuite.title}
                      </h3>

                      <p className="text-gray-600 mb-6">
                        Experience the power of{" "}
                        {selectedSuite.title.toLowerCase()} with our
                        comprehensive solution.
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {[
                          { label: "Uptime", value: "99.9%" },
                          { label: "Support", value: "24/7" },
                          { label: "Ready", value: "API" },
                          { label: "Native", value: "Cloud" },
                        ].map((stat, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-100 rounded-lg border border-gray-400"
                          >
                            <div className="font-semibold text-lg">
                              {stat.value}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
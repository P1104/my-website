"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Globe, ArrowRight } from 'lucide-react';
import { Bot, BarChart3, Headphones } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
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

const Sparkles = (props: ParticlesProps) => {
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
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();
  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "transparent",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
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
                resize: true as any,
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
              bounce: {
                horizontal: {
                  value: 1,
                },
                vertical: {
                  value: 1,
                },
              },
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: particleColor || "#6366f1",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                },
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
              groups: {},
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 3000,
                    y: 3000,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                },
                random: false,
                size: false,
                speed: {
                  min: 0.1,
                  max: 1,
                },
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: false,
                trail: {
                  enable: false,
                  length: 10,
                  fill: {},
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 0.5,
                },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              reduceDuplicates: false,
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle",
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
                animation: {
                  count: 0,
                  enable: false,
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              stroke: {
                width: 0,
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              destroy: {
                bounds: {},
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    value: 3,
                  },
                  rate: {
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                },
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              tilt: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              life: {
                count: 0,
                delay: {
                  value: 0,
                  sync: false,
                },
                duration: {
                  value: 0,
                  sync: false,
                },
              },
              rotate: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  value: 45,
                },
                width: 1,
              },
              links: {
                blink: false,
                color: {
                  value: "#fff",
                },
                consent: false,
                distance: 100,
                enable: false,
                frequency: 1,
                opacity: 1,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              repulse: {
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
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
    id: 'chatbot',
    title: 'ChatBot JS',
    description: 'Customizable AI chatbot designed for seamless website integration.',
    detailedDescription: 'Enhance your website with a simple and easy-to-integrate AI assistant.',
    icon: <Bot className="w-6 h-6" />,
    features: [
      'AI Bot Integration for Websites',
      'Knowledge Base Creation',
      'Custom Prompt Templates',
      'Support for Multiple AI Models'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'A comprehensive analytics platform for actionable insights.',
    detailedDescription: 'Transform your data into powerful insights with our advanced analytics platform.',
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      'Real-time Data Processing',
      'Advanced Visualization',
      'Predictive Analytics',
      'Custom Dashboard Creation'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'customer-service',
    title: 'Customer Service',
    description: 'Cloud-based manufacturing intelligence powered by digital forms.',
    detailedDescription: 'Deliver exceptional customer support with our comprehensive service platform.',
    icon: <Headphones className="w-6 h-6" />,
    features: [
      'Omnichannel Support',
      'Automated Ticket Routing',
      'Performance Analytics',
      'Integration Capabilities'
    ],
    color: 'from-green-500 to-emerald-500'
  }
];

export function ProductSecTwo() {
  const [selectedSuite, setSelectedSuite] = useState<ProductSuite>(productSuites[0]);

  return (
    <div className="bg-white text-gray-900 relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Sparkles
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={50}
          particleColor="#6366f1"
          speed={0.5}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Product Suites Overview */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Product Suites</h2>
              <p className="text-xl text-gray-600">
                Choose a product suite to explore its capabilities and components
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {productSuites.map((suite, index) => (
                <motion.div
                  key={suite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:scale-105 border-2 bg-white",
                      selectedSuite.id === suite.id 
                        ? "border-indigo-500 bg-indigo-50" 
                        : "border-gray-200 hover:border-indigo-300"
                    )}
                    onClick={() => setSelectedSuite(suite)}
                  >
                    <CardHeader className="text-center">
                      <div className={cn(
                        "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white",
                        "bg-gradient-to-r", suite.color
                      )}>
                        {suite.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{suite.title}</h3>
                      <p className="text-gray-600">{suite.description}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Product View */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              key={selectedSuite.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center text-white",
                    "bg-gradient-to-r", selectedSuite.color
                  )}>
                    {selectedSuite.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{selectedSuite.title}</h2>
                </div>
                
                <p className="text-xl text-gray-600 mb-8">
                  {selectedSuite.description}
                </p>

                <p className="text-lg mb-8">
                  {selectedSuite.detailedDescription}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {selectedSuite.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Why Choose {selectedSuite.title}?</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span>Easy Integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="w-4 h-4 text-indigo-500" />
                      <span>Cross-Framework Compatibility</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Zap className="w-4 h-4 text-indigo-500" />
                      <span>Fully Customizable</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                    View Suite
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-8 bg-white border-2 border-indigo-200">
                  <div className="text-center">
                    <div className={cn(
                      "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white",
                      "bg-gradient-to-r", selectedSuite.color
                    )}>
                      {React.cloneElement(selectedSuite.icon as React.ReactElement, { className: "w-12 h-12" })}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{selectedSuite.title}</h3>
                    <p className="text-gray-600 mb-6">
                      Experience the power of {selectedSuite.title.toLowerCase()} with our comprehensive solution.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="font-semibold">99.9%</div>
                        <div className="text-gray-600">Uptime</div>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="font-semibold">24/7</div>
                        <div className="text-gray-600">Support</div>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="font-semibold">API</div>
                        <div className="text-gray-600">Ready</div>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="font-semibold">Cloud</div>
                        <div className="text-gray-600">Native</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
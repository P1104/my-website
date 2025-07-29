"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Brain, Zap, Shield, HeadphonesIcon, Lock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Spline from '@splinetool/react-spline';

type FeatureType = {
  title: string;
  icon: LucideIcon | React.FC<{ className?: string }>;
  description: string;
};

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-600/80"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
              fill="currentColor"
              className="text-blue-600/40"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
    Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
  ]);
}

interface FeatureCardProps {
  feature: FeatureType;
  className?: string;
  index: number;
}

function FeatureCard({
  feature,
  className,
  index,
  ...props
}: FeatureCardProps & Omit<React.ComponentProps<"div">, keyof FeatureCardProps | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd'>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const p = genRandomPattern();

  // Advanced reveal animation
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.15 + 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden p-8 perspective-1000", className)}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -12,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Animated background pattern */}
      <motion.div
        className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] opacity-60"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1, delay: index * 0.15 + 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/15 to-gray-900/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </motion.div>

      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="relative z-10" variants={contentVariants}>
        <motion.div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 drop-shadow-lg"
          variants={iconVariants}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            backgroundColor: "#dbeafe",
            transition: { duration: 0.2 },
          }}
        >
          <feature.icon className="h-6 w-6" strokeWidth={1} />
        </motion.div>

        <motion.h3
          className="text-xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.7 }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.9 }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export const HeroSectionTwo: React.FC = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
      },
    }),
  };

  // Custom Play Icon Component
  const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon points="10,9 16,12 10,15" fill="currentColor" />
    </svg>
  );

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="text-center md:text-left"
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#dbeafe",
                borderColor: "#93c5fd",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-4 h-4 text-blue-600"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
              <span className="text-blue-700 text-sm font-medium">
                Our Principles
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              {["Our", "Philosophy"].map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  className={index === 0 ? "bg-clip-text text-black" : ""}
                  whileHover={{
                    scale: 1.05,
                    color: "#3b82f6",
                    transition: { duration: 0.2 },
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              Discover the cutting-edge capabilities that make our platform the
              perfect choice for modern businesses. Built for scale, security,
              and intelligence.
            </motion.p>
          </motion.div>

          {/* Right Content - Fixed 3D Model */}
          <motion.div
            className="lg:pl-12 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-[350px] h-[350px] mx-auto">
              {/* Background glow with border blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-white/10 to-purple-100/20 rounded-full blur-3xl scale-110" />
              <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full blur-sm" />
              
              {/* Spline 3D Scene (Circular Container) */}
              {/* <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: isSplineLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full h-full rounded-full overflow-hidden"
              >
                {!isSplineLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-full">
                    <div className="animate-pulse text-gray-500">
                      Loading 3D model...
                    </div>
                  </div>
                )}
                <Spline
                  scene="/models/small-robot.splinecode"
                  className="w-full h-full"
                  style={{
                    background: "transparent",
                    opacity: isSplineLoaded ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    borderRadius: "50%", // Force circular clipping
                  }}
                  onLoad={() => setIsSplineLoaded(true)}
                  onError={(error) => {
                    console.error("Spline error:", error);
                    setIsSplineLoaded(false);
                  }}
                />
              </motion.div>
               */}
              {/* Decorative Elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-purple-300/40 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Philosophy Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            {
              icon: Zap,
              title: "Simplicity",
              description:
                "All our products are designed to be simple and easy to use.",
            },
            {
              icon: Shield,
              title: "Security",
              description:
                "We want our users to be the only ones seeing their data.",
            },
            {
              icon: Zap,
              title: "Speed",
              description:
                "Nobody likes to see the buffering animation on their screen.",
            },
            {
              icon: Zap,
              title: "Powerful Features",
              description:
                "Our products are guaranteed to help in increasing productivity regardless of the domain",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl h-full"
            />
          ))}
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Powerful Features
            </span>
          </motion.h2> */}
          {/* <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            Our products are guaranteed to help in increasing productivity
            regardless of the domain
          </motion.p> */}
        </motion.div>

        {/* Enhanced Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[
            {
              icon: Lock,
              title: "Data Encryption",
              description:
                "End-to-end encryption ensures your information remains private and secure at all times.",
            },
            {
              icon: Brain,
              title: "AI Integration",
              description:
                "Smart algorithms work behind the scenes to optimize your experience and deliver intelligent insights.",
            },
            {
              icon: PlayIcon,
              title: "Real-Time Analytics",
              description:
                "Get instant access to comprehensive data visualizations and performance metrics.",
            },
            {
              icon: HeadphonesIcon,
              title: "24/7 Support",
              description:
                "Our dedicated team is always available to assist you with any questions or issues.",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl h-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
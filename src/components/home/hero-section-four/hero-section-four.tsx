"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { Target, Users, Cog } from "lucide-react";
import Spline from "@splinetool/react-spline";

// Utility function for cn if not available with proper typing
function cnFallback(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}

// Use cn if available, otherwise use fallback
const classNames = typeof cn !== "undefined" ? cn : cnFallback;

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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

function FeatureCard({
  feature,
  className,
  index,
  ...props
}: {
  feature: FeatureType;
  className?: string;
  index: number;
} & Omit<
  React.ComponentProps<"div">,
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onTransitionEnd"
>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const p = genRandomPattern();

  // Advanced card reveal animations
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -30,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
        duration: 0.8,
      },
    },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.5,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1 + 0.7,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={classNames(
        "relative overflow-hidden p-8 perspective-1000",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -15,
        rotateY: 8,
        rotateX: 5,
        scale: 1.03,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.3,
        },
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "200%" } : { x: "-100%" }}
        transition={{
          duration: 1.5,
          delay: index * 0.1 + 1,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced background pattern */}
      <motion.div
        className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] opacity-60"
        variants={overlayVariants}
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
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
      />

      <motion.div className="relative z-10" variants={contentVariants}>
        <motion.div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 drop-shadow-lg relative overflow-hidden"
          variants={iconVariants}
          whileHover={{
            scale: 1.15,
            rotate: 10,
            backgroundColor: "#dbeafe",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 15,
            },
          }}
        >
          {/* Icon pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-200"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
          <feature.icon className="h-6 w-6 relative z-10" strokeWidth={1} />
        </motion.div>

        <motion.h3
          className="text-xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1 + 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            x: 5,
            color: "#3b82f6",
            transition: { duration: 0.2 },
          }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 1,
            delay: index * 0.1 + 1.1,
            ease: "easeOut",
          }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

interface HeroSectionProps {
  brandName?: string;
  mainTitle?: string;
  description?: string;
  services?: string[];
  features?: FeatureType[];
}

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

export const HeroSectionFour: React.FC<HeroSectionProps> = (props) => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = props.features ?? [
    {
      title: "AI Chatbot Development",
      icon: Users,
      description:
        "We create intelligent chatbot systems that understand context, learn from interactions, and provide personalized customer experiences. Our bots integrate seamlessly with your existing platforms.",
    },
    {
      title: "Data Analytics Solutions",
      icon: Target,
      description:
        "Transform raw data into actionable insights with our advanced analytics platform. Get real-time dashboards, predictive modeling, and custom reports that drive smarter business decisions.",
    },
    {
      title: "Customer Service Automation",
      icon: Cog,
      description:
        "Streamline your customer support with AI-powered automation. Reduce response times, handle multiple queries simultaneously, and maintain 24/7 availability for your customers.",
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
      style={{ y }}
    >
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

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={`w-4 h-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded ${
                i % 2 === 0 ? "rotate-45" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Header Section with 3D Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
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
                What We Do
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              {["What", "Do", "We", "Do", "?"].map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  className="inline-block mr-2"
                  whileHover={{
                    scale: 1.05,
                    color: "#3b82f6",
                    transition: { duration: 0.2 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              Equilibrate.AI is here to transform old age tech across industries
              with solutions in Development, Data Analytics and Customer Service.
              We build intelligent chatbot systems tailored to modern business
              needs. Our data-driven insights help companies make smarter, faster
              decisions. From prototypes to scalable systems, we empower
              businesses to grow with AI.
            </motion.p>
          </motion.div>

          {/* Right Content - 3D Model */}
          <motion.div
            className="lg:pl-12 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-[350px] h-[350px] mx-auto">
              {/* Background glow with border blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-white/10 to-purple-100/20 rounded-full blur-3xl scale-110" />
              <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full blur-sm" />

              {/* Spline 3D Scene (Circular Container) */}
              <motion.div
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
                  scene="models\greeting-robot.splinecode"
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

        {/* Enhanced features grid with advanced stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl h-full transform-gpu"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
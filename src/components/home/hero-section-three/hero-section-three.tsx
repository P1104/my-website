"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, Cpu, Target, Globe, Users, Cog } from "lucide-react";

// Utility function for cn if not available with proper typing
function cnFallback(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Use cn if available, otherwise use fallback
const classNames = typeof cn !== 'undefined' ? cn : cnFallback;

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
} & Omit<React.ComponentProps<"div">, 
  | "onDrag" | "onDragEnd" | "onDragStart" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"
  | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
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
      className={classNames("relative overflow-hidden p-8 perspective-1000", className)}
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

// Advanced text reveal animation
// const textRevealVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//     skewY: 7,
//     filter: "blur(10px)",
//   },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     skewY: 0,
//     filter: "blur(0px)",
//     transition: {
//       duration: 0.8,
//       delay: i * 0.1,
//       ease: [0.25, 0.46, 0.45, 0.94],
//     },
//   }),
// };

export const HeroSectionThree: React.FC<HeroSectionProps> = (props) => {
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // Removed the dimming opacity transform - now it stays at full opacity

  // const services = props.services ?? [
  //   "Development",
  //   "Data Analytics",
  //   "Customer Service",
  // ];

  const features = props.features ?? [
    {
      title: "Accessible Innovation",
      icon: Zap,
      description:
        "We bring the power of cutting-edge AI and data analytics within your reach. By streamlining our processes and refining our solutions, we ensure that innovation remains accessible and cost-effective for every business.",
    },
    {
      title: "Sustainability at Core",
      icon: Globe,
      description:
        "We believe in transforming industries responsibly. Our AI-driven solutions are designed to not only drive operational efficiency but also promote sustainable practices, leaving a lasting positive impact on the environment.",
    },
    {
      title: "Enriching Communities",
      icon: Users,
      description:
        "Our mission extends beyond business. By enabling industries to thrive through advanced technology, we contribute to building stronger communities and driving meaningful change on a global scale.",
    },
    {
      title: "End-to-End Solutions",
      icon: Cog,
      description:
        "As a fresh and dynamic startup, we specialize in building smart AI chatbots and data-driven analytics solutions tailored for modern business needs. Our small but passionate team brings innovative thinking, adaptability, and a hands-on approach to every project from start to finish.",
    },
    {
      title: "Future-Ready Technology",
      icon: Cpu,
      description:
        "Our solutions leverage cutting-edge Generative AI, advanced analytics, and Industry 4.0 principles to help industries across sectors stay ahead in a fast-evolving world.",
    },
    {
      title: "Proven Excellence",
      icon: Target,
      description:
        "Equilibrate has consistently delivered excellence. From strategic consulting to seamless implementation, we are with you at every step, driving measurable results and long-term success.",
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative bg-transparent overflow-hidden"
      style={{ y }} // Removed opacity from style
    >
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
        {/* Enhanced services section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          whileInView={{ scale: [0.95, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            {"Why Equilibrate Leads the Future".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -3,
                  color: "#3b82f6",
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            Innovation, experience, and commitment combined to deliver
            transformation across industries.
          </motion.p>
        </motion.div>

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

export default HeroSectionThree;
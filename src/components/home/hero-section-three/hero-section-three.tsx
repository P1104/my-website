"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

// Stars Background Component
type StarLayerProps = {
  count: number;
  size: number;
  transition: any;
  starColor: string;
  className?: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  className,
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn("absolute top-0 left-0 w-full h-[2000px]", className)}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: any;
  starColor?: string;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#3b82f6",
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <StarLayer
          count={800}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColor={starColor}
        />
        <StarLayer
          count={300}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColor={starColor}
        />
        <StarLayer
          count={150}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: "linear",
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

// 3D Animation Highlight
const Animated3DHighlight = () => (
  <div className="w-full h-full min-h-[260px] md:min-h-[340px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* Spinning Torus Knot (symbolizes innovation, AI, and data) */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#6366f1" emissive="#3b82f6" metalness={0.7} roughness={0.2} />
      </mesh>
      <Stars radius={10} depth={50} count={2000} factor={0.5} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  </div>
);

// Main Hero Component
interface HeroSectionProps {
  brandName?: string;
  mainTitle?: string;
  description?: string;
  services?: string[];
  features?: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export const HeroSectionThree: React.FC<HeroSectionProps> = ({
  brandName = "Equilibrate.AI",
  mainTitle = "What Do We Do ?",
  description = "Equilibrate.AI is here to transform old age tech across industries with solutions in Development, Data Analytics and Customer Service. We build intelligent chatbot systems tailored to modern business needs. Our data-driven insights help companies make smarter, faster decisions. From prototypes to scalable systems, we empower businesses to grow with AI.",
  services = ["Development", "Data Analytics", "Customer Service"],
  features = [
    {
      number: "01",
      title: "Accessible Innovation",
      description: "We bring the power of cutting-edge AI and data analytics within your reach. By streamlining our processes and refining our solutions, we ensure that innovation remains accessible and cost-effective for every business."
    },
    {
      number: "02", 
      title: "Sustainability at Core",
      description: "We believe in transforming industries responsibly. Our AI-driven solutions are designed to not only drive operational efficiency but also promote sustainable practices, leaving a lasting positive impact on the environment."
    },
    {
      number: "03",
      title: "Enriching Communities", 
      description: "Our mission extends beyond business. By enabling industries to thrive through advanced technology, we contribute to building stronger communities and driving meaningful change on a global scale."
    },
    {
      number: "04",
      title: "End-to-End Solutions",
      description: "As a fresh and dynamic startup, we specialize in building smart AI chatbots and data-driven analytics solutions tailored for modern business needs. Our small but passionate team brings innovative thinking, adaptability, and a hands-on approach to every project from start to finish."
    },
    {
      number: "05",
      title: "Future-Ready Technology",
      description: "Our solutions leverage cutting-edge Generative AI, advanced analytics, and Industry 4.0 principles to help industries across sectors stay ahead in a fast-evolving world."
    },
    {
      number: "06",
      title: "Proven Excellence",
      description: "Equilibrate has consistently delivered excellence. From strategic consulting to seamless implementation, we are with you at every step, driving measurable results and long-term success."
    }
  ]
}) => {
  return (
    <div className="relative  bg-white overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0">
        <StarsBackground 
          className="w-full h-full"
          starColor="#3b82f6"
          speed={60}
          factor={0.03}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {mainTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {description}
          </p>
          {/* Services */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-sm"
              >
                <span className="text-gray-700 font-medium">{service}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Equilibrate Leads the Future */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Equilibrate Leads the Future
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Innovation, experience, and commitment combined to deliver transformation across industries.
          </p>
        </motion.div>

        {/* 3D Animation Highlight */}
        <div className="flex justify-center mb-16">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-white/80">
            <Animated3DHighlight />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


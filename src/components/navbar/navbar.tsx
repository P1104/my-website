"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Zap, CreditCard, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  subItems?: { name: string; url: string }[];
}

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Company",
      url: "#",
      icon: Zap,
      subItems: [
        { name: "About Us", url: "/about-us" },
        { name: "Careers", url: "/carrers" },
      ],
    },
    {
      name: "Resources",
      url: "#",
      icon: CreditCard,
      subItems: [
        { name: "Blog", url: "/blog" },
        { name: "Use Cases", url: "/use-cases" },
      ],
    },
    {
      name: "Products",
      url: "/product",
      icon: Info,
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: Info,
    },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav 
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        top: isScrolled ? "1rem" : "1.5rem"
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div 
        className="flex items-center gap-1 bg-black/50 backdrop-blur-md py-2 px-2 rounded-full border border-white/10 shadow-lg"
        animate={{
          scale: isScrolled ? 0.95 : 1,
          opacity: isScrolled ? 0.95 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isHovered = hoveredTab === item.name;
          const hasDropdown = item.subItems && item.subItems.length > 0;

          return (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => {
                setHoveredTab(null);
                setHoveredDropdown(null);
              }}
            >
              <Link
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-all duration-300",
                  "text-white/80 hover:text-white",
                  isActive && "text-white bg-white/10",
                  "flex items-center gap-2"
                )}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{item.name}</span>
                {hasDropdown && (
                  <svg
                    className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                      hoveredTab === item.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>

              {hasDropdown && (
                <AnimatePresence>
                  {hoveredTab === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-black/70 rounded-md shadow-lg py-2 border border-white/10 z-30"
                      style={{
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                      }}
                      onMouseEnter={() => setHoveredDropdown(item.name)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                    >
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.url}
                          className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition duration-150"
                          onClick={() => setActiveTab(item.name)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </motion.div>
    </motion.nav>
  );
};
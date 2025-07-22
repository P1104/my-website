import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

interface HeaderSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const BlogSectionOne = ({
  tagline = "Stellar Insights",
  heading = "Exploring the Cosmos of Technology",
  description = "Discover our latest articles on technology, design, and innovation under the starlit sky of knowledge.",
  buttonText = "Start Reading",
  buttonUrl = "#",
}: HeaderSectionProps) => {
  return (
    <div className="relative  bg-white overflow-hidden">
       <Sparkles
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        particleColor="#3b82f6"
        speed={1}
      />
      
      <div className="relative z-10 pt-10">
        <section className="py-20 lg:py-16">
          <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
            <div className="text-center max-w-4xl">
              {/* <Badge className="mb-6 bg-blue-100 text-blue-600 border-blue-200">
                {tagline}
              </Badge> */}
              <h1 className="mb-6 text-pretty text-4xl font-bold md:text-5xl lg:text-6xl text-gray-900">
                {heading}
              </h1>
              <p className="mb-8 text-lg text-gray-600 md:text-xl lg:max-w-3xl">
                {description}
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                {buttonText}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
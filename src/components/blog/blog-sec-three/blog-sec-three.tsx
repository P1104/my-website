import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

interface FollowUsSectionProps {
  linkedinText?: string;
  linkedinUrl?: string;
}

export const BlogSectionThree = ({
  linkedinText = "Follow Us on LinkedIn",
  linkedinUrl = "https://www.linkedin.com/company/equilibrate-ai",
}: FollowUsSectionProps) => {
  return (
    <section className="py-16 relative bg-white">
      <Sparkles
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        particleColor="#3b82f6"
        speed={1}
      />
      <div className="container mx-auto lg:px-16 relative z-10">
        <Card className="bg-white border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{linkedinText}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stay updated with our latest innovations, AI insights, and behind-the-scenes stories from the Equilibrate.AI team.
            </p>
            <Button variant="outline" className="border-blue-300 text-white-600" asChild>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                Visit LinkedIn Page
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

interface Post {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface CardSectionProps {
  posts?: Post[];
}

export const BlogSectionTwo = ({
  posts = [
    {
      id: "post-1",
      title: "The Power of Artificial Intelligence: From Concept to Competitive Advantage",
      summary: "Artificial Intelligence (AI) is revolutionizing modern business by enabling automation, smarter decision-making, and personalized customer experiences.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      id: "post-2",
      title: "Harnessing Data Analytics: Transforming Information Into Business Intelligence",
      summary: "Data analytics transforms raw information into powerful business intelligence, enabling smarter decisions, greater efficiency, and proactive risk management.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    },
    {
      id: "post-3",
      title: "The Rise of Voice Assistants: How Equilibrate Is Shaping the Future of Human-Tech Interaction",
      summary: "Equilibrate is redefining human-tech interaction with smart, multilingual voice assistants powered by AI and real-time speech recognition.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop",
    },
    {
      id: "post-4",
      title: "The Paradox of Progress: How AI is Both Securing and Threatening Data Privacy",
      summary: "AI is both a shield and a threat in data security—while it detects anomalies, stops phishing, and automates threat response.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    },
    {
      id: "post-5",
      title: "Emerging Open-Source Models in the Era of AI Innovation",
      summary: "Open-source AI is democratizing innovation by making powerful models accessible to developers, researchers, and startups worldwide.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    },
    {
      id: "post-6",
      title: "The Evolution of AI Agents: From Simple Scripts to Autonomous Thinkers",
      summary: "AI agents have evolved from static rule-based systems to autonomous, tool-using entities that reason, plan, and collaborate.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    },
  ],
}: CardSectionProps) => {
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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-4xl text-gray-900">Featured Articles</h2>
          <p className="text-gray-600 text-lg">Discover our latest thoughts on technology and design</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 bg-white">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                <Image
                  width={800}
                  height={400}
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold leading-tight hover:text-blue-600 transition-colors md:text-xl text-gray-900">
                  <a href={post.url} className="line-clamp-2">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{post.summary}</p>
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.published}</span>
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href={post.url}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkillsSection from './landingpage/skillssection';

interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

interface Project {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  featured: boolean;
}

interface HomePageProps {
  latestPosts: Post[];
  featuredProjects: Project[];
}

const HomePage: React.FC<HomePageProps> = ({ latestPosts, featuredProjects }) => {
  return (
    <div className="space-y-24 pb-8">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary">Remco Brilstra</span> 👋
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Full Stack Developer passionate about building exceptional digital experiences.
            I specialize in React, TypeScript, and modern web technologies.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                Read My Blog
              </Link>
            </Button>
          </div>
          <div className="flex gap-4 pt-4">
            <Link href="https://github.com/remcobrilstra" className="text-muted-foreground hover:text-foreground transition-colors" target='_blank' rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://x.com/remcobrilstra" className="text-muted-foreground hover:text-foreground transition-colors" target='_blank' rel="noopener noreferrer">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com/in/remcobrilstra" className="text-muted-foreground hover:text-foreground transition-colors" target='_blank' rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      <SkillsSection />
     
      {/* Latest Posts Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          <Link href="/blog">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  {post.description && (
                    <p className="text-muted-foreground">{post.description}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <Link href="/projects">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="overflow-hidden">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                {project.description && (
                  <CardDescription>{project.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
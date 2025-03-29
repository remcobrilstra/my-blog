"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Github,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Shared animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags?: string[];
  featured?: boolean;
  date: string;
}

interface ProjectsListProps {
  projects: Project[];
}

// Projects Components
export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [imageError, setImageError] = React.useState<Record<string, boolean>>({});

  const handleImageError = (slug: string) => {
    setImageError(prev => ({ ...prev, [slug]: true }));
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          Some projects i work on every now and then.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="w-full h-48 overflow-hidden relative">
                {!imageError[project.slug] ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(project.slug)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-4">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, // Changed from GameController
  Bot, 
  Cloud, 
  Code2, 
  GitBranch,
  Boxes,
  Github,
  Twitter,
  Linkedin,
  X,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SkillCard = ({ skill, category, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: skill.animationDelay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="h-full cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {skill.icon}
            </div>
            <h3 className="font-semibold text-xl">{skill.title}</h3>
          </div>
          
          <p className="text-muted-foreground">{skill.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <Badge 
                key={item}
                variant={isActive ? "default" : "secondary"}
              >
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SkillModal = ({ skill, isOpen, onClose }) => {
  if (!skill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {skill.icon}
            </div>
            <DialogTitle>{skill.title}</DialogTitle>
          </div>
          <DialogDescription>{skill.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Core Technologies */}
          <div>
            <h4 className="font-semibold mb-2">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <Badge key={item} variant="default">{item}</Badge>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div>
            <h4 className="font-semibold mb-2">Experience Highlights</h4>
            <ul className="space-y-2">
              {skill.experience?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ExternalLink className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Projects */}
          {skill.projects && (
            <div>
              <h4 className="font-semibold mb-2">Related Projects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skill.projects.map((project, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h5 className="font-medium">{project.title}</h5>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = {
    gamedev: {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: 'Game Development',
      items: ['Unity', 'C#', 'Game Architecture', '3D Modeling', 'Physics Engines'],
      description: 'Expert in building scalable game systems and architecting performant game logic',
      animationDelay: 0,
      experience: [
        'Developed multiplayer game systems using Unity DOTS',
        'Implemented custom physics systems for realistic gameplay',
        'Created modular architecture for game components',
        'Optimized performance for cross-platform deployment'
      ],
      projects: [
        {
          title: 'Multiplayer Arena Game',
          description: 'Fast-paced multiplayer game with custom networking solution'
        },
        {
          title: 'Physics Puzzle Game',
          description: 'Mobile game featuring custom physics engine integration'
        }
      ]
    },
    dotnet: {
      icon: <Code2 className="h-6 w-6" />,
      title: '.NET Development',
      items: ['.NET Core', 'ASP.NET', 'Entity Framework', 'LINQ', 'Microservices'],
      description: 'Skilled in building enterprise-grade applications with .NET ecosystem',
      animationDelay: 0.1,
      experience: [
        'Architected microservices-based systems using .NET Core',
        'Implemented complex domain models with Entity Framework',
        'Developed high-performance APIs with ASP.NET',
        'Created scalable background processing systems'
      ],
      projects: [
        {
          title: 'Enterprise CRM System',
          description: 'Microservices-based CRM with complex business logic'
        },
        {
          title: 'Real-time Analytics Platform',
          description: 'High-performance data processing system using .NET'
        }
      ]
    },
    // ... other skills with similar detailed data ...
  };

  // Add remaining skill categories with similar structure
  const remainingSkills = {
    azure: {
      icon: <Cloud className="h-6 w-6" />,
      title: 'Azure & Cloud',
      items: ['Azure DevOps', 'Azure Functions', 'App Service', 'Azure SQL', 'Cloud Architecture'],
      description: 'Experienced in cloud-native solutions and Azure infrastructure',
      animationDelay: 0.2
    },
    devops: {
      icon: <GitBranch className="h-6 w-6" />,
      title: 'DevOps',
      items: ['CI/CD', 'Infrastructure as Code', 'Docker', 'Kubernetes', 'Monitoring'],
      description: 'Proficient in implementing DevOps practices and automation',
      animationDelay: 0.3
    },
    genai: {
      icon: <Bot className="h-6 w-6" />,
      title: 'Generative AI',
      items: ['LLMs', 'Prompt Engineering', 'AI Integration', 'RAG Systems', 'Vector Databases'],
      description: 'Specializing in implementing and integrating generative AI solutions',
      animationDelay: 0.4
    },
    lowcode: {
      icon: <Boxes className="h-6 w-6" />,
      title: 'Low-Code Development',
      items: ['Power Platform', 'Power Automate', 'Power Apps', 'Logic Apps', 'Custom Connectors'],
      description: 'Expert in rapid application development using low-code platforms',
      animationDelay: 0.5
    }
  };

  const allSkills = { ...skills, ...remainingSkills };

  return (
    <section className="space-y-12 py-16">
      {/* Section Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Technical Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Software architect with extensive experience across multiple domains, 
          specializing in enterprise solutions and emerging technologies.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(allSkills).map(([key, skill]) => (
          <SkillCard
            key={key}
            skill={skill}
            category={key}
            isActive={activeCategory === key}
            onClick={() => {
              setActiveCategory(key === activeCategory ? 'all' : key);
              setSelectedSkill(skill);
            }}
          />
        ))}
      </div>

      {/* Skill Modal */}
      <SkillModal 
        skill={selectedSkill}
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />

      {/* Social Links */}
      <motion.div 
        className="flex justify-center items-center gap-6 pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            asChild
          >
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            asChild
          >
            <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer">
              <X className="h-5 w-5" />
              X.com
            </a>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            asChild
          >
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
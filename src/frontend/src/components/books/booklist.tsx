import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Tag,
  ArrowUpRight,
  Book,
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

// Books Components
export const BooksList = ({ books }) => {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Book Shelf</h1>
        <p className="text-muted-foreground">
          A curated collection of books that have influenced my professional journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <motion.div key={book.slug} variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="w-full h-64 overflow-hidden">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{book.description}</p>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className={`text-lg ${i < Math.floor(book.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-4">
                {book.amazonLink && (
                  <Button size="sm" asChild>
                    <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                      Buy on Amazon
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
                {book.review && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={book.review}>
                      <Book className="h-4 w-4 mr-2" />
                      Read Review
                    </Link>
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
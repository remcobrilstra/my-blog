'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  ArrowLeft,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeBlockRender from '../generic/codeblockrenderer';

const BlogPost = ({ post, relatedPosts }) => {

  const currentUrl = window.location.href
  // Function to copy current URL to clipboard
  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
        navigator.clipboard.writeText(currentUrl);
    }
  };

  // Generate share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  };

  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </motion.div>

      {/* Article Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 mb-8"
      >
        {post.image && (
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
      >
        <CodeBlockRender content={post.content} />
        </motion.div>

      {/* Share Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t pt-6 mb-12"
      >
        <h3 className="text-lg font-semibold mb-4">Share this post</h3>
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on Twitter</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy link</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      {/* Related Posts */}
      {relatedPosts?.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t pt-12"
        >
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Card key={related.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Link href={`/blog/${related.slug}`} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{related.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">{related.description}</p>
                    <div className="flex gap-2">
                      {related.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </article>
  );
};

export default BlogPost;
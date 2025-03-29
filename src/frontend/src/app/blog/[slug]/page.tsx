import { getMarkdownContent, getMarkdownMetaData } from '@/lib/markdown';
import BlogPost from '@/components/blog/blog-post';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug) as any;
  
  return {
    title: `${post.title} - Your Name`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Your Name'],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getMarkdownMetaData('blog'); 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug) as any;
  
  // Get all posts to find related ones
  const allPosts = await getMarkdownMetaData('blog') as any[];
  
  // Find related posts based on tags
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== params.slug && // Exclude current post
      p.tags?.some(tag => post.tags?.includes(tag)) // Match tags
    )
    .sort((a, b) => {
      // Sort by number of matching tags
      const aMatches = a.tags?.filter(tag => post.tags?.includes(tag)).length || 0;
      const bMatches = b.tags?.filter(tag => post.tags?.includes(tag)).length || 0;
      return bMatches - aMatches;
    })
    .slice(0, 2); // Get top 2 related posts

  return <BlogPost post={post} relatedPosts={relatedPosts} />;
}

export default BlogPostPage;
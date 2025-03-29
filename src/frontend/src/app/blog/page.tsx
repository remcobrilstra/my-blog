import BlogList from '@/components/blog/bloglist';
import { getMarkdownMetaData } from '@/lib/markdown';

export const metadata = {
  title: 'Blog - Your Name',
  description: 'Thoughts and insights about software development, architecture, and technology.',
};

async function BlogPage() {
  const posts = await getMarkdownMetaData('blog');
  
  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <BlogList posts={sortedPosts} />;
}

export default BlogPage;
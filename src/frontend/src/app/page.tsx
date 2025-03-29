import { getMarkdownContent, getMarkdownMetaData } from '@/lib/markdown';
import HomePage from '@/components/homepage';

export const metadata = {
  title: 'Your Name - Full Stack Developer',
  description: 'Full Stack Developer passionate about building exceptional digital experiences',
  openGraph: {
    title: 'Your Name - Full Stack Developer',
    description: 'Full Stack Developer passionate about building exceptional digital experiences',
    type: 'website',
    url: 'https://yourwebsite.com',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Full Stack Developer',
    description: 'Full Stack Developer passionate about building exceptional digital experiences',
    images: ['https://yourwebsite.com/og-image.jpg'],
  },
};

async function LandingPage() {
  // Get latest 3 blog posts
  const posts = await getMarkdownMetaData('blog') as { slug: string; date: string; }[];
  const latestPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Get featured projects (ones marked as featured in frontmatter)
  const projects = await getMarkdownMetaData('projects') as { slug: string; featured: boolean; }[];
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 2);

  return <HomePage latestPosts={latestPosts} featuredProjects={featuredProjects} />;
}

export default LandingPage;
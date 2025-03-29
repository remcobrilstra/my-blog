import { ProjectsList } from '@/components/projects/projectlist';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Projects - Your Name',
  description: 'A showcase of technical projects and professional work.',
};

async function ProjectsPage() {
  const projects = await getMarkdownContent('projects') as any[];
  
  // Sort projects by featured status and date
  const sortedProjects = projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return <ProjectsList projects={sortedProjects} />;
}

export default ProjectsPage;
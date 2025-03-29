
import { ProjectsList } from '@/components/projects/projectlist';
import { getMarkdownMetaData } from '@/lib/markdown';

export const metadata = {
  title: 'Projects - Your Name',
  description: 'A showcase of technical projects and professional work.',
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

async function ProjectsPage() {
  try {
    const projects = await getMarkdownMetaData('projects') as Project[];
    
    if (!projects || projects.length === 0) {
      return (
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      );
    }

    // Sort projects by featured status and date
    const sortedProjects = projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return <ProjectsList projects={sortedProjects} />;
  } catch (error) {
    console.error('Error loading projects:', error);
    return (
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-red-500">Error loading projects. Please try again later.</p>
      </div>
    );
  }
}

export default ProjectsPage;
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


export async function getMarkdownMetaData(folder: string): Promise<any[]> {
    const contentDir = path.join(process.cwd(), 'content', folder);
     
    // Get all files
    const files = fs.readdirSync(contentDir);
    const posts = files.map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        ...data,
      };
    });
    
    return posts;
}

export async function getMarkdownContent(folder: string, slug: string) {
  const contentDir = path.join(process.cwd(), 'content', folder);
  
  if (slug) {
    const fullPath = path.join(contentDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
        
    return {
      slug,
      content,
      ...data,
    };
  }
}
import { BooksList } from '@/components/books/booklist';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Book Shelf - Your Name',
  description: 'A curated collection of recommended books on software development and technology.',
};

async function BooksPage() {
  const books = await getMarkdownContent('books')as any[];
  
  // Sort books by rating and date added
  const sortedBooks = books.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });

  return <BooksList books={sortedBooks} />;
}

export default BooksPage;
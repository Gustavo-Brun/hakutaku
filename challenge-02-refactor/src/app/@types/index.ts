export interface IDocument {
  id: string;
  title: string;
  content: string;
  category: 'docs' | 'wiki' | 'api';
  tags: string[];
  createdAt: string;
  author: string;
}

'use client';

import { useState, useEffect } from 'react';

import { IDocument } from './@types';
import mockDocs from './mocks/docs.json';
import InputSearch from './components/InputSearch';
import DocsList from './components/DocsList';

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<IDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('title');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterAndSortDocuments();
  }, [searchTerm, selectedCategory, selectedTags, sortBy, documents]);

  const fetchDocuments = async () => {
    setLoading(true);

    setDocuments(mockDocs as IDocument[]);
    setLoading(false);
  };

  const filterAndSortDocuments = () => {
    let filtered = documents;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((doc) => doc.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

    setFilteredDocs(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const renderTags = () => {
    const allTags = documents.flatMap((doc) => doc.tags);
    const uniqueTags = [...new Set(allTags)];

    return (
      <div className="flex flex-wrap gap-3">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`cursor-pointer rounded-[20px] px-2 py-1 text-xs ${
              selectedTags.includes(tag)
                ? 'border-2 border-[#007bff] bg-[#e7f3ff]'
                : 'border-[1px] border-[#ddd] bg-white'
            } `}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-sans">
        <div>Carregando base de conhecimento...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl p-5 font-sans">
      <h1 className="mb-[30px] text-[#333]">📚 Base de Conhecimento Hakutaku</h1>

      <InputSearch
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        handleSearch={handleSearch}
        handleCategoryChange={handleCategoryChange}
        handleSortChange={handleSortChange}
      />

      <div className="mb-5">
        <label className="mr-[10px] font-bold">Tags:</label>
        <div className="flex flex-wrap gap-3">{renderTags()}</div>
      </div>

      <div className="mb-5">
        <strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
      </div>

      <DocsList filteredDocs={filteredDocs} />

      {filteredDocs.length === 0 && (
        <div className="p-10 text-center text-gray-600">
          <h3>Nenhum documento encontrado</h3>
          <p>Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
}

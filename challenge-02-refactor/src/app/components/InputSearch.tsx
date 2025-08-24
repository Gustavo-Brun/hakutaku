type InputSearchProps = {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  handleSearch: (value: string) => void;
  handleCategoryChange: (value: string) => void;
  handleSortChange: (value: string) => void;
};

export default function InputSearch({
  searchTerm,
  selectedCategory,
  sortBy,
  handleSearch,
  handleCategoryChange,
  handleSortChange
}: InputSearchProps) {
  return (
    <div className="mb-[30px] flex flex-wrap items-center gap-5">
      <div>
        <label className="mr-[10px] font-bold">Buscar:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Digite para buscar..."
          className="w-[250px] rounded border border-gray-300 p-2 px-3"
        />
      </div>

      <div>
        <label className="mr-[10px] font-bold">Categoria:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded border border-gray-300 p-2 px-3"
        >
          <option value="all">Todas</option>
          <option value="docs">Documentação</option>
          <option value="wiki">Wiki</option>
          <option value="api">API</option>
        </select>
      </div>

      <div>
        <label className="mr-[10px] font-bold">Ordenar por:</label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded border border-gray-300 p-2 px-3"
        >
          <option value="title">Título</option>
          <option value="date">Data</option>
          <option value="author">Autor</option>
        </select>
      </div>
    </div>
  );
}

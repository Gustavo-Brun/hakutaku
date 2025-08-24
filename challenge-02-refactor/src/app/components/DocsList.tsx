import { IDocument } from '../@types';
import FormatDate from '../../utilts/formatDate';
import getCategoryColor from '../../utilts/getCategoryColor';

type DocsListType = {
  filteredDocs: IDocument[];
};

export default function DocsList({ filteredDocs }: DocsListType) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5">
      {filteredDocs.map((doc) => (
        <div
          key={doc.id}
          className="cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-5 transition-transform duration-200"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div className="mb-3 flex items-start justify-between">
            <h3 className="m-0 text-[#333]">{doc.title}</h3>
            <span
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: getCategoryColor(doc.category),
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {doc.category.toUpperCase()}
            </span>
          </div>

          <p className="mb-4 text-gray-600">{doc.content}</p>

          <div className="mb-[10px]">
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className="m-0.5 inline-block rounded-xl bg-gray-300 px-1.5 py-0.5 text-[11px] text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>
              Por: <strong>{doc.author}</strong>
            </span>
            <span>{FormatDate(doc.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

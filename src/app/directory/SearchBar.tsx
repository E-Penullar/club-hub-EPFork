'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchBar({
  initialSearch,
  initialCategory,
}: {
  initialSearch: string;
  initialCategory: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 获取当前的 URL 参数
    const params = new URLSearchParams(searchParams.toString());

    // 处理文本搜索词
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }

    // 处理分类选择
    if (category && category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    // 推送新的 URL，触发服务端重新查询
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="shadow-sm p-3 mb-5 bg-white rounded border">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search clubs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select form-select-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Recreational">Recreational</option>
            <option value="Professional">Professional</option>
            <option value="Cultural">Cultural</option>
            <option value="Service">Service / Volunteering</option>
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <button
            className="btn btn-success btn-lg"
            style={{ backgroundColor: '#024731', borderColor: '#024731' }}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
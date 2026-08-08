import Link from 'next/link';
import prisma from '../../lib/prisma';
import SearchBar from './SearchBar'; 

export const dynamic = 'force-dynamic';

export default async function DirectoryPage({
  searchParams,
}: {
  // 1. 类型定义更新：将 searchParams 声明为 Promise
  searchParams: Promise<{ search?: string; category?: string }>; 
}) {
  // 2. 核心修复：使用 await 等待异步参数解析完成
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || '';
  const categoryQuery = resolvedParams?.category || '';

// 构建 Prisma 查询条件，确保只查 ACTIVE 状态的，并提供严格的类型定义以通过 ESLint 和 Prisma 检查
  const whereCondition: {
    status: 'ACTIVE'; // 核心修复：将 string 改为精确的字面量类型 'ACTIVE'
    category?: string;
    OR?: Array<{
      name?: { contains: string; mode: 'insensitive' };
      description?: { contains: string; mode: 'insensitive' };
    }>;
  } = {
    status: 'ACTIVE',
  };

  // 如果有分类要求，加入 category 查询条件
  if (categoryQuery && categoryQuery !== 'All') {
    whereCondition.category = categoryQuery;
  }

  // 如果有文本搜索要求，加入模糊匹配
  if (searchQuery) {
    whereCondition.OR = [
      {
        name: {
          contains: searchQuery,
          mode: 'insensitive', 
        },
      },
      {
        description: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    ];
  }

  // 从数据库动态读取数据
  const clubs = await prisma.club.findMany({
    where: whereCondition,
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold" style={{ color: '#024731' }}>
        Club Directory
      </h1>

      {/* 渲染搜索与筛选栏 */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <SearchBar initialSearch={searchQuery} initialCategory={categoryQuery} />
        </div>
      </div>

      {/* 社团卡片网格列表 */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {clubs.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No clubs found matching your criteria.</h4>
            <p className="text-muted">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          clubs.map((club) => (
            <div className="col" key={club.id}>
              <div className="card h-100 shadow-sm border-0">
                <div
                  style={{ height: '180px', backgroundColor: '#e9ecef' }}
                  className="d-flex justify-content-center align-items-center rounded-top position-relative"
                >
                  {/* 在图片角落显示类别标签 */}
                  {club.category && (
                    <span 
                      className="badge position-absolute top-0 end-0 m-2" 
                      style={{ backgroundColor: '#024731' }}
                    >
                      {club.category}
                    </span>
                  )}
                  {club.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={club.image}
                      alt={club.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      className="rounded-top"
                    />
                  ) : (
                    <span className="text-secondary">
                      [ Club Image Placeholder ]
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{club.name}</h5>
                  <p className="card-text text-muted">
                    {club.description || 'No description provided.'}
                  </p>
                </div>
                <div className="card-footer bg-white border-top-0 pb-3">
                  <Link
                    href={`/directory/${club.id}`}
                    className="btn btn-outline-success w-100"
                    style={{ color: '#024731', borderColor: '#024731' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
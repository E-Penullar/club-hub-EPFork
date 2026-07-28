import Link from 'next/link';
// 请确保这里的路径能正确指向你的 prisma.ts
import prisma from '../../lib/prisma'; 

export default async function DirectoryPage() {
  // 从数据库动态读取 ACTIVE 状态的社团
  const clubs = await prisma.club.findMany({
    where: {
      status: 'ACTIVE',
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold" style={{ color: '#024731' }}>Club Directory</h1>
      
      {/* 搜索与筛选栏 */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8">
          <div className="input-group input-group-lg shadow-sm">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search for clubs, organizations, or keywords..." 
              aria-label="Search"
            />
            <button className="btn btn-success" style={{ backgroundColor: '#024731', borderColor: '#024731' }} type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 社团卡片网格列表 */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {clubs.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No active clubs found in the database yet.</p>
          </div>
        ) : (
          clubs.map((club) => (
            <div className="col" key={club.id}>
              <div className="card h-100 shadow-sm border-0">
                <div style={{ height: '180px', backgroundColor: '#e9ecef' }} className="d-flex justify-content-center align-items-center rounded-top">
                  {club.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={club.image} 
                      alt={club.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      className="rounded-top" 
                    />
                  ) : (
                    <span className="text-secondary">[ Club Image Placeholder ]</span>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{club.name}</h5>
                  <p className="card-text text-muted">
                    {club.description || "No description provided."}
                  </p>
                </div>
                <div className="card-footer bg-white border-top-0 pb-3">
                  <Link href={`/directory/${club.id}`} passHref legacyBehavior>
                    <a className="btn btn-outline-success w-100" style={{ color: '#024731', borderColor: '#024731' }}>
                      View Details
                    </a>
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
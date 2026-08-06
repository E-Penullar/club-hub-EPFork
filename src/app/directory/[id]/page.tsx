import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma'; // 确保路径正确指向你的 prisma 实例
import Link from 'next/link';

// 这个组件接收 URL 里的动态参数 [id]
export default async function ClubDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // 适配 Next.js 16：等待 params 解析
  const resolvedParams = await params;
  const clubId = resolvedParams.id;

  // 根据 ID 从数据库中查找对应的社团，并关联查询其负责人的信息
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    include: {
      officer: true, // 如果你想展示管理员的名字或邮箱
    },
  });

  // 如果找不到该社团，返回 Next.js 的 404 页面
  if (!club) {
    notFound();
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* 返回按钮 */}
          <Link href="/directory" className="btn btn-outline-secondary mb-4">
            &larr; Back to Directory
          </Link>

          <div className="card shadow border-0">
            {/* 社团图片区域 */}
            <div
              style={{ height: '300px', backgroundColor: '#e9ecef' }}
              className="d-flex justify-content-center align-items-center rounded-top position-relative"
            >
              {club.category && (
                <span className="badge position-absolute top-0 end-0 m-3 fs-6" style={{ backgroundColor: '#024731' }}>
                  {club.category}
                </span>
              )}
              {club.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={club.image}
                  alt={club.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-top"
                />
              ) : (
                <h3 className="text-secondary">[ Club Image Placeholder ]</h3>
              )}
            </div>

            {/* 社团详细信息区域 */}
            <div className="card-body p-5">
              <h1 className="fw-bold mb-3" style={{ color: '#024731' }}>
                {club.name}
              </h1>
              
              <h5 className="text-muted mb-4">About Us</h5>
              <p className="fs-5 mb-5">{club.description || 'No description provided.'}</p>

              <hr />

              <h5 className="text-muted mb-3 mt-4">Meeting Details</h5>
              <ul className="list-unstyled fs-5">
                <li className="mb-2"><strong>Time:</strong> {club.meetingTime || 'TBA'}</li>
                <li className="mb-2"><strong>Location:</strong> {club.location || 'TBA'}</li>
              </ul>
              
              <hr />

              <h5 className="text-muted mb-3 mt-4">Contact Info</h5>
              <p className="fs-5">
                <strong>Email:</strong> {club.email || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
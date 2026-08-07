export const dynamic = 'force-dynamic';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ManageClubPage() {
  // 1. 获取当前登录用户的 Session
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : null;

  // 2. 根据当前登录用户的 ID 查找他所负责的社团
  // 如果是 Admin 或者是对应的 Officer，我们可以通过 officerId 找到精准的社团
  let club = null;
  if (userId) {
    club = await prisma.club.findFirst({
      where: { officerId: userId },
    });
  }

  // 如果没找到专属社团，降级抓取第一个（方便未绑定账号时测试）
  if (!club) {
    club = await prisma.club.findFirst();
  }

  if (!club) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">No club found in the database.</h3>
        <p>Please add a club or assign an officer in Prisma Studio first.</p>
      </div>
    );
  }

  // 3. 写入逻辑 (Server Action)：处理包含多个字段及 Category 的表单提交
  async function updateClubInfo(formData: FormData) {
    'use server'; 

    if (!club) return;
    
    // 从表单中提取所有输入值
    const description = formData.get('description') as string;
    const email = formData.get('email') as string;
    const meetingTime = formData.get('meetingTime') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as string; // 新增：支持保存分类
    
    // 调用 Prisma 更新数据库中对应社团的所有字段
    await prisma.club.update({
      where: { id: club.id },
      data: { 
        description,
        email,
        meetingTime,
        location,
        category
      },
    });

    // 清除页面缓存，让网页即刻显示最新数据
    revalidatePath('/manage-club');
    revalidatePath('/directory');
  }

  // 4. 前端 UI：还原 M1 Mockup 布局，并把 Category 选单带进后台
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold" style={{ color: '#024731' }}>Manage Club Profile</h1>
          <p className="text-muted">
            Managing: <span className="fw-semibold text-dark">{club.name}</span> (Update your organization&apos;s details, category, and meeting times.)
          </p>
        </div>
      </div>
      
      <div className="row g-5">
        {/* 左侧：动态社团信息表单 */}
        <div className="col-md-7">
          <form action={updateClubInfo}>
            <h4 className="fw-bold mb-3" style={{ color: '#024731' }}>Club Information</h4>
            
            <div className="mb-3">
              <label htmlFor="category" className="form-label fw-bold">Club Category</label>
              <select 
                className="form-select" 
                id="category" 
                name="category"
                defaultValue={club.category || 'Academic'}
              >
                <option value="Academic">Academic</option>
                <option value="Professional">Professional</option>
                <option value="Recreational">Recreational</option>
                <option value="Cultural">Cultural</option>
                <option value="Service">Service</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold">Club Description</label>
              <textarea 
                className="form-control" 
                id="description" 
                name="description" 
                rows={4} 
                defaultValue={club.description || ''}
                placeholder="Enter a description of your club..."
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">Contact Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                defaultValue={club.email || ''}
                placeholder="e.g., club@hawaii.edu"
              />
            </div>

            <h4 className="fw-bold mb-3 mt-5" style={{ color: '#024731' }}>Meeting Details</h4>
            
            <div className="mb-3">
              <label htmlFor="meetingTime" className="form-label fw-bold">Meeting Time</label>
              <input 
                type="text" 
                className="form-control" 
                id="meetingTime" 
                name="meetingTime" 
                defaultValue={club.meetingTime || ''}
                placeholder="e.g., Every Friday at 5:00 PM"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="location" className="form-label fw-bold">Meeting Location</label>
              <input 
                type="text" 
                className="form-control" 
                id="location" 
                name="location" 
                defaultValue={club.location || ''}
                placeholder="e.g., POST 101"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-success px-4 py-2 mt-2" 
              style={{ backgroundColor: '#024731', borderColor: '#024731' }}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* 右侧：发布公告 UI 占位 */}
        <div className="col-md-5">
          <div className="card bg-light border-0 p-4">
            <h4 className="fw-bold mb-3" style={{ color: '#024731' }}>Post Announcement</h4>
            <div className="mb-3">
              <label className="form-label fw-bold">Announcement Title</label>
              <input type="text" className="form-control" placeholder="e.g., Upcoming Hackathon!" disabled />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Message</label>
              <textarea className="form-control" rows={4} placeholder="Share the details with your members..." disabled />
            </div>
            <button className="btn btn-outline-success w-100 mt-2" style={{ color: '#024731', borderColor: '#024731' }} disabled>
              Post Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
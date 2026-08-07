export const dynamic = 'force-dynamic';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function AdminDashboardPage() {
  // 1. Fetch real data from the database
  // Fetch pending registrations
  const pendingClubs = await prisma.club.findMany({
    where: { status: 'PENDING' },
    include: { officer: true }, // Include officer to display the applicant's name/email
  });

  // Fetch existing clubs (Active or Inactive)
  const existingClubs = await prisma.club.findMany({
    where: { status: { not: 'PENDING' } },
    include: { officer: true },
  });

  // 2. Define Server Actions for button clicks
  async function approveClub(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.club.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
    revalidatePath('/admin');
    revalidatePath('/directory');
  }

  async function rejectOrDeleteClub(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.club.delete({
      where: { id },
    });
    revalidatePath('/admin');
    revalidatePath('/directory');
  }

  async function toggleClubStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const currentStatus = formData.get('status') as string;
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    
    await prisma.club.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath('/admin');
    revalidatePath('/directory');
  }

  // 3. Render the UI using standard Bootstrap classes (Server-side rendered)
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold" style={{ color: '#024731' }}>Admin Dashboard</h1>
          <p className="text-muted fs-5">Review new registrations and manage the club directory.</p>
        </div>
      </div>

      {/* Pending Registrations Section */}
      <div className="row mb-5">
        <div className="col">
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>Pending Registrations</h3>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-bordered table-hover mb-0 bg-white">
              <thead className="table-light">
                <tr>
                  <th>Club Name</th>
                  <th>Applicant</th>
                  <th>Date Submitted</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingClubs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      No pending registrations at this time.
                    </td>
                  </tr>
                ) : (
                  pendingClubs.map((club) => (
                    <tr key={club.id}>
                      <td className="align-middle fw-bold">{club.name}</td>
                      <td className="align-middle">{club.officer?.email || 'Unknown'}</td>
                      <td className="align-middle">{club.createdAt.toLocaleDateString()}</td>
                      <td className="align-middle text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <form action={approveClub}>
                            <input type="hidden" name="id" value={club.id} />
                            <button type="submit" className="btn btn-success btn-sm">Approve</button>
                          </form>
                          <form action={rejectOrDeleteClub}>
                            <input type="hidden" name="id" value={club.id} />
                            <button type="submit" className="btn btn-danger btn-sm">Reject</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manage Existing Clubs Section */}
      <div className="row">
        <div className="col">
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>Manage Existing Clubs</h3>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-bordered table-hover mb-0 bg-white">
              <thead className="table-light">
                <tr>
                  <th>Club Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {existingClubs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      No active or inactive clubs found.
                    </td>
                  </tr>
                ) : (
                  existingClubs.map((club) => (
                    <tr key={club.id}>
                      <td className="align-middle fw-bold">{club.name}</td>
                      <td className="align-middle">{club.category || 'N/A'}</td>
                      <td className="align-middle">
                        <span className={`badge ${club.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                          {club.status}
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <form action={toggleClubStatus}>
                            <input type="hidden" name="id" value={club.id} />
                            <input type="hidden" name="status" value={club.status} />
                            <button 
                              type="submit" 
                              className={`btn btn-sm ${club.status === 'ACTIVE' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            >
                              {club.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                            </button>
                          </form>
                          <form action={rejectOrDeleteClub}>
                            <input type="hidden" name="id" value={club.id} />
                            <button type="submit" className="btn btn-outline-danger btn-sm">Delete</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
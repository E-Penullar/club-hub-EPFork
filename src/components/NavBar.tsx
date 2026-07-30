"use client";
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session, status } = useSession();
  
  // 从 session 中安全地提取 role
  const userRole = (session?.user as { role?: string })?.role;

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#024731' }} variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} href="/" className="fw-bold">
          Club Hub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* 所有人可见 (游客和所有角色) */}
            <Nav.Link as={Link} href="/directory">Directory</Nav.Link>

            {/* 只要登录了 (Student, Officer, Admin) 就能看 */}
            {status === 'authenticated' && (
              <Nav.Link as={Link} href="/home">My Dashboard</Nav.Link>
            )}

            {/* 仅 OFFICER 和 ADMIN 可见 */}
            {status === 'authenticated' && (userRole === 'OFFICER' || userRole === 'ADMIN') && (
              <Nav.Link as={Link} href="/manage-club">Manage Club</Nav.Link>
            )}

            {/* 仅 ADMIN 可见 */}
            {status === 'authenticated' && userRole === 'ADMIN' && (
              <Nav.Link as={Link} href="/admin">System Admin</Nav.Link>
            )}

            {/* 登录/登出按钮动态切换 */}
            {status === 'authenticated' ? (
              <Button variant="outline-light" size="sm" className="ms-3" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out ({session.user?.email})
              </Button>
            ) : (
              <Button variant="light" size="sm" className="ms-3" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
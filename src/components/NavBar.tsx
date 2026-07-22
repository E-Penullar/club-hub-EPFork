"use client";
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#024731' }} variant="dark" className="shadow-sm">
      <Container>
        {/* 左侧 Logo，点击回到首页 */}
        <Navbar.Brand as={Link} href="/" className="fw-bold">
          Club Hub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* 这里的 href 对应了我们之前创建的各个文件夹名称 */}
            <Nav.Link as={Link} href="/directory">Directory</Nav.Link>
            <Nav.Link as={Link} href="/home">My Dashboard</Nav.Link>
            <Nav.Link as={Link} href="/manage-club">Manage Club</Nav.Link>
            <Nav.Link as={Link} href="/admin">System Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
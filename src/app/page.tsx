"use client";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { signIn } from 'next-auth/react';

export default function LandingPage() {
  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        {/* 左侧：深绿色背景与文字说明 */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center text-white" style={{ backgroundColor: '#024731' }}>
          <div className="p-5 text-center">
            <h1 className="display-3 fw-bold mb-4">Club Hub</h1>
            <p className="lead mb-5">
              The centralized directory to connect students at the University of Hawaiʻi at Mānoa with campus organizations, clubs, and extracurricular activities.
            </p>
            {/* 模拟的 UHM Login 按钮 */}
            <Button variant="light" size="lg" className="fw-bold px-5 py-3" onClick={() => signIn()}>
              Login via UHM Account
            </Button>
          </div>
        </Col>

        {/* 右侧：白色背景与占位插图 */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center bg-white">
          <div className="text-center p-5">
            <h2 className="mb-4" style={{ color: '#024731' }}>Discover Your Community</h2>
            <p className="text-muted mb-4">
              Explore hundreds of academic, recreational, and cultural organizations tailored to your interests.
            </p>
            <div 
              style={{ width: '100%', maxWidth: '400px', height: '300px', backgroundColor: '#e9ecef', borderRadius: '8px' }}
              className="d-flex justify-content-center align-items-center mx-auto"
            >
              <span className="text-secondary">[ UH Campus / Student Activity Graphic Placeholder ]</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
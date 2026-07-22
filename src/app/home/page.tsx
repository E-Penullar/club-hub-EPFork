"use client";
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

export default function UserHomePage() {
  return (
    <Container className="py-5">
      {/* 顶部欢迎语 */}
      <Row className="mb-5">
        <Col>
          <h1 className="fw-bold" style={{ color: '#024731' }}>Welcome back, Student!</h1>
          <p className="text-muted fs-5">Here is your personalized dashboard and recent club updates.</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* 左侧：我加入的社团列表 */}
        <Col md={8}>
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>My Clubs</h3>
          
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center p-4">
              <div>
                <Card.Title className="fw-bold mb-1">Engineers' Council</Card.Title>
                <Card.Text className="text-muted mb-0">Member since Fall 2025</Card.Text>
              </div>
              <Button variant="outline-success" style={{ color: '#024731', borderColor: '#024731' }}>
                View Dashboard
              </Button>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center p-4">
              <div>
                <Card.Title className="fw-bold mb-1">UH Esports</Card.Title>
                <Card.Text className="text-muted mb-0">Member since Spring 2026</Card.Text>
              </div>
              <Button variant="outline-success" style={{ color: '#024731', borderColor: '#024731' }}>
                View Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* 右侧：近期通知与提醒 */}
        <Col md={4}>
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>Notifications</h3>
          
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body className="p-4">
              <ul className="list-unstyled mb-0">
                <li className="mb-4 pb-3 border-bottom">
                  <Badge bg="danger" className="me-2 mb-2">Urgent</Badge>
                  <div className="fw-bold">Engineers' Council</div>
                  <div className="text-muted small">General Meeting tomorrow at 5:00 PM in POST 101.</div>
                </li>
                <li className="mb-4 pb-3 border-bottom">
                  <Badge className="me-2 mb-2" style={{ backgroundColor: '#024731' }}>Reminder</Badge>
                  <div className="fw-bold">UH Esports</div>
                  <div className="text-muted small">Tournament registration closes tonight at midnight!</div>
                </li>
                <li>
                  <Badge bg="secondary" className="me-2 mb-2">System</Badge>
                  <div className="fw-bold">Club Hub Admin</div>
                  <div className="text-muted small">Please update your profile picture for the new semester.</div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
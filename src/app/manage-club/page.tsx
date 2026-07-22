"use client";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function ClubAdminPage() {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold" style={{ color: '#024731' }}>Manage Club Profile</h1>
          <p className="text-muted fs-5">Update your organization's details, meeting times, and announcements.</p>
        </Col>
      </Row>

      <Row>
        {/* 左侧：编辑社团简介与开会信息 (Task 1 & 2) */}
        <Col md={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4" style={{ color: '#024731' }}>Club Information</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Club Description</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter a description of your club..." />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Contact Email</Form.Label>
                  <Form.Control type="email" placeholder="e.g., club@hawaii.edu" />
                </Form.Group>

                <hr className="my-4" />

                <h4 className="fw-bold mb-4" style={{ color: '#024731' }}>Meeting Details</h4>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Meeting Time</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Every Friday at 5:00 PM" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Meeting Location</Form.Label>
                  <Form.Control type="text" placeholder="e.g., POST 101" />
                </Form.Group>

                <Button variant="success" style={{ backgroundColor: '#024731', borderColor: '#024731' }}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* 右侧：发布公告 (Task 3) */}
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4" style={{ color: '#024731' }}>Post Announcement</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Announcement Title</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Upcoming Hackathon!" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Share the details with your members..." />
                </Form.Group>
                <Button variant="outline-success" className="w-100" style={{ color: '#024731', borderColor: '#024731' }}>
                  Post Now
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
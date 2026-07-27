"use client";
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';

export default function DirectoryPage() {
  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center fw-bold" style={{ color: '#024731' }}>Club Directory</h1>
      
      {/* 搜索与筛选栏 */}
      <Row className="mb-5 justify-content-center">
        <Col md={8}>
          <InputGroup size="lg" className="shadow-sm">
            <Form.Control 
              placeholder="Search for clubs, organizations, or keywords..." 
              aria-label="Search"
            />
            <Button variant="success" style={{ backgroundColor: '#024731', borderColor: '#024731' }}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* 社团卡片网格列表 */}
      <Row xs={1} md={2} lg={3} className="g-4">
        
        {/* 模拟卡片 1 */}
        <Col>
          <Card className="h-100 shadow-sm border-0">
            <div style={{ height: '180px', backgroundColor: '#e9ecef' }} className="d-flex justify-content-center align-items-center rounded-top">
              <span className="text-secondary">[ Club Image Placeholder ]</span>
            </div>
            <Card.Body>
              <Card.Title className="fw-bold">Engineers&apos; Council</Card.Title>
              <Card.Text className="text-muted">
                Supporting engineering students through networking, professional development, and community building projects.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0 pb-3">
              <Button variant="outline-success" className="w-100" style={{ color: '#024731', borderColor: '#024731' }}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* 模拟卡片 2 */}
        <Col>
          <Card className="h-100 shadow-sm border-0">
            <div style={{ height: '180px', backgroundColor: '#e9ecef' }} className="d-flex justify-content-center align-items-center rounded-top">
              <span className="text-secondary">[ Club Image Placeholder ]</span>
            </div>
            <Card.Body>
              <Card.Title className="fw-bold">UH Esports</Card.Title>
              <Card.Text className="text-muted">
                The official competitive gaming and esports organization, hosting weekly tournaments and casual gaming events.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0 pb-3">
              <Button variant="outline-success" className="w-100" style={{ color: '#024731', borderColor: '#024731' }}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* 模拟卡片 3 */}
        <Col>
          <Card className="h-100 shadow-sm border-0">
            <div style={{ height: '180px', backgroundColor: '#e9ecef' }} className="d-flex justify-content-center align-items-center rounded-top">
              <span className="text-secondary">[ Club Image Placeholder ]</span>
            </div>
            <Card.Body>
              <Card.Title className="fw-bold">Hawaiian Language Club</Card.Title>
              <Card.Text className="text-muted">
                Dedicated to the preservation, practice, and celebration of the Hawaiian language and cultural heritage on campus.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0 pb-3">
              <Button variant="outline-success" className="w-100" style={{ color: '#024731', borderColor: '#024731' }}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}
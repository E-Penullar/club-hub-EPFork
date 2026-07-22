"use client";
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';

export default function AdminDashboardPage() {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold" style={{ color: '#024731' }}>Admin Dashboard</h1>
          <p className="text-muted fs-5">Review new registrations and manage the club directory.</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>Pending Registrations</h3>
          <div className="table-responsive shadow-sm rounded">
            <Table striped bordered hover className="mb-0 bg-white">
              <thead className="table-light">
                <tr>
                  <th>Club Name</th>
                  <th>Applicant</th>
                  <th>Date Submitted</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle fw-bold">Data Science Society</td>
                  <td className="align-middle">Jane Doe</td>
                  <td className="align-middle">Oct 24, 2026</td>
                  <td className="align-middle text-center">
                    <Button variant="success" size="sm" className="me-2">Approve</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle fw-bold">UH Robotics</td>
                  <td className="align-middle">John Smith</td>
                  <td className="align-middle">Oct 25, 2026</td>
                  <td className="align-middle text-center">
                    <Button variant="success" size="sm" className="me-2">Approve</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="fw-bold mb-3" style={{ color: '#024731' }}>Manage Existing Clubs</h3>
          <div className="table-responsive shadow-sm rounded">
            <Table striped bordered hover className="mb-0 bg-white">
              <thead className="table-light">
                <tr>
                  <th>Club Name</th>
                  <th>Status</th>
                  <th>Members</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle fw-bold">Engineers' Council</td>
                  <td className="align-middle"><Badge bg="success">Active</Badge></td>
                  <td className="align-middle">124</td>
                  <td className="align-middle text-center">
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button variant="outline-danger" size="sm">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle fw-bold">UH Esports</td>
                  <td className="align-middle"><Badge bg="success">Active</Badge></td>
                  <td className="align-middle">85</td>
                  <td className="align-middle text-center">
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button variant="outline-danger" size="sm">Delete</Button>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle fw-bold">Hawaiian Language Club</td>
                  <td className="align-middle"><Badge bg="secondary">Inactive</Badge></td>
                  <td className="align-middle">32</td>
                  <td className="align-middle text-center">
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button variant="outline-danger" size="sm">Delete</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
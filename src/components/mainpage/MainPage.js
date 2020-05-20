import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";

import DocumentTable from "../documentTable/DocumentTable"

class MainPage extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Simulação de Transição de Estados de um Documento
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <DocumentTable />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MainPage;

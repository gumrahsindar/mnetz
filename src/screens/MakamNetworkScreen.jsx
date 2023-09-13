import AhenkNavbar from '../components/Navbar'
import VerticalDropdown from '../components/VerticalDropdownGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MakamNetworkScreen() {
  return (
    <>
      <AhenkNavbar />
      <div>MakamNetworkScreen</div>
      <Container fluid>
        <Row>
          <Col>
            <VerticalDropdown title={'makam 1'} />
          </Col>
          <Col>
            <VerticalDropdown title={'makam 2'} />
          </Col>
          <Col>
            <VerticalDropdown title={'makam 3'} />
          </Col>
          <Col xs={8}></Col>
        </Row>
      </Container>
    </>
  )
}

export default MakamNetworkScreen

import VerticalDropdown from '../components/VerticalDropdownGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MakamControlDropdown({ availableMakams, handleSelect }) {
  return (
    <div>
      <Container fluid className='ms-4'>
        <Row>
          <Col>
            <VerticalDropdown
              title={'Add Makam to the Network'}
              items={availableMakams}
              handleSelect={handleSelect}
            />
          </Col>
          <Col md={10}></Col>
        </Row>
      </Container>
    </div>
  )
}

export default MakamControlDropdown

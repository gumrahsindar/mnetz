import { useEffect, useState, useCallback } from 'react'
import Makam3D from '../components/Makam3d'
import Makam2D from '../components/Makam2d'
import axios from 'axios'
import AhenkNavbar from '../components/Navbar'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import MakamDropdownMenu, {
  SelectionDropdownMenu,
} from '../components/Dropdown'
import MakamInCesniNetwork3D from '../components/MakamInCesniNetwork3d'
import MakamInCesniNetwork2D from '../components/MakamInCesniNetwork2d'
import MakamTopology2D from '../components/MakamTopology2d'
import { forceManyBody } from 'd3-force'
import DimensionButtons from '../components/DimensionButtons'

function MakamScreen({ routing, handleScreen, screen }) {
  const style = { color: 'white' }
  const [makam, setMakam] = useState({})
  const [allMakams, setAllMakams] = useState([])
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [displayStyle, setDisplayStyle] = useState(0)

  useEffect(() => {
    async function fetchMakams() {
      const { data } = await axios.get(routing)
      // console.log("data", data);
      setAllMakams(data)
      setMakam(data[0])
    }

    async function fetchCesniNetwork() {
      const { data } = await axios.get(
        'https://recepgul82.pythonanywhere.com/cesni_all/?format=json'
      )
      setNodes(data.nodes)
      setLinks(data.links)
    }

    fetchCesniNetwork()
    fetchMakams()
  }, [routing])

  function handleSelectMakam(index) {
    setMakam(allMakams[index])
  }

  function handleDisplayStyle(index) {
    console.log('display before: ', displayStyle)
    setDisplayStyle(index)
    console.log('display after: ', displayStyle)
  }

  const handleStrength = useCallback((reference) => {
    reference.current.d3Force('charge', forceManyBody().strength(-700))
  }, [])

  function switchDisplay(displayStyle) {
    switch (displayStyle) {
      case 0:
        return (
          <div>
            {screen === '2d' ? (
              <Makam2D makam={makam} adjustStrength={handleStrength} />
            ) : (
              <Makam3D makam={makam} adjustStrength={handleStrength} />
            )}
          </div>
        )
      case 1:
        return (
          <div>
            {screen === '2d' ? (
              <MakamInCesniNetwork2D
                makam={makam}
                nodes={nodes}
                links={links}
              />
            ) : (
              <MakamInCesniNetwork3D
                makam={makam}
                nodes={nodes}
                links={links}
              />
            )}
          </div>
        )
      case 2:
        return (
          <div>
            {<MakamTopology2D makam={makam} nodes={nodes} links={links} />}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {allMakams.length > 0 && (
        <Container fluid>
          <AhenkNavbar />
          <Row className='my-3 d-flex justify-content-end'>
            <Col lg={2}>
              <MakamDropdownMenu
                makamList={allMakams}
                handleSelect={handleSelectMakam}
              />
            </Col>
            <Col lg={2}>
              <SelectionDropdownMenu
                dropdownName={'Display Style'}
                options={[
                  'single',
                  'inside cesni network',
                  'relations and transformations',
                ]}
                handleSelect={handleDisplayStyle}
              />
            </Col>
            <Col lg={2}>
              <DimensionButtons handleScreen={handleScreen} />
            </Col>
            <Col lg={4}>
              <h1 style={style}>
                {makam.nodes.length > 0 && (
                  <Badge bg='warning' text='dark'>
                    {makam.isim} Makamı
                  </Badge>
                )}
              </h1>
            </Col>
          </Row>
          {switchDisplay(displayStyle)}
        </Container>
      )}
    </div>
  )
}

export default MakamScreen

import { useEffect, useState, useCallback } from 'react'
import Makam3D from '../components/Makam3d'
import Makam2D from '../components/Makam2d'
import axios from 'axios'
import { Container, Row, Col, Badge, Spinner, Image } from 'react-bootstrap'
import MakamDropdownMenu, {
  SelectionDropdownMenu,
} from '../components/Dropdown'
import MakamInCesniNetwork3D from '../components/MakamInCesniNetwork3d'
import MakamInCesniNetwork2D from '../components/MakamInCesniNetwork2d'
import { forceManyBody } from 'd3-force'
import DimensionButtons from '../components/DimensionButtons'
import AudioPlayer from '../components/AudioPlayer'
import { MakamTopology2D } from '../components/MakamTopology2d'

function MakamScreen({ handleScreen, screen }) {
  const style = { color: 'white' }
  const [makam, setMakam] = useState({})
  const [allMakams, setAllMakams] = useState([])
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayStyle, setDisplayStyle] = useState(0)
  const [selectedNode, setSelectedNode] = useState()
  const [cooldownTicks, setCooldownTicks] = useState(undefined)

  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true)
  //     try {
  //       const response = await axios.get(url)
  //       const { data } = response

  //       if (data) {
  //         setAllMakams(data)
  //         setMakam(data[0])
  //         if (data.nodes) {
  //           setNodes(data.nodes)
  //         }
  //         if (data.links) {
  //           setLinks(data.links)
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     setIsLoading(false)
  //   }

  //   fetchData()
  // }, [url])

  useEffect(() => {
    console.log('makam screen effect rendered')

    async function fetchMakams() {
      try {
        const { data } = await axios.get(
          'https://recepgul82.pythonanywhere.com/makam_all/?format=json'
        )
        setAllMakams(data)
        setMakam(data[0])
      } catch (error) {
        console.error('Makam verileri alınırken hata oluştu:', error)
      }
    }

    async function fetchCesniNetwork() {
      try {
        const { data } = await axios.get(
          'https://recepgul82.pythonanywhere.com/cesni_all/?format=json'
        )
        setNodes(data.nodes)
        setLinks(data.links)
      } catch (error) {
        console.error('Cesni ağı verileri alınırken hata oluştu:', error)
      }
    }

    setIsLoading(true)
    Promise.all([fetchMakams(), fetchCesniNetwork()])
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Bir veya daha fazla istek başarısız oldu:', error)
        setIsLoading(false)
      })
  }, [])

  function handleSelectMakam(index) {
    setMakam(allMakams[index])
  }

  function handleDisplayStyle(index) {
    setDisplayStyle(index)
  }

  function handleSelectedNode(e) {
    if (e) {
      setSelectedNode(e)
    }
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
              <Makam2D
                makam={makam}
                adjustStrength={handleStrength}
                handleSelectedNode={handleSelectedNode}
                setCooldownTicks={setCooldownTicks}
                cooldownTicks={cooldownTicks}
              />
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
            {
              <MakamTopology2D
                makams={[makam]}
                nodes={nodes}
                links={links}
                handleSelectedNode={handleSelectedNode}
                cooldownTicks={cooldownTicks}
              />
            }
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {isLoading ? (
        <Container fluid className='text-center mt-5'>
          <Spinner animation='border' role='status' variant='info'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <Container fluid>
          <Row className='my-1 d-flex justify-content-end mx-auto'>
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
              <h4 style={style}>
                {makam && makam.nodes && makam.nodes.length > 0 && (
                  <Badge bg='warning' text='dark'>
                    {makam.isim} Makamı
                  </Badge>
                )}
              </h4>
            </Col>
          </Row>
          <Row className='py-3'>
            {selectedNode && (
              <div>
                <Image src={selectedNode.scores[0]} thumbnail />
                <AudioPlayer source={selectedNode.recordings[0]} />
              </div>
            )}

            <Col lg={9}>{switchDisplay(displayStyle)}</Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default MakamScreen

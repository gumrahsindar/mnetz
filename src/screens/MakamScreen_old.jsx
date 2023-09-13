import {
  initialEdges,
  initialNodes,
  agazeStyle,
  seyirStyle,
  kararStyle,
} from '../graph_models/makamModel'
import { useState, useEffect } from 'react'
import VisNetwork from '../components/VisNetwork'
import { addNodesToModel, addEdgesToModel } from '../utilities/utilities'
import AhenkNavbar from '../components/Navbar'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import DropdownMenu from '../components/Dropdown'
import axios from 'axios'

function MakamModelScreen() {
  const style = { color: 'white' }

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [makams, setMakams] = useState([])
  const [makam, setMakam] = useState({})

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get('/makam_all/')
      setMakams(data)
    }
    fetchProducts()
  }, [])

  // This can be rewritten, and be taken into another file.
  // section is agaze,
  function addNodesAndEdges(section, sectionId, style) {
    const nodes = section.map((cesni) => {
      const cesniId = sectionId + '_' + cesni.id
      return {
        id: cesniId,
        label: cesni.perde_cesni,
        font: style.font,
        group: style.group,
        color: style.color,
      }
    })

    const edges = section.map((cesni) => {
      // TODO: create a utility function to create Makam and Section Id
      const cesniId = sectionId + '_' + cesni.id
      return { from: cesniId, to: sectionId }
    })

    setNodes((prevNodes) => addNodesToModel(prevNodes, nodes))
    setEdges((prevEdges) => addEdgesToModel(prevEdges, edges))
  }

  function handleSelectMakam(makamIndex) {
    let nextMakam = makams[makamIndex]
    setMakam(nextMakam)

    // Construct initial Agaze-Seyir-Karar Nodes
    setNodes([])
    setNodes((prevNodes) => {
      const newNodes = initialNodes.map((section) => ({
        ...section,
        id: `${nextMakam.id}_${section.id}`,
      }))
      return addNodesToModel(prevNodes, newNodes)
    })

    // Draw edges between the initial nodes
    setEdges([])
    setEdges((prevEdges) => {
      const newEdges = initialEdges.map((edge) => ({
        ...edge,
        from: `${nextMakam.id}_${edge.from}`,
        to: `${nextMakam.id}_${edge.to}`,
      }))
      return addEdgesToModel(prevEdges, newEdges)
    })

    const agaze = [...nextMakam.agaze.baslangic, ...nextMakam.agaze.genisleme]
    const seyir = [...nextMakam.seyir.anaseyir, ...nextMakam.seyir.genisleme]
    const karar = [...nextMakam.karar.karar, ...nextMakam.karar.yeden]
    addNodesAndEdges(agaze, `${nextMakam.id}_agz`, agazeStyle)
    addNodesAndEdges(seyir, `${nextMakam.id}_syr`, seyirStyle)
    addNodesAndEdges(karar, `${nextMakam.id}_krr`, kararStyle)
  }

  return (
    <div>
      <Container>
        <AhenkNavbar />
        <Row className='py-3'>
          <Col lg={2}>
            <DropdownMenu makamList={makams} handleSelect={handleSelectMakam} />
          </Col>
          <Col lg={10}>
            <h1 style={style}>
              {nodes.length > 0 && (
                <Badge bg='warning' text='dark'>
                  {makam.isim} Makamı
                </Badge>
              )}
            </h1>
          </Col>
        </Row>

        <VisNetwork nodes={nodes} edges={edges} />
      </Container>
    </div>
  )
}

export default MakamModelScreen

import CesniNetwork3D from '../components/CesniNetwork3d'
import CesniNetwork2D from '../components/CesniNetwork2d'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AhenkNavbar from '../components/Navbar'
import { Container } from 'react-bootstrap'
import DimensionButtons from '../components/DimensionButtons'

function CesniNetworkScreen({ routing, handleScreen, screen }) {
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])

  useEffect(() => {
    async function fetchCesniNetwork() {
      const { data } = await axios.get(routing)
      setNodes(data.nodes)
      setLinks(data.links)
    }
    fetchCesniNetwork()
  }, [routing])

  return (
    <>
      <Container fluid style={{ margin: 0 }}>
        <AhenkNavbar />
        <DimensionButtons handleScreen={handleScreen} />
        {screen === '2d' ? (
          <div>
            <CesniNetwork2D nodes={nodes} links={links} />
          </div>
        ) : (
          <div>
            <CesniNetwork3D nodes={nodes} links={links} />
          </div>
        )}
      </Container>
    </>
  )
}

export default CesniNetworkScreen

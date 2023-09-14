import CesniNetwork3D from '../components/CesniNetwork3d'
import CesniNetwork2D from '../components/CesniNetwork2d'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Spinner } from 'react-bootstrap' // Import Spinner
import DimensionButtons from '../components/DimensionButtons'

const url = 'https://recepgul82.pythonanywhere.com/cesni_all/?format=json'

function CesniNetworkScreen({ handleScreen, screen }) {
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add isLoading state

  useEffect(() => {
    async function fetchCesniNetwork() {
      try {
        const { data } = await axios.get(url)
        setNodes(data.nodes)
        setLinks(data.links)
        setIsLoading(false) // Set isLoading to false when data is fetched
      } catch (error) {
        console.error(error)
      }
    }
    fetchCesniNetwork()
  }, [])

  return (
    <>
      <Container fluid>
        <DimensionButtons handleScreen={handleScreen} />
        {isLoading ? ( // Check if isLoading is true
          <div className='text-center mt-5'>
            <Spinner animation='border' role='status' variant='info'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : // Render your CesniNetwork2D or CesniNetwork3D components here
        screen === '2d' ? (
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

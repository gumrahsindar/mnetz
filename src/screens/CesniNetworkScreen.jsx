import CesniNetwork3D from '../components/CesniNetwork3d'
import CesniNetwork2D from '../components/CesniNetwork2d'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Spinner } from 'react-bootstrap' // Import Spinner
import DimensionButtons from '../components/DimensionButtons'

const url = 'https://recepgul82.pythonanywhere.com/cesni_all/?format=json'

function CesniNetworkScreen({ handleScreen, screen }) {
  const [allNodes, setAllNodes] = useState([])
  const [allLinks, setAllLinks] = useState([])
  const [selectedNode, setSelectedNode] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNodesLinks() {
      try {
        setIsLoading(true)

        const { data } = await axios.get(url)
        setAllNodes(data.nodes)
        setAllLinks(data.links)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    fetchNodesLinks()
  }, [])

  function handleSelectedNode(e) {
    console.log('selected node: ', e)
  }

  return (
    <>
      <Container fluid>
        <DimensionButtons handleScreen={handleScreen} />
        {isLoading ? (
          <div className='text-center mt-5'>
            <Spinner animation='border' role='status' variant='info'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : screen === '2d' ? (
          <div>
            <CesniNetwork2D
              nodes={allNodes}
              links={allLinks}
              handleSelectedNode={handleSelectedNode}
            />
          </div>
        ) : (
          <div>
            <CesniNetwork3D nodes={allNodes} links={allLinks} />
          </div>
        )}
      </Container>
    </>
  )
}

export default CesniNetworkScreen

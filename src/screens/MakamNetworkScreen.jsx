import { useState, useEffect } from 'react'
import axios from 'axios'
import MakamControlDropdown from '../components/MakamControlDropdown'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import RemovableListItems from '../components/RemovableListItems'
import { MakamTopologyDynamic2D } from '../components/MakamTopology2d'

function MakamNetworkScreen() {
  const [allNodes, setAllNodes] = useState([])
  const [allLinks, setAllLinks] = useState([])
  const [availableMakams, setAvailableMakams] = useState([])
  const [usedMakams, setUsedMakams] = useState([])
  const [ALLMAKAMS, setALLMAKAMS] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const [makamsResponse, nodesLinksResponse] = await Promise.all([
          axios.get(
            'https://recepgul82.pythonanywhere.com/makam_all/?format=json'
          ),
          axios.get(
            'https://recepgul82.pythonanywhere.com/cesni_all/?format=json'
          ),
        ])

        setAvailableMakams(makamsResponse.data)
        setALLMAKAMS(makamsResponse.data)
        setAllNodes(nodesLinksResponse.data.nodes)
        setAllLinks(nodesLinksResponse.data.links)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  function handleSelect(e) {
    if (!usedMakams.find((item) => item.id === parseInt(e))) {
      const selectedMakam = availableMakams.find(
        (item) => item.id === parseInt(e)
      )

      setUsedMakams((prevUsedMakams) => [...prevUsedMakams, selectedMakam])
      setAvailableMakams((prevAvailableMakams) =>
        prevAvailableMakams.filter((item) => item.id !== parseInt(e))
      )
    }
  }

  function handleRemove(e) {
    const removedMakam = ALLMAKAMS.find(
      (item) => item.id === parseInt(e.target.value)
    )
    setUsedMakams(usedMakams.filter((item) => item !== removedMakam))
    setAvailableMakams([...availableMakams, removedMakam])
  }

  return (
    <>
      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' variant='info' />
        </div>
      ) : (
        <Container fluid>
          <div className='ms-5 my-1'>MakamNetworkScreen</div>

          <Row>
            {availableMakams && (
              <MakamControlDropdown
                availableMakams={availableMakams}
                handleSelect={handleSelect}
              />
            )}
          </Row>
          <Row>
            <Col lg={2}>
              {usedMakams.length > 0 && (
                <RemovableListItems
                  items={usedMakams}
                  handleRemove={handleRemove}
                />
              )}
            </Col>
            <Col lg={10}>
              {allNodes && (
                <MakamTopologyDynamic2D
                  makams={usedMakams}
                  nodes={allNodes}
                  links={allLinks}
                />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default MakamNetworkScreen

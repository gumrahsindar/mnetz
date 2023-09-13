import CesniNetwork2D from './CesniNetwork2d'
import { useState, useEffect } from 'react'

function MakamTopology2D({ makam, nodes, links }) {
  const [makamNodes, setMakamNodes] = useState([])
  const [makamLinks, setMakamLinks] = useState([])

  useEffect(() => {
    let makamNodesList = new Set(makam.nodes.map((item) => item.cesni_id))
    setMakamNodes(nodes.filter((item) => makamNodesList.has(item.id)))
    setMakamLinks(
      links.filter((item) => {
        if (
          makamNodesList.has(item.source) &&
          makamNodesList.has(item.target)
        ) {
          return true
        } else {
          return false
        }
      })
    )
    console.log('makam nodes', makamNodes)
  }, [makam])

  return (
    <div>
      <CesniNetwork2D nodes={makamNodes} links={makamLinks} />
    </div>
  )
}

export default MakamTopology2D

import CesniNetwork2D from './CesniNetwork2d'
import { useState, useEffect } from 'react'

export default function MakamTopology2D({
  makams,
  nodes,
  links,
  handleSelectedNode,
  cooldownTicks,
}) {
  return (
    <NodesAndLinks
      makams={makams}
      makamparams={makams[0].id}
      nodes={nodes}
      links={links}
      handleSelectedNode={handleSelectedNode}
      cooldownTicks={cooldownTicks}
    />
  )
}

function MakamTopologyDynamic2D({
  makams,
  nodes,
  links,
  handleSelectedNode,
  cooldownTicks,
}) {
  return (
    <NodesAndLinks
      makams={makams}
      makamparams={makams.map((makam) => makam.id)}
      nodes={nodes}
      links={links}
      handleSelectedNode={handleSelectedNode}
      cooldownTicks={cooldownTicks}
    />
  )
}

function NodesAndLinks({
  makams,
  makamparams,
  nodes,
  links,
  cooldownTicks,
  handleSelectedNode,
}) {
  const [makamNodes, setMakamNodes] = useState([])
  const [makamLinks, setMakamLinks] = useState([])

  useEffect(() => {
    setNodesAndLinks()
  }, [makamparams])

  function setNodesAndLinks() {
    let makamNodesSet = new Set()
    for (let i = 0; i < makams.length; i++) {
      makams[i].nodes.map((item) => makamNodesSet.add(item.cesni_id))
    }

    setMakamNodes(nodes.filter((item) => makamNodesSet.has(item.id)))
    setMakamLinks(
      links.filter((item) => {
        if (makamNodesSet.has(item.source) && makamNodesSet.has(item.target)) {
          return true
        } else {
          return false
        }
      })
    )
  }

  return (
    <div>
      <CesniNetwork2D
        nodes={makamNodes}
        links={makamLinks}
        handleSelectedNode={handleSelectedNode}
        cooldown={cooldownTicks}
      />
    </div>
  )
}

export { MakamTopology2D, MakamTopologyDynamic2D }

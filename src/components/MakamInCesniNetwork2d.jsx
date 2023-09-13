import { useRef, useEffect, useState, useCallback } from 'react'
import { ForceGraph2D } from 'react-force-graph'
import { forceManyBody } from 'd3-force'

function MakamInCesniNetwork2D({ nodes, links, makam }) {
  const fgRef = useRef()
  const LINKWIDTH = 0.3
  const DEFAULTLINKCOLOR = '#a7a7d1'
  const NODE_RADIUS = 8

  const highlightNode = (node) => {
    let color
    makam.nodes.map((makamNode) => {
      if (makamNode.cesni_id === node.id) {
        color = 'red'
      }
    })
    return color
  }

  const gDataLinks = links.map((link, index) => ({
    id: index,
    source: link.source,
    target: link.target,
    width: LINKWIDTH,
    highlighted: 0,
  }))
  const gDataNodes = nodes.map((node) =>
    node.category === 'cesni'
      ? { ...node, level: 1, color: highlightNode(node) }
      : { ...node, level: 2, color: highlightNode(node) }
  )

  const [data, setData] = useState({ nodes: [], links: [] })
  const [cooldownTicks, setCooldownTicks] = useState(undefined)

  useEffect(() => {
    setCooldownTicks()
    setData({ nodes: gDataNodes, links: gDataLinks })
    adjustStrength(fgRef)
  }, [makam])

  function adjustStrength() {
    fgRef.current.d3Force('charge', forceManyBody().strength(-500))
  }

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeRelSize={NODE_RADIUS}
      backgroundColor={'white'}
      nodeVal={(node) => Math.pow(node.level, 1.5)}
      linkColor={(d) => (d.highlighted === 1 ? d.linkColor : DEFAULTLINKCOLOR)}
      linkWidth={(d) => d.width}
      nodeDrag={false}
      linkHoverPrecision={10}
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={useCallback((node, ctx) => {
        const label = node.name
        ctx.font = '8px Sans-Serif'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, node.x - 10, node.y + 20)
      }, [])}
      autoPauseRedraw={false}
      cooldownTicks={cooldownTicks}
    />
  )
}

export default MakamInCesniNetwork2D

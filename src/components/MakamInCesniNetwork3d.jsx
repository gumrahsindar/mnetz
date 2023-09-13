import SpriteText from 'three-spritetext'
import { useRef, useCallback } from 'react'
import { ForceGraph3D } from 'react-force-graph'

export default function MakamInCesniNetwork3D({ makam, nodes, links }) {
  const highlightNode = (node) => {
    let color
    makam.nodes.map((makamNode) => {
      if (makamNode.cesni_id === node.id) {
        color = 'red'
      }
    })
    return color
  }

  const gDataLinks = links.map((link) => ({
    source: link.source,
    target: link.target,
    linkColor: link.transformation,
  }))
  const gDataNodes = nodes.map((node) => {
    const nodeColor = highlightNode(node)
    return node.category === 'cesni'
      ? { ...node, level: 1, color: nodeColor }
      : { ...node, level: 2, color: nodeColor }
  })

  const gData = { nodes: gDataNodes, links: gDataLinks }

  const fgRef = useRef()

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      )
    },
    [fgRef]
  )

  console.log('makam', makam)

  return (
    <div>
      <ForceGraph3D
        ref={fgRef}
        graphData={gData}
        linkWidth={0.4}
        backgroundColor={'white'}
        nodeVal={(node) => Math.pow(node.level, 3)}
        nodeOpacity={0.6}
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.name)
          sprite.textHeight = 2
          sprite.color = 'black'
          sprite.position.y = -10
          return sprite
        }}
        onNodeClick={handleClick}
      />
    </div>
  )
}

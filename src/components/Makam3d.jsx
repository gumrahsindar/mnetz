import SpriteText from 'three-spritetext'
import { useRef, useCallback } from 'react'
import { ForceGraph3D } from 'react-force-graph'

export default function Makam3D({ makam }) {
  const colors = {
    agazeColor: '#34b1eb',
    agazeGenisColor: '#62419c',
    seyirColor: '#a89432',
    seyirGenisColor: '#ad7a26',
    kararColor: '#a8323a',
    yedenColor: '#e86b68',
  }

  const gDataLinks = makam.links.map((link) => ({
    source: link.source,
    target: link.target,
    linkColor: colors[link.linkColor],
  }))
  const gDataNodes = makam.nodes.map((node) => ({
    ...node,
    color: colors[node.color],
  }))
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

  return (
    <div>
      <ForceGraph3D
        ref={fgRef}
        graphData={gData}
        linkWidth={0.4}
        backgroundColor={'white'}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={0.003}
        linkDirectionalParticleWidth={1}
        nodeVal={(node) => Math.pow(node.level, 1.5)}
        nodeOpacity={0.6}
        nodeThreeObjectExtend={true}
        linkColor={(d) => d.linkColor}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.name)
          sprite.textHeight = 1.7
          sprite.color = 'black'
          sprite.position.y = -12
          return sprite
        }}
        onNodeClick={handleClick}
      />
    </div>
  )
}

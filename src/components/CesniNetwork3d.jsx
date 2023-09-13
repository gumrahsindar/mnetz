import SpriteText from 'three-spritetext'
import { useRef, useCallback } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import { Container } from 'react-bootstrap'

export default function CesniNetwork3D({ nodes, links }) {
  const transformations = {
    girift: 'blue',
    secondary_axis: 'purple',
    eksen_kaydirim: 'red',
    axis_based1: 'green',
    axis_based2: 'orange',
  }

  const gDataLinks = links.map((link) => ({
    source: link.source,
    target: link.target,
    linkColor: transformations[link.transformation],
  }))
  const gDataNodes = nodes.map((node) =>
    node.category === 'cesni' ? { ...node, level: 1 } : { ...node, level: 2 }
  )

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
    <Container fluid>
      <div className='py-4 mx-auto text-center'>
        Çesni Evreni
        <ForceGraph3D
          className='mx-auto'
          ref={fgRef}
          graphData={gData}
          linkWidth={0.1}
          backgroundColor={'white'}
          nodeVal={(node) => Math.pow(node.level, 3)}
          nodeAutoColorBy={(d) => d.family_id}
          nodeOpacity={0.6}
          nodeThreeObjectExtend={true}
          linkColor={(d) => d.linkColor}
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
    </Container>
  )
}

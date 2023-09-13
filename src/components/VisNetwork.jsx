import { useRef, useEffect } from 'react'
import { Network } from 'vis-network/esnext'

function VisNetwork({ nodes, edges }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const data = { nodes, edges }
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    }
    const network = new Network(container, data, options)

    network.on('click', function (params) {
      // If a node is clicked
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]
        console.log('Node clicked:', nodeId)
        // TODO: Add code to handle node click
      }
      // If an edge is clicked
      else if (params.edges.length > 0) {
        const edgeId = params.edges[0]
        console.log('Edge clicked:', edgeId)
        // TODO: Add code to handle edge click
      }
    })

    return () => {
      network.destroy()
    }
  }, [nodes, edges])

  return (
    <div
      ref={containerRef}
      style={{
        width: '1270px',
        height: '650px',
        backgroundColor: 'black',
      }}
    />
  )
}

export default VisNetwork

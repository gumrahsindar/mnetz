import { useRef, useEffect, useState, useCallback } from 'react'
import { forceManyBody } from 'd3-force'
import { ForceGraph2D } from 'react-force-graph'

function CesniNetwork2D({
  nodes,
  links,
  nodeColor = 'auto',
  handleSelectedNode,
}) {
  const fgRef = useRef()
  const LINKWIDTH = 0.08
  const DEFAULTLINKCOLOR = '#a7a7d1'
  const NODE_RADIUS = 8

  const transformations = {
    girift: 'blue',
    p_axis: 'brown',
    s_axis: 'purple',
    t_related: 'red',
    ps_related: 'green',
    p_related: 'orange',
    s_to_p_related: "darkolivegreen", 
  }

  const [data, setData] = useState()
  const [cooldownTicks, setCooldownTicks] = useState()
  const [highlightedLinks, setHighlightedLinks] = useState([])
  const [highlightedNodes, setHighlightedNodes] = useState([])

  useEffect(() => {
    const gDataLinks = links.map((link, index) => ({
      id: index,
      source: link.source,
      target: link.target,
      transformation: link.transformation,
      linkColor: transformations[link.transformation],
      width: LINKWIDTH,
      highlighted: 0,
    }))
    const gDataNodes = nodes.map((node) =>
      node.category === 'cesni' ? { ...node, level: 1 } : { ...node, level: 2 }
    )

    setCooldownTicks()
    setData({ nodes: gDataNodes, links: gDataLinks })
    adjustStrength(fgRef)
  }, [nodes, links])

  function adjustStrength() {
    fgRef.current.d3Force('charge', forceManyBody().strength(-500))
  }

  const handleHighlightLinks = useCallback(
    (currentHighlightedLinks) => {
      setCooldownTicks(0)
      setHighlightedLinks(currentHighlightedLinks)

      if (currentHighlightedLinks[0] !== null) {
        // console.log("highlighted links are", currentHighlightedLinks);
        let currentNodes = []
        currentHighlightedLinks.map(
          (link) => (currentNodes = [...currentNodes, link.source, link.target])
        )
        // console.log("current nodes:", currentNodes);
        setHighlightedNodes(currentNodes)
      } else {
        setHighlightedNodes([])
      }
    },
    [setCooldownTicks, setHighlightedLinks]
  )

  const handleHighlightedNodes = useCallback(
    (currentNode) => {
      const relatedLinks = data.links.filter(
        (link) => link.source === currentNode || link.target === currentNode
      )

      handleHighlightLinks(relatedLinks)
    },
    [handleHighlightLinks, data]
  )

  const PaintRing = useCallback(
    (node, ctx) => {
      // add ring just for highlighted nodes
      if (highlightedNodes.includes(node)) {
        ctx.beginPath()
        ctx.arc(
          node.x,
          node.y,
          node.level === 2 ? NODE_RADIUS * 1.2 : NODE_RADIUS * 0.6,
          0,
          2 * Math.PI,
          false
        )
        ctx.fillStyle = 'black'
        ctx.fill()
      }
    },
    [highlightedNodes]
  )

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeRelSize={NODE_RADIUS}
      backgroundColor={'black'}
      nodeVal={(node) => Math.pow(node.level, 1.5)}
      nodeAutoColorBy={(d) => d.family_id}
      linkColor={(d) => (d.highlighted === 1 ? d.linkColor : DEFAULTLINKCOLOR)}
      linkWidth={(d) => d.width}
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={useCallback(
        (node, ctx) => {
          const label = node.name
          ctx.font = '8px Sans-Serif'
          ctx.textBaseline = 'middle'
          ctx.fillText(label, node.x - 10, node.y + 20)
          PaintRing(node, ctx)
        },
        [PaintRing]
      )}
      linkLabel={(d) => d.transformation}
      nodeDrag={false}
      linkHoverPrecision={10}
      linkDirectionalParticles={4}
      linkDirectionalParticleColor={(d) => d.linkColor}
      linkDirectionalParticleWidth={(link) =>
        highlightedLinks.includes(link) ? 6 : 0
      }
      onLinkHover={(link) => {
        handleHighlightLinks([link])
      }}
      autoPauseRedraw={false}
      cooldownTicks={cooldownTicks}
      onNodeHover={handleHighlightedNodes}
      onNodeClick={handleSelectedNode}
    />
  )
}

export default CesniNetwork2D

/* linkDirectionalParticleColor={() => 'red'}
linkDirectionalParticleWidth={6}
linkHoverPrecision={10}
onLinkHover={link => fgRef.current.emitParticle(link)} */

/* function highlightLink(currentLink) { 
    setCooldownTicks(0);  
    if (currentLink) {
        setData(prevData => ({
            ...prevData,
            links: prevData.links.map((link, index) => {
                if (index === currentLink.id) {
                return {
                    ...link,
                    width: 3,
                    highlighted: 1,
                }
                } else {
                return link
                }
            })
            }));
        
    } else {
        setData(prevData => ({
            ...prevData,
            links: prevData.links.map((link) => {
                return {
                    ...link,
                    width: LINKWIDTH,
                    highlighted: 0,
                }
            })
        }));
    }
}; */

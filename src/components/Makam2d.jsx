import { useRef, useEffect, useState, useCallback } from 'react'
import { ForceGraph2D } from 'react-force-graph'

export default function Makam2D({ makam, adjustStrength }) {
  const fgRef = useRef()
  const LINKWIDTH = 0.3
  const DEFAULTLINKCOLOR = '#a7a7d1'
  const NODE_RADIUS = 8

  const colors = {
    agazeColor: '#34b1eb',
    agazeGenisColor: '#62419c',
    seyirColor: '#a89432',
    seyirGenisColor: '#ad7a26',
    kararColor: '#a8323a',
    yedenColor: '#e86b68',
  }

  const gDataNodes = makam.nodes.map((node) => ({
    ...node,
    color: colors[node.color],
  }))

  const gDataLinks = makam.links.map((link) => ({
    source: link.source,
    target: link.target,
    linkColor: colors[link.linkColor],
    width: LINKWIDTH,
    highlighted: 0,
  }))

  const [data, setData] = useState({ nodes: [], links: [] })
  const [cooldownTicks, setCooldownTicks] = useState(undefined)
  const [highlightedLinks, setHighlightedLinks] = useState([])
  const [highlightedNodes, setHighlightedNodes] = useState([])

  useEffect(() => {
    setCooldownTicks()
    setData({ nodes: gDataNodes, links: gDataLinks })
    adjustStrength(fgRef)
    console.log('data', data)
  }, [fgRef, makam, adjustStrength])

  const handleHighlightLinks = useCallback(
    (currentHighlightedLinks) => {
      setCooldownTicks(0)
      setHighlightedLinks(currentHighlightedLinks)

      if (currentHighlightedLinks[0] !== null) {
        let currentNodes = []
        currentHighlightedLinks.forEach((link) => {
          currentNodes.push(link.source, link.target)
        })
        setHighlightedNodes(currentNodes)
      } else {
        setHighlightedNodes([])
      }
    },
    [setHighlightedLinks, setHighlightedNodes]
  )

  const handleHighlightedNodes = useCallback(
    (currentNode) => {
      const relatedLinks = data.links.filter(
        (link) => link.source === currentNode || link.target === currentNode
      )
      console.log(relatedLinks)
      handleHighlightLinks(relatedLinks)
    },
    [data, handleHighlightLinks]
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
      backgroundColor={'white'}
      nodeVal={(node) => Math.pow(node.level, 1.2)}
      nodeAutoColorBy={(d) => d.family_id}
      linkColor={(d) => (d.highlighted === 1 ? d.linkColor : DEFAULTLINKCOLOR)}
      linkWidth={(d) => d.width}
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={useCallback(
        (node, ctx) => {
          const label = node.name
          ctx.font = '8px Sans-Serif'
          ctx.textBaseline = 'middle'
          ctx.fillText(label, node.x - 20, node.y + 30)
          PaintRing(node, ctx)
        },
        [PaintRing]
      )}
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
    />
  )
}

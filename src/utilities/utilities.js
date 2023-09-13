function addNodesToModel(prevNodes, newNodes) {
  if (!Array.isArray(prevNodes) || !Array.isArray(newNodes)) {
    throw new Error('Both arguments must be arrays')
  }

  let finalNodes = [...prevNodes]

  for (const newNode of newNodes) {
    if (!finalNodes.some((prevNode) => isEqual(prevNode, newNode))) {
      finalNodes = [...finalNodes, newNode]
    }
  }

  return finalNodes
}

function addEdgesToModel(prevEdges, newEdges) {
  if (!Array.isArray(prevEdges) || !Array.isArray(newEdges)) {
    throw new Error('Both arguments must be arrays')
  }

  let finalEdges = [...prevEdges]

  for (const newEdge of newEdges) {
    if (!finalEdges.some((prevEdge) => isEqual(prevEdge, newEdge))) {
      finalEdges = [...finalEdges, newEdge]
    }
  }

  return finalEdges
}

function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false
      }
    }
    return true
  } else if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
    if (!isEqual(aKeys, bKeys)) {
      return false
    }
    for (const key of aKeys) {
      if (!isEqual(a[key], b[key])) {
        return false
      }
    }
    return true
  } else {
    return a === b
  }
}

export { addNodesToModel, addEdgesToModel }

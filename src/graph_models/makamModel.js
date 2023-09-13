const fontColor = { color: 'white' }
export const agazeStyle = {
  group: 1,
  font: fontColor,
  color: 'blue',
  size: 30,
  shape: 'triangle',
}
export const seyirStyle = {
  group: 2,
  font: fontColor,
  color: 'red',
  size: 30,
  shape: 'diamond',
}
export const kararStyle = {
  group: 3,
  font: fontColor,
  color: 'green',
  size: 30,
  shape: 'square',
}

const agaze = {
  id: 'agz',
  label: 'Agaze',
  group: agazeStyle.group,
  font: agazeStyle.font,
  color: agazeStyle.color,
  size: agazeStyle.size,
  shape: agazeStyle.shape,
}

const seyir = {
  id: 'syr',
  label: 'Seyir',
  group: seyirStyle.group,
  font: seyirStyle.font,
  color: seyirStyle.color,
  size: seyirStyle.size,
  shape: seyirStyle.shape,
}

const karar = {
  id: 'krr',
  label: 'Karar',
  group: kararStyle.shape,
  font: kararStyle.font,
  color: kararStyle.color,
  size: kararStyle.size,
  shape: kararStyle.shape,
}

export const initialNodes = [agaze, seyir, karar]

export const initialEdges = [
  { from: 'agz', to: 'syr', arrows: 'to' },
  { from: 'syr', to: 'krr', arrows: 'to' },
  { from: 'krr', to: 'agz', arrows: 'to' },
]

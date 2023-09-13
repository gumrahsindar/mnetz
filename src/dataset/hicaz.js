export const dugahMakam = [
  {
    id: 13,
    isim: 'Hicaz',
    cesit: 'Basit',
    agaze: {
      baslangic: [
        {
          id: 1,
          perde_cesni: 'Dügâh Perde',
        },
        {
          id: 3,
          perde_cesni: 'Dügâh: Hicaz Çeşni',
        },
      ],
      genisleme: [
        {
          id: 12,
          perde_cesni: 'Rast: Nikriz Çeşni',
        },
      ],
    },
    seyir: {
      anaseyir: [
        {
          id: 70,
          perde_cesni: 'Dik Kürdi Perde',
        },
        {
          id: 26,
          perde_cesni: 'Nevâ: Rast Çeşni',
        },
        {
          id: 71,
          perde_cesni: 'Nim Hicaz Perde',
        },
      ],
      genisleme: [
        {
          id: 23,
          perde_cesni: 'Nevâ: Buselik Çeşni',
        },
        {
          id: 55,
          perde_cesni: 'Yegâh: Rast Çeşni',
        },
      ],
    },
    karar: {
      karar: [
        {
          id: 1,
          perde_cesni: 'Dügâh Perde',
        },
      ],
      yeden: [
        {
          id: 2,
          perde_cesni: 'Rast Perde',
        },
      ],
    },
  },
]

const agazeColor = '#34b1eb'
const agazeGenisColor = '#62419c'
const seyirColor = '#a89432'
const seyirGenisColor = '#ad7a26'
const kararColor = '#a8323a'
const yedenColor = '#e86b68'

export const hicazNodes = [
  { id: 13_1_1, name: 'Dügâh Perde', group_id: 1, level: 6, color: agazeColor },
  {
    id: 13_1_3,
    name: 'Dügâh: Hicaz Çeşni',
    group_id: 1,
    level: 2,
    color: agazeColor,
  },
  {
    id: 13_2_12,
    name: 'Rast: Nikriz Çeşni',
    group_id: 1,
    level: 1,
    color: agazeGenisColor,
  },
  {
    id: 13_3_70,
    name: 'Dik Kürdi Perde',
    group_id: 2,
    level: 2,
    color: seyirColor,
  },
  {
    id: 13_3_26,
    name: 'Nevâ: Rast Çeşni',
    group_id: 2,
    level: 2,
    color: seyirColor,
  },
  {
    id: 13_3_71,
    name: 'Nim Hicaz Perde',
    group_id: 2,
    level: 2,
    color: seyirColor,
  },
  {
    id: 13_4_23,
    name: 'Nevâ: Buselik Çeşni',
    group_id: 2,
    level: 1,
    color: seyirGenisColor,
  },
  {
    id: 13_4_55,
    name: 'Yegâh: Rast Çeşni',
    group_id: 2,
    level: 1,
    color: seyirGenisColor,
  },
  { id: 13_5_1, name: 'Dügâh Perde', group_id: 3, level: 3, color: kararColor },
  { id: 13_6_2, name: 'Rast Perde', group_id: 3, level: 2, color: yedenColor },
]

export const hicazLinks = [
  // within agaze baslangic (both directions)
  { source: 13_1_1, target: 13_1_3, linkColor: agazeColor },
  { source: 13_1_3, target: 13_1_1, linkColor: agazeColor },

  // to agaze genisleme (both directions)
  { source: 13_1_1, target: 13_2_12, linkColor: agazeGenisColor },
  { source: 13_2_12, target: 13_1_1, linkColor: agazeGenisColor },
  { source: 13_1_3, target: 13_2_12, linkColor: agazeGenisColor },
  { source: 13_2_12, target: 13_1_3, linkColor: agazeGenisColor },

  // there should be a case for within agaze genisleme
  // to anaseyir (unidirectional)
  { source: 13_1_1, target: 13_3_70, linkColor: agazeColor },
  { source: 13_1_1, target: 13_3_26, linkColor: agazeColor },
  { source: 13_1_1, target: 13_3_71, linkColor: agazeColor },
  { source: 13_1_3, target: 13_2_12, linkColor: agazeColor },
  { source: 13_1_3, target: 13_3_70, linkColor: agazeColor },
  { source: 13_1_3, target: 13_3_26, linkColor: agazeColor },
  { source: 13_1_3, target: 13_3_71, linkColor: agazeColor },

  // within anaseyir (both directions)
  { source: 13_3_70, target: 13_3_26, linkColor: seyirColor },
  { source: 13_3_70, target: 13_3_71, linkColor: seyirColor },
  { source: 13_3_26, target: 13_3_70, linkColor: seyirColor },
  { source: 13_3_26, target: 13_3_71, linkColor: seyirColor },
  { source: 13_3_71, target: 13_3_26, linkColor: seyirColor },
  { source: 13_3_71, target: 13_3_70, linkColor: seyirColor },
  // to seyir genisleme ( both directions)
  { source: 13_3_70, target: 13_4_55, linkColor: seyirGenisColor },
  { source: 13_4_55, target: 13_3_70, linkColor: seyirGenisColor },
  { source: 13_3_70, target: 13_4_23, linkColor: seyirGenisColor },
  { source: 13_4_23, target: 13_3_70, linkColor: seyirGenisColor },
  { source: 13_3_26, target: 13_4_23, linkColor: seyirGenisColor },
  { source: 13_4_23, target: 13_3_26, linkColor: seyirGenisColor },
  { source: 13_3_26, target: 13_4_55, linkColor: seyirGenisColor },
  { source: 13_4_55, target: 13_3_26, linkColor: seyirGenisColor },
  { source: 13_3_71, target: 13_4_55, linkColor: seyirGenisColor },
  { source: 13_4_55, target: 13_3_71, linkColor: seyirGenisColor },
  { source: 13_3_71, target: 13_4_23, linkColor: seyirGenisColor },
  { source: 13_4_23, target: 13_3_71, linkColor: seyirGenisColor },

  // from anaseyir to karar (unidirectional)
  { source: 13_3_26, target: 13_5_1, linkColor: seyirColor },
  { source: 13_3_70, target: 13_5_1, linkColor: seyirColor },
  { source: 13_3_71, target: 13_5_1, linkColor: seyirColor },

  // within seyir genisleme (both directions)
  { source: 13_4_23, target: 13_4_55, linkColor: seyirGenisColor },
  { source: 13_4_55, target: 13_4_23, linkColor: seyirGenisColor },

  // within yeden and karar (both directions)
  { source: 13_5_1, target: 13_6_2, linkColor: kararColor },
  { source: 13_6_2, target: 13_5_1, linkColor: kararColor },
  { source: 13_5_1, target: 13_1_1, linkColor: kararColor },

  // from karar to agaze baslangıc perde (unidrecitonal)
]

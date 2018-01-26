const fs = require('fs')
//const matrix = [2, 3, 1]
const matrix = [6, 55, 25]
//let dict = {}
const lut = {
  'Cstline': {layer: 'cstline', minzoom: 10, maxzoom: 14},
  'Cntr': {layer: 'cntr', minzoom: 14, maxzoom: 14},
  'RdEdg': {layer: 'rdedg', minzoom: 14, maxzoom: 14},
  'ElevPt': {layer: 'elevpt', minzoom: 14, maxzoom: 14},
  'BldL': {layer: 'bldl', minzoom: 14, maxzoom: 14},
  'GCP': {layer: 'gcp', minzoom: 14, maxzoom: 14},
  'WL': {layer: 'wl', minzoom: 13, maxzoom: 14},
  'AdmPt': {layer: 'admpt', minzoom: 14, maxzoom: 14},
  'RdComPt': {layer: 'rdcompt', minzoom: 14, maxzoom: 14},
  'CommBdry': {layer: 'commbdry', minzoom: 13, maxzoom: 14},
  'AdmBdry': {layer: 'admbdry', minzoom: 12, maxzoom: 14},
  'WStrL': {layer: 'wstrl', minzoom: 13, maxzoom: 14},
  'CommPt': {layer: 'commpt', minzoom: 14, maxzoom: 14},
  'RailCL': {layer: 'railcl', minzoom: 12, maxzoom: 14},
  'SBBdry': {layer: 'sbbdry', minzoom: 13, maxzoom: 14},
  'SBAPt': {layer: 'sbapt', minzoom: 13, maxzoom: 14}
}

function jumpInto(matrix) {
  const [Z, X, Y] = matrix
  const z = 18
  const M = 2 ** (z - Z)
  for(let x = M * X; x < M * (X + 1); x++) {
    for(let y = M * Y; y < M * (Y + 1); y++) {
      const path = `/home/qdltc/experimental_fgd/${z}/${x}/${y}.geojson`
      if(!fs.existsSync(path)) continue
      const r = JSON.parse(fs.readFileSync(path, 'utf-8')).features
      for(let f of r) {
        //let c = dict[f.properties.class]
        //c = c ? c + 1 : 1
        //dict[f.properties.class] = c
	f.tippecanoe = lut[f.properties.class]
	console.log(JSON.stringify(f))
      }
    }
  }
}

jumpInto(matrix)


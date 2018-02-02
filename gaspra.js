const fs = require('fs')
//const matrix = [2, 3, 1]
const matrix = [10, 888, 407]
const lut = {
  'Cstline': {layer: 'cstline', minzoom: 10, maxzoom: 15},
  'Cntr': {layer: 'cntr', minzoom: 14, maxzoom: 15},
  'RdEdg': {layer: 'rdedg', minzoom: 14, maxzoom: 15},
  'ElevPt': {layer: 'elevpt', minzoom: 14, maxzoom: 15},
  'BldL': {layer: 'bldl', minzoom: 15, maxzoom: 15},
  'GCP': {layer: 'gcp', minzoom: 15, maxzoom: 15},
  'WL': {layer: 'wl', minzoom: 14, maxzoom: 15},
  'AdmPt': {layer: 'admpt', minzoom: 15, maxzoom: 15},
  'RdCompt': {layer: 'rdcompt', minzoom: 15, maxzoom: 15},
  'CommBdry': {layer: 'commbdry', minzoom: 14, maxzoom: 15},
  'AdmBdry': {layer: 'admbdry', minzoom: 12, maxzoom: 15},
  'WStrL': {layer: 'wstrl', minzoom: 14, maxzoom: 15},
  'CommPt': {layer: 'commpt', minzoom: 14, maxzoom: 15},
  'RailCL': {layer: 'railcl', minzoom: 12, maxzoom: 15},
  'SBBdry': {layer: 'sbbdry', minzoom: 14, maxzoom: 15},
  'SBAPt': {layer: 'sbapt', minzoom: 14, maxzoom: 15}
}

function jumpInto(matrix) {
  let count = 0
  const [Z, X, Y] = matrix
  const z = 18
  const M = 2 ** (z - Z)
  for(let x = M * X; x < M * (X + 1); x++) {
    for(let y = M * Y; y < M * (Y + 1); y++) {
      const path = `/home/qdltc/experimental_fgd/${z}/${x}/${y}.geojson`
      if(!fs.existsSync(path)) continue
      const r = JSON.parse(fs.readFileSync(path, 'utf-8')).features
      for(let f of r) {
	delete f.properties['lfSpanFr']
	delete f.properties['lfSpanTo']
	delete f.properties['devDate']
	delete f.properties['orgMDId']
	f.tippecanoe = lut[f.properties.class]
	//delete f.properties['class']
	delete f.properties['fid']
	delete f.properties['type']
	delete f.properties['orgGILvl']
	if(f.properties['vis'] === '') delete f.properties['vis']
	if(f.properties['name'] === '') delete f.properties['name']
	console.log(JSON.stringify(f))
      }
      count += 1
      if(count % 1000 === 0 && global.gc) global.gc()
    }
  }
}

jumpInto(matrix)


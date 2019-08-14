const fs = require('fs')
const path = require('path')
const colors = require('material-colors')

const colorNames = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey',
]

const getColorSets = (light = 500, dark = 700) => colorNames.map(name => ({
  light: colors[name][light].toUpperCase(),
  dark: colors[name][dark].toUpperCase(),
  name: name.toLowerCase(),
}))

const getSvgCode = (set) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="187px" height="200px" viewBox="0 0 187 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>kin-logo-${set.name}</title>
  <desc>Generator: https://github.com/kintegrate/kin-logos</desc>
  <defs></defs>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="kin-logo" fill-rule="nonzero">
      <polygon id="Shape" fill="${set.light}" points="93.1 0 93.1 0 93.1 0 0 33.2 14.2 156.3 93.1 200 93.1 200 93.1 200 172 156.3 186.2 33.2"></polygon>
      <polygon id="Shape" fill="${set.dark}" points="93 0 93 22.2 93 22.1 93 123.4 93 123.4 93 200 93 200 171.9 156.3 186.1 33.2"></polygon>
      <path d="M143,93.1818182 L143,106.818182 C143,108.709091 142.336364,110.318182 141.009091,111.645455 C139.681818,112.972727 138.072727,113.636364 136.181818,113.636364 L106.636364,113.636364 L106.636364,143.181818 C106.636364,145.072727 105.972727,146.681818 104.645455,148.009091 C103.318182,149.336364 101.709091,150 99.8181818,150 L86.1818182,150 C84.2909091,150 82.6818182,149.336364 81.3545455,148.009091 C80.0272727,146.681818 79.3636364,145.072727 79.3636364,143.181818 L79.3636364,113.636364 L49.8181818,113.636364 C47.9272727,113.636364 46.3181818,112.972727 44.9909091,111.645455 C43.6636364,110.318182 43,108.709091 43,106.818182 L43,93.1818182 C43,91.2909091 43.6636364,89.6818182 44.9909091,88.3545455 C46.3181818,87.0272727 47.9272727,86.3636364 49.8181818,86.3636364 L79.3636364,86.3636364 L79.3636364,56.8181818 C79.3636364,54.9272727 80.0272727,53.3181818 81.3545455,51.9909091 C82.6818182,50.6636364 84.2909091,50 86.1818182,50 L99.8181818,50 C101.709091,50 103.318182,50.6636364 104.645455,51.9909091 C105.972727,53.3181818 106.636364,54.9272727 106.636364,56.8181818 L106.636364,86.3636364 L136.181818,86.3636364 C138.072727,86.3636364 139.681818,87.0272727 141.009091,88.3545455 C142.336364,89.6818182 143,91.2909091 143,93.1818182 Z" id="Shape" fill="#FFFFFF"></path>
    </g>
  </g>
</svg>`
}

const writeFile = (p, content) => new Promise((resolve, reject) => {
  return fs.writeFile(p, content, (err) => {
    if (err) reject(err);
    else resolve(content);
  });
});

module.exports = {
  getColorSets,
  getSvgCode,
  writeFile,
}

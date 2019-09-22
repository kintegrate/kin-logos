const fs = require('fs-extra')
const svgexport = require('svgexport')
const { logoMaps } = require('./logos')
const { cleanup, formatSet, writeFile, writeFileSet, writeJson, extractData, readTemplate} = require('./utils')

const { name } = require('../package')
const output = {
  readme: [`# ${name}`],
  html: [readTemplate('html-start.html')],
  json: [],
  css: [],
  pngs: [],
}

// Clean up the directory
cleanup()

// Loop over each of the logos in the maps
logoMaps.forEach(logo => {
  // This is where we will store all the images we are generating
  const images = {}

  // Take the data from the logo
  const { name, source, schemes, colors } = logo
  const colorSchemes = Object.keys(schemes)

  console.log(`[generate] logo "${name}", themes: ${colorSchemes.join(', ')}`)

  output.html.push(`<h3 class="my-3">${name}</h3><div class="row">`)

  // Loop over each of the color schemes
  colorSchemes.forEach(scheme => {
    // The name of the generated image
    const imageName = `${name}-${scheme}`
    // This is where all the variations/classes are generated
    images[imageName] = extractData(imageName, source, colors, schemes[scheme]);
  })

  // Export the defined images to files
  Object.keys(images).forEach(imageName => {
    const image = images[imageName];

    // Create the SVG
    writeFile(image.svg, image.source)

    // Add item to the README
    output.readme.push(`## ${imageName}`)
    // output.readme.push(`> Light: ${set.light} dark: ${set.light}`)
    output.readme.push(`![](${image.png}?raw=true)`)

    // Add item to the HTML
    output.html.push(
      ...[
        `<div class="col-md-3 my-4">`,
        `  <h6>${imageName}</h6>`,
        `  <div style="background-color: ${imageName.includes('white') ? '#000' : '' }" class="p-2 text-center">`,
        `    <img src="${image.png}" class="img-fluid" />`,
        `  </div>`,
        `</div>`,
      ],
    )

    // Add item to the PNGs
    output.pngs.push({ input: [image.svg], output: [image.png] })

    // Add item to JSON
    output.json.push(formatSet(images[imageName]))

    // Add item to the CSS file
    output.css.push(`.${image.name} { background-image: url('data:image/svg+xml;utf8,${image.source.replace(/\n|\r/g, '')}') }`)
  })

  output.html.push(`</div>`)
})

console.log('[output]: ./README.md')
writeFileSet('./README.md', output.readme)

console.log('[output]: ./docs/index.html')
writeFileSet('./docs/index.html', output.html)

console.log('[output]: ./css/logos.css')
writeFileSet('./css/logos.css', output.css)

console.log('[output]: ./json/logos.json')
writeJson('./json/logos.json', output.json)

console.log('[convert]: svg files to png')

svgexport.render(output.pngs, () => {
  console.log('[convert]: done')

  // Copy created files to docs folder so they get published on Github Pages
  fs.copySync('./css', './docs/css')
  fs.copySync('./png', './docs/png')
  fs.copySync('./svg', './docs/svg')
  fs.copySync('./json', './docs/json')

  console.log('[done] 🚀')
})


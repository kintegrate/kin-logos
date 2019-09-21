const fs = require('fs-extra')
const svgexport = require('svgexport')
const { logoMaps } = require('./logos')
const { cleanup, formatSet, writeFile, writeFileSet, writeJson, searchReplaceColors, extractClasses, extractColors } = require('./utils')

const readme = [`# @kintegrate/kin-logos`]
const html = [
  `<html><body class="container p-2">`,
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />`,
  `<link rel="stylesheet" href="./css/logos.css" />`,
  `<h1 class="m-4 text-center"><a href="https://github.com/kintegrate/kin-logos">@kintegrate/kin-logos</a></h1>`,
]
const json = []
const css = []
const pngs = []

// Clean up the directory
cleanup()

// Loop over each of the logos in the maps
logoMaps.forEach(logo => {
  // This is where we will store all the images we are generating
  const images = {}

  // Take the data from the logo
  const { name, source, schemes, colors } = logo
  const colorSchemes = Object.keys(schemes)

  console.log(`Generating logo "${name}" using themes: ${colorSchemes.join(', ')}`)

  html.push(`<h3 class="my-3">${name}</h3><div class="row">`)

  // Loop over each of the color schemes
  colorSchemes.forEach(scheme => {
    // The name of the generated image
    const imageName = `${name}-${scheme}`
    // This is where all the variations/classes are generated
    images[imageName] = {
      name: imageName,
      svg: `./svg/${imageName}.svg`,
      png: `./png/${imageName}.png`,
      source: searchReplaceColors(source, schemes[scheme]),
      classes: extractClasses(colors, schemes[scheme], imageName),
      colors: extractColors(colors, schemes[scheme], imageName),
    }
  })

  // Export the defined images to files
  Object.keys(images).forEach(imageName => {
    const image = images[imageName];

    // Create the SVG
    writeFile(image.svg, image.source)

    // Add item to the README
    readme.push(`## ${imageName}`)
    // readme.push(`> Light: ${set.light} dark: ${set.light}`)
    readme.push(`![](${image.png}?raw=true)`)

    // Add item to the HTML
    html.push(
      ...[
        `<div class="col-md-3 my-4">`,
        `<h6>${imageName}</h6>`,
        `<img src="${image.png}" class="img-fluid" />`,
        `</div>`,
      ],
    )

    // Add item to the PNGs
    pngs.push({ input: [image.svg], output: [image.png] })

    // Add item to JSON
    json.push(formatSet(images[imageName]))

    // Add item to the CSS file
    css.push(`.${image.name} { background-image: url('data:image/svg+xml;utf8,${image.source.replace(/\n|\r/g, '')}') }`)
  })

  html.push(`</div>`)
})

console.log('Writing: ./README.md')
writeFileSet('./README.md', readme)

console.log('Writing: ./docs/index.html')
writeFileSet('./docs/index.html', html)

console.log('Writing: ./css/logos.css')
writeFileSet('./css/logos.css', css)

console.log('Writing: ./json/colors.json')
writeJson('./json/colors.json', json)

console.log('Converting svg files to png')

svgexport.render(pngs, () => {
  console.log('Done Converting')

  // Copy created files to docs folder so they get published on Github Pages
  fs.copySync('./css', './docs/css')
  fs.copySync('./png', './docs/png')
  fs.copySync('./svg', './docs/svg')
})

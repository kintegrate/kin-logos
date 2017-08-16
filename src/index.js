const fs = require('fs-extra')
const svgexport = require('svgexport');

const {getColorSets, getSvgCode, writeFile} = require('./utils')

const writeFileSet = (p, lines) => writeFile(p, lines.join('\n\n'))
const writeJson = (p, obj) => writeFile(p, JSON.stringify(obj, null, 2))

const readme = [`# @ngx-plus/ngx-logos`]
const html = [
  `<html><body class="container p-2">`,
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />`,
  `<link rel="stylesheet" href="./css/logos.css" />`,
  `<h1 class="m-4 text-center"><a href="https://github.com/ngx-plus/ngx-logos">@ngx-plus/ngx-logos</a></h1>`,
  `<div class="row">`,
]
const json = []
const css = [
  `.ngx-logo { display: inline-block; width: 187px; height: 200px; background-repeat: no-repeat; background-size: contain; }`,
  `.ngx-logo-sm { width: 89px; height: 100px; }`,
  `.ngx-logo-lg { width: 267px; height: 300px; }`,
  `.ngx-logo-xl { width: 356px; height: 400px; }`,
]
const pngs = []

const formatSet = (set) =>  Object.assign(set, {
  class: `ngx-logo-${set.name}`,
  svg: `../svg/ngx-logo-${set.name}.svg`
})

getColorSets().forEach(set => {
  set = formatSet(set)

  const color = set.name
  const name = `ngx-logo-${color}`

  const svg = getSvgCode(set)
  writeFile(`./svg/${name}.svg`, svg)

  readme.push(`## ${name}`)
  readme.push(`> Light: ${set.light} dark: ${set.light}`)
  readme.push(`![](./png/${name}.png?raw=true)`)

  html.push(...[
    `<div class="col-md-3 text-center mb-4">`,
    `<h6 class="">${set.name}</h6>`,
    `<h6><small style="color: ${set.light}">${set.light}</small><small style="color: ${set.light}">${set.dark}</small></h6>`,
    `<i class="ngx-logo ${set.class}"></i>`,
    `</div>`,
  ])

  pngs.push({
    "input": [`./svg/${name}.svg`],
    "output": [`./png/${name}.png`],
  })

  json.push(formatSet(set))
  css.push(`.ngx-logo-${color} { background-image: url('data:image/svg+xml;utf8,${svg.replace(/\n|\r/g, '')}') }`)
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

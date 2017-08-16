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

const formatSet = (set) =>  Object.assign(set, {
  class: `ngx-logo-${set.name}`,
  svg: `../svg/ngx-logo-${set.name}.svg`
})

getColorSets().forEach(set => {
  set = formatSet(set)

  const color = set.name
  const name = `ngx-logo-${color}.svg`

  const svg = getSvgCode(set)
  writeFile(`./svg/${name}`, svg)
  writeFile(`./docs/svg/${name}`, svg)

  readme.push(`## ${name}`)
  readme.push(`> Light: ${set.light} dark: ${set.light}`)
  readme.push(`![](https://ngx-plus.github.io/ngx-logos/svg/${name}?raw=true)`)

  html.push(...[
    `<div class="col-md-3 text-center mb-4">`,
    `<h6 class="">${set.name}</h6>`,
    `<i class="ngx-logo ${set.class}"></i>`,
    `</div>`,
  ])


  json.push(formatSet(set))
  css.push(`.ngx-logo-${color} { background-image: url('data:image/svg+xml;utf8,${svg.replace(/\n|\r/g, '')}') }`)
})

writeFileSet('./README.md', readme)
writeFileSet('./docs/index.html', html)
writeFileSet('./docs/css/logos.css', css)
writeFileSet('./css/logos.css', css)
writeJson('./json/colors.json', json)

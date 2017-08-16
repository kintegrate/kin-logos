const {getColorSets, getSvgCode, writeFile} = require('./utils')

const writeFileSet = (p, lines) => writeFile(p, lines.join('\n\n'))
const writeJson = (p, obj) => writeFile(p, JSON.stringify(obj, null, 2))

const readme = [`# Logos`]
const html = [
  `<html><body class="container">`,
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />`,
  `<link rel="stylesheet" href="./css/logos.css" />`,
  `<h1>@ngx-plus/ngx-logos</h1>`,
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

  writeFile(`./svg/${name}`, getSvgCode(set))

  readme.push(`## ${name}`)
  readme.push(`> Light: ${set.light} dark: ${set.light}`)
  readme.push(`![](./svg/${name}?raw=true)`)

  html.push(...[
    `<div class="col-md-3">`,
    `<h6>${name}</h6>`,
    `<i class="ngx-logo ${set.class}"></i>`,
    `</div>`,
  ])


  json.push(formatSet(set))

  css.push(`.ngx-logo-${color} { background-image: url(../svg/${name}) }`)
})

writeFileSet('./README.md', readme)
writeFileSet('./docs/index.html', html)
writeFileSet('./css/logos.css', css)
writeJson('./json/colors.json', json)

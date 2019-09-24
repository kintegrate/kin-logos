const fs = require('fs')
const { ensureDirSync } = require('fs-extra')
const { join } = require('path')

const writeFile = (p, content) =>
  new Promise((resolve, reject) => {
    return fs.writeFile(p, content, err => {
      if (err) reject(err)
      else resolve(content)
    })
  })

const writeFileSet = (p, lines) => writeFile(p, lines.join('\n\n'))
const writeJson = (p, obj) => writeFile(p, JSON.stringify(obj, null, 2))

const searchReplaceColors = (source, colorMap) => {
  let result = source;
  const colors = Object.keys(colorMap).reduce((acc, curr) => ([...acc, { from: curr, to: colorMap[curr]}]), [])
  colors.forEach(({ from, to }) => {
    result = result.replace(new RegExp(from, 'g'), to);
  })
  return result;
}

const extractClasses = (colors, scheme, prefix) => {
  return colors.reduce((acc, curr) => ({
    ...acc,
    [`.${prefix} .${curr.class}`]: scheme[curr.color],
  }), {})
}

const extractColors = (colors, scheme) => {
  return colors.reduce((acc, curr) => ({
    ...acc,
    [curr.class]: scheme[curr.color] || curr.color,
  }), {})
}

const reverseColorScheme = (colors) => {
  return colors.reduce((acc, curr) => ({
    ...acc,
    [curr.color]: curr.class,
  }), {})
}

const extractData = (imageName, source, colors, scheme) => {
  return {
    name: imageName,
    svg: `./svg/${imageName}.svg`,
    png: `./png/${imageName}.png`,
    originalSource: searchReplaceColors(source, reverseColorScheme(colors)),
    originalColors: extractColors(colors, {}),
    source: searchReplaceColors(source, scheme),
    classes: extractClasses(colors, scheme, imageName),
    colors: extractColors(colors, scheme),
  }
}

const formatSet = (set) => {
  return {
    name: set.name,
    png: set.png,
    svg: set.svg,
    originalSource: set.originalSource,
    originalColors: set.originalColors,
    source: set.source,
    colors: set.colors,
  }
}

const createLogoMap = (name, filename, defaults) => ({
  // Prefix of the exported filename
  name,
  // Source SVG file
  source: fs.readFileSync(join(__dirname, 'logos', `${filename}.svg`)).toString('UTF-8'),
  // Merge in the defaults
  ...defaults,
})

const readTemplate = name => {
  return fs.readFileSync(join(__dirname, 'templates', name)).toString('UTF-8')
}

const clearPath = (path) => {
  const dirPath = join(process.cwd(), path)
  console.log(`[clear path] ${dirPath}`)
  if (!fs.existsSync(dirPath)) {
    ensureDirSync(dirPath)
    return;
  }
  const files = fs.readdirSync(dirPath)
  if (files.length) {
    files.forEach(file => {
      const deleteFile = join(dirPath, file);
      fs.unlinkSync(deleteFile)
    })
  }
  ensureDirSync(dirPath)
}

const cleanup = () => {
  clearPath('docs/css')
  clearPath('docs/png')
  clearPath('docs/svg')
  clearPath('docs/json')
  clearPath('css')
  clearPath('svg')
  clearPath('png')
  clearPath('json')
}

module.exports = {
  writeFile,
  writeFileSet,
  writeJson,
  formatSet,
  searchReplaceColors,
  extractClasses,
  extractColors,
  cleanup,
  createLogoMap,
  extractData,
  readTemplate,
}

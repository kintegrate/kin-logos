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

const searchReplaceColors = (source, colorMap) => {
  let result = source;
  const colors = Object.keys(colorMap).reduce((acc, curr) => ([...acc, { from: curr, to: colorMap[curr]}]), [])
  colors.forEach(({ from, to }) => {
    result = result.replace(from, to);
  })
  return result;
}

const extractClasses = (colors, scheme, prefix) => {
  return colors.reduce((acc, curr) => ({
    ...acc,
    [`.${prefix} .${curr.class}`]: scheme[curr.color],
  }), {})
}

const extractColors = (colors, scheme, prefix) => {
  return colors.reduce((acc, curr) => ({
    ...acc,
    [`${prefix}-${curr.class}`]: scheme[curr.color],
  }), {})
}

const formatSet = (set) => {
  return {
    name: set.name,
    png: set.png,
    svg: set.svg,
    colors: set.colors,
  }
}

const clearPath = (path) => {
  const dirPath = join(process.cwd(), path)
  console.log(`Cleaning up ${dirPath}`)
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
  clearPath('svg')
  clearPath('png')
  clearPath('json')
}

module.exports = {
  writeFile,
  formatSet,
  searchReplaceColors,
  extractClasses,
  extractColors,
  cleanup,
}

const { readFileSync } = require('fs')
const { join } = require('path')

const colorMapCoinDark = {
  '#F0F284': '#222',
  '#D98A40': '#555',
  '#FDF6B5': '#555',
  '#F7CE3D': '#222',
  '#F8CE45': '#222',
  '#FBDE68': '#555',
  '#B36738': '#888',
  '#E49D32': '#222',
  '#F9CD44': '#555',
  '#FACA42': '#555',
  '#E6A634': '#222',
  '#F8CC44': '#111',
  '#F5E9A4': '#222',
  '#FFF9B7': '#666',
  '#F9CC44': '#333',
  '#F8C443': '#333',
  '#FFF7B6': '#444',
  '#F1AD39': '#444',
  '#B6724F': '#333',
  '#F8CC43': '#666',
  '#FFEACA': '#777',
  '#F6CB40': '#111',
  '#FAD75F': '#333',
}

const colorMapCoinDarkGold = {
  ...colorMapCoinDark,
  '#F8C443': '#F8C443', // KIN LOGO OUTER BORDER TOP
  '#FFF7B6': '#FFF7B6', // KIN LOGO INNER BORDER TOP
  '#F1AD39': '#F1AD39', // KIN LOGO INNER BORDER TOP
  '#B6724F': '#B6724F', // KIN LOGO INNER BORDER BOTTOM
  '#FFEACA': '#FFEACA', // KIN LOGO SURFACE BORDER TOP
  '#F8CC43': '#F8CC43', // KIN LOGO SURFACE BORDER BOTTOM
  '#FAD75F': '#FAD75F', // KIN LOGO SURFACE TOP
  '#F6CB40': '#F6CB40', // KIN LOGO SURFACE BOTTOM
}

const colorMapCoinDarkPink = {
  ...colorMapCoinDark,
  '#F8C443': '#f6bcd8', // KIN LOGO OUTER BORDER TOP
  '#FFF7B6': '#89394f', // KIN LOGO INNER BORDER TOP
  '#F1AD39': '#89394f', // KIN LOGO INNER BORDER TOP
  '#B6724F': '#f6bcd8', // KIN LOGO INNER BORDER BOTTOM
  '#FFEACA': '#89394f', // KIN LOGO SURFACE BORDER TOP
  '#F8CC43': '#f6bcd8', // KIN LOGO SURFACE BORDER BOTTOM
  '#FAD75F': '#f6bcd8', // KIN LOGO SURFACE TOP
  '#F6CB40': '#89394f', // KIN LOGO SURFACE BOTTOM
}

const logoMaps = [
  {
    // Prefix of the exported filename
    name: 'kin-coin',
    // Source SVG file
    source: readFileSync(join(__dirname, 'logos', 'kin-coin-gold.svg')).toString('UTF-8'),
    // All the color we want to extract into CSS and replace with the schemes
    colors: [
      { color: '#F0F284', class: 'coin-outer-border-top' },
      { color: '#D98A40', class: 'coin-outer-border-bottom' },
      { color: '#FDF6B5', class: 'coin-outer-surface-border-top' },
      { color: '#F7CE3D', class: 'coin-outer-surface-border-bottom' },
      { color: '#F8CE45', class: 'coin-outer-surface-top' },
      { color: '#FBDE68', class: 'coin-outer-surface-bottom' },
      { color: '#B36738', class: 'coin-center-border-solid' },
      { color: '#E49D32', class: 'coin-inner-border-top' },
      { color: '#F9CD44', class: 'coin-inner-border-bottom' },
      { color: '#FACA42', class: 'coin-inner-surface-top' },
      { color: '#E6A634', class: 'coin-inner-surface-bottom' },
      { color: '#F8CC44', class: 'coin-center-outer-border-top' },
      { color: '#F5E9A4', class: 'coin-center-outer-border-bottom' },
      { color: '#FFF9B7', class: 'coin-center-inner-border-top' },
      { color: '#F9CC44', class: 'coin-center-inner-border-bottom' },
      { color: '#F8C443', class: 'kin-logo-outer-border-top' },
      { color: '#FFF7B6', class: 'kin-logo-outer-border-bottom' },
      { color: '#F1AD39', class: 'kin-logo-inner-border-top' },
      { color: '#B6724F', class: 'kin-logo-inner-border-bottom' },
      { color: '#FFEACA', class: 'kin-logo-surface-border-top' },
      { color: '#F8CC43', class: 'kin-logo-surface-border-bottom' },
      { color: '#FAD75F', class: 'kin-logo-surface-top' },
      { color: '#F6CB40', class: 'kin-logo-surface-bottom' },
    ],
    schemes: {
      'gold': {},
      'dark': colorMapCoinDark,
      'dark-gold': colorMapCoinDarkGold,
      'dark-pink': colorMapCoinDarkPink,
    }
  }
]

module.exports = { logoMaps }

const { createLogoMap } = require('./utils')

const colorMapLogoDark = {
  '#F8C443': '#333', // KIN LOGO OUTER BORDER TOP
  '#FFF7B6': '#444', // KIN LOGO INNER BORDER TOP
  '#F1AD39': '#444', // KIN LOGO INNER BORDER TOP
  '#B6724F': '#333', // KIN LOGO INNER BORDER BOTTOM
  '#FFEACA': '#777', // KIN LOGO SURFACE BORDER TOP
  '#F8CC43': '#666', // KIN LOGO SURFACE BORDER BOTTOM
  '#FAD75F': '#333', // KIN LOGO SURFACE TOP
  '#F6CB40': '#111', // KIN LOGO SURFACE BOTTOM
}

const colorMapLogoPurple = {
  '#F8C443': '#6f41e8', // KIN LOGO OUTER BORDER TOP
  '#FFF7B6': '#6f41e8', // KIN LOGO INNER BORDER TOP
  '#F1AD39': '#a890f2', // KIN LOGO INNER BORDER TOP
  '#B6724F': '#a890f2', // KIN LOGO INNER BORDER BOTTOM
  '#FFEACA': '#6f41e8', // KIN LOGO SURFACE BORDER TOP
  '#F8CC43': '#6f41e8', // KIN LOGO SURFACE BORDER BOTTOM
  '#FAD75F': '#6f41e8', // KIN LOGO SURFACE TOP
  '#F6CB40': '#6f41e8', // KIN LOGO SURFACE BOTTOM

}

const colorMapLogoDarkPink = {
  '#F8C443': '#f6bcd8', // KIN LOGO OUTER BORDER TOP
  '#FFF7B6': '#89394f', // KIN LOGO INNER BORDER TOP
  '#F1AD39': '#89394f', // KIN LOGO INNER BORDER TOP
  '#B6724F': '#f6bcd8', // KIN LOGO INNER BORDER BOTTOM
  '#FFEACA': '#89394f', // KIN LOGO SURFACE BORDER TOP
  '#F8CC43': '#f6bcd8', // KIN LOGO SURFACE BORDER BOTTOM
  '#FAD75F': '#f6bcd8', // KIN LOGO SURFACE TOP
  '#F6CB40': '#89394f', // KIN LOGO SURFACE BOTTOM
}

const colorMapCoinBackgroundDark = {
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
}

const kinCoinDefaults = {
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
  // The various color schemes for this logo
  schemes: {
    'gold': {},
    'dark': { ...colorMapCoinBackgroundDark, ...colorMapLogoDark },
    'dark-gold': { ...colorMapCoinBackgroundDark },
    'dark-pink': { ...colorMapCoinBackgroundDark, ...colorMapLogoDarkPink },
  }
}

const kinLogoDefaults = {
  // All the color we want to extract into CSS and replace with the schemes
  colors: [
    { color: '#F8C443', class: 'kin-logo-outer-border-top' },
    { color: '#FFF7B6', class: 'kin-logo-outer-border-bottom' },
    { color: '#F1AD39', class: 'kin-logo-inner-border-top' },
    { color: '#B6724F', class: 'kin-logo-inner-border-bottom' },
    { color: '#FFEACA', class: 'kin-logo-surface-border-top' },
    { color: '#F8CC43', class: 'kin-logo-surface-border-bottom' },
    { color: '#FAD75F', class: 'kin-logo-surface-top' },
    { color: '#F6CB40', class: 'kin-logo-surface-bottom' },
  ],
  // The various color schemes for this logo
  schemes: {
    'gold': {},
    'dark': colorMapLogoDark,
    'purple': colorMapLogoPurple,
    'dark-pink': colorMapLogoDarkPink,
  }
}

const logoMaps = [
  createLogoMap('kin-coin-large', 'kin-coin-gold-large', kinCoinDefaults),
  createLogoMap('kin-coin-medium', 'kin-coin-gold-medium', kinCoinDefaults),
  createLogoMap('kin-coin-small', 'kin-coin-gold-small', kinCoinDefaults),
  createLogoMap('kin-logo', 'kin-logo-gold', kinLogoDefaults),
]

module.exports = { logoMaps }

import types from './types.js'

export function updateTheme(themeName) {
  return {
    type: types.display.theme,
    themeName: themeName
  }
}

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/styleMock.js" }
}

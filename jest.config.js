module.exports = {
  globals: {
    CONFIG: {
      googleAnalytics: {
        enabled: false
      },
      isUserLoggedIn: false,
      katanaRedirectPaths: [],
      searchUrl: '/mysearch?q=',
      sbaOfficeNames: ["SBA district office", "SBA regional office"]
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/jest/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  },
  modulePaths: ['<rootDir>/src/', '<rootDir>/src/client/components/'],
  setupFiles: ['<rootDir>/test/jest/setup.js'],
  testEnvironment: '<rootDir>/test/jest/environments/custom.js',
  testPathIgnorePatterns: ['/node_modules/', '.c9'],
  testURL: 'https://www.sba.gov'
}

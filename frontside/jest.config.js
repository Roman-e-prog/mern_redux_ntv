// module.exports = {
//     collectCoverage: true,
//     collectCoverageFrom: ['src/**/*.{js,jsx}'],
//     coverageDirectory: 'coverage',
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// }

const config = {
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest" 
    },
    moduleNameMapper: {
        "axios": "<rootDir>/node_modules/axios/dist/axios.min.js",
        "\\.(css|less)$": "identity-obj-proxy" //for css imports jest not handles out of the box
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
      testEnvironment: 'jsdom',
    //   transformIgnorePatterns: [
    //     "node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@bundled-es-modules/js-levenshtein) @bundled-es-modules/statuses",
    //   ]
}

module.exports = config;

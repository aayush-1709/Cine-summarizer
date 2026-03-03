const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    testEnvironment: 'jest-environment-node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

module.exports = createJestConfig(customJestConfig)

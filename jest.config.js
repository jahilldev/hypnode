/* -----------------------------------
 *
 * Jest
 *
 * -------------------------------- */

module.exports = {
   testEnvironment: 'jsdom',
   globals: { __DEV__: true },
   roots: ['<rootDir>'],
   collectCoverage: true,
   collectCoverageFrom: ['src/**/*.{ts,tsx}'],
   coverageDirectory: 'tests/coverage',
   coveragePathIgnorePatterns: ['/node_modules/', '(.*).d.ts'],
   coverageThreshold: {
      global: {
         statements: 96,
         branches: 90,
         functions: 93,
         lines: 97,
      },
   },
   transform: {
      '^.+\\.tsx?$': 'ts-jest',
   },
};

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
         statements: 100,
         branches: 95,
         functions: 100,
         lines: 100,
      },
   },
   transform: {
      '^.+\\.tsx?$': 'ts-jest',
   },
};

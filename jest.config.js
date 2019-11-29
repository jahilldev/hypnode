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
         statements: 82,
         branches: 70,
         functions: 81,
         lines: 80,
      },
   },
   transform: {
      '^.+\\.tsx?$': 'ts-jest',
   },
};

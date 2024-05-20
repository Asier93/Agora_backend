module.exports = {
    testEnvironment: 'node',
    transform: {},
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Mapea los módulos en la carpeta src
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    testTimeout: 40000,
  };
  
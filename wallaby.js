module.exports = function(wallaby) {
  return {
    files: ['src/model/*.ts', 'input/sample-input.txt'],

    tests: ['__tests__/*.ts'],

    env: {
      type: 'node'
    },

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({})
    },

    testFramework: 'jest'
  };
};

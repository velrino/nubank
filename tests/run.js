const fs = require('fs');
const path = require('path');

function requireTestFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    const testFiles = files.filter(file => file.endsWith('.test.js'));

    testFiles.forEach(testFile => {
      const filePath = path.join(directory, testFile)
        .replace(/tests\//, './')
        .replace(/\.js$/, '');

      console.log(`Running test file: ${filePath}\n`);
      require(filePath);
    });

    files.forEach(file => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        requireTestFiles(filePath);
      }
    });
  });
}

const testsDirectory = './tests';

requireTestFiles(testsDirectory);

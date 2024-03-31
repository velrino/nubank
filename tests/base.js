const assert = require("assert");

const iconWhenTestIsSuccess = "✅";

const describe = (testname, tests) => {
  console.log(`Running test: ${testname}\n`);
  tests()
  console.log('\n')
};

const run = (description) => {
  console.info(`${iconWhenTestIsSuccess} ${description}`);
};

module.exports = {
  describe,
  run,
  assert,
};

const fs = require('fs');
const { assert, describe, run } = require("../../../base");
const { CapitalGainProcess } = require("../../../../src/domain/capital-gain/presentation/capital-gain.controller");

describe("CapitalGainProcess", () => {
  (function () {
    run("When Input case 1");
    const input = fs.readFileSync(__dirname + "/../../../../operations/1.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
    ]);
  })();

  (function () {
    run("When Input case 2");
    const input = fs.readFileSync(__dirname + "/../../../../operations/2.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "10000.00" },
      { tax: "0.00" },
    ]);
  })();

  (function () {
    run("When Input case 3");
    const input = fs.readFileSync(__dirname + "/../../../../operations/3.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "1000.00" },
    ]);
  })();

  (function () {
    run("When Input case 4");
    const input = fs.readFileSync(__dirname + "/../../../../operations/4.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
    ]);
  })();

  (function () {
    run("When Input case 5");
    const input = fs.readFileSync(__dirname + "/../../../../operations/5.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "10000.00" },
    ]);
  })();

  (function () {
    run("When Input case 6");
    const input = fs.readFileSync(__dirname + "/../../../../operations/6.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "3000.00" },
    ]);
  })();


  (function () {
    run("When Input case 7");
    const input = fs.readFileSync(__dirname + "/../../../../operations/7.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "3000.00" },
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "3700.00" },
      { tax: "0.00" },
    ]);
  })();

  (function () {
    run("When Input case 8");
    const input = fs.readFileSync(__dirname + "/../../../../operations/8.json");

    const result = CapitalGainProcess(input);

    console.log(result)

    assert.deepEqual(result, [
      { tax: "0.00" },
      { tax: "80000.00" },
      { tax: "0.00" },
      { tax: "60000.00" },
    ]);
  })();
});

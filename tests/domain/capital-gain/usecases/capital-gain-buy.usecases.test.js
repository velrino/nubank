const { CapitalGainBuyUseCase } = require("../../../../src/domain/capital-gain/usecases/capital-gain-buy.usecases");
const { run, describe, assert } = require("../../../base");

describe("CapitalGainBuyUseCase", () => {
  (function () {
    run("Should correctly perform buy operation with weightedAverage 0");

    const result = CapitalGainBuyUseCase({
      actualStocks: 5000,
      quantity: 5000,
      unitCost: 15,
      weightedAverage: 0,
    });

    assert.deepEqual(result, {
      actualStocks: 10000,
      weightedAverage: 15,
      tax: {
        tax: 0.0,
      },
    });
  })();

  (function () {
    run("Should correctly perform buy operation with weightedAverage NOT 0");

    const result = CapitalGainBuyUseCase({
      actualStocks: 10000,
      quantity: 5000,
      unitCost: 30,
      weightedAverage: 15,
    });

    assert.deepEqual(result, {
      actualStocks: 15000,
      weightedAverage: 20,
      tax: {
        tax: 0.0,
      },
    });
  })();
});
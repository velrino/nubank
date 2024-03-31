const { CapitalGainSellUseCase } = require("../../../../src/domain/capital-gain/usecases/capital-gain-sell.usecases");
const { run, describe, assert } = require("../../../base");

describe("CapitalGainSellUseCase", () => {

  (function () {
    run("Should correctly perform sell operation");

    const result = CapitalGainSellUseCase({
      unitCost: 20,
      actualStocks: 20000,
      quantity: 10000,
      accumulatedLoss: 0,
      weightedAverage: 15,
    });

    assert.deepEqual(result, {
      accumulatedLoss: 0,
      actualStocks: 10000,
      tax: { tax: "10000.00" },
    });
  })();

  (function () {
    run("Should correctly perform sell operation with loss");

    const result = CapitalGainSellUseCase({
      unitCost: 2,
      actualStocks: 10000,
      quantity: 5000,
      accumulatedLoss: 0,
      weightedAverage: 10,
    });

    assert.deepEqual(result, {
      accumulatedLoss: 40000,
      actualStocks: 5000,
      tax: { tax: "0.00" },
    });
  })();

  (function () {
    run("Should correctly perform sell operation with loss and accumulatedLoss");

    const result = CapitalGainSellUseCase({
      unitCost: 20,
      actualStocks: 5000,
      quantity: 2000,
      accumulatedLoss: 40000,
      weightedAverage: 10,
    });

    assert.deepEqual(result, {
      accumulatedLoss: 20000,
      actualStocks: 3000,
      tax: { tax: "0.00" },
    });
  })();
});

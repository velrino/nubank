const { assert, describe, run } = require("../../../base");
const { TaxCalculator, StockCalculator, LossCalculator } = require("../../../../src/domain/capital-gain/adapters/capital-gain.adapter");

describe("TaxCalculator.hasPayTax", () => {
  run("Total sell cost of 30000 should have tax", () => {
    const result = TaxCalculator.hasPayTax(30000);
    assert.equal(result, true);
  });

  run("Total sell cost of 20000 should not have tax", () => {
    const result = TaxCalculator.hasPayTax(20000);
    assert.equal(result, false);
  });

  run("Total sell cost of 10000 should not have tax", () => {
    const result = TaxCalculator.hasPayTax(10000);
    assert.equal(result, false);
  });
});

describe("LossCalculator.saleHadLoss", () => {
  run("Sale with sell unit price of 30 and average of 15 should not have loss", () => {
    const result = LossCalculator.saleHadLoss(30, 15);
    assert.equal(result, false);
  });

  run("Sale with sell unit price of 15 and average of 30 should have loss", () => {
    const result = LossCalculator.saleHadLoss(15, 30);
    assert.equal(result, true);
  });
});

describe("LossCalculator.hasProfit", () => {
  run("Accumulated loss of 3000 should not have profit", () => {
    const result = LossCalculator.hasProfrun(3000);
    assert.equal(result, false);
  });

  run("Accumulated loss of -3000 should have profit", () => {
    const result = LossCalculator.hasProfrun(-3000);
    assert.equal(result, true);
  });
});

describe("TaxCalculator.taxCalculation", () => {
  run("Tax calculation of 3000 should be 600", () => {
    const result = TaxCalculator.taxCalculation(3000);
    assert.equal(result, 3000 * 0.2);
  });

  run("Tax calculation of 3000 should not be equal to 1200", () => {
    const result = TaxCalculator.taxCalculation(3000);
    assert.notEqual(result, 3000 * 0.4);
  });
});

describe("StockCalculator.isZero", () => {
  run("Value 10 should not be equal to 0", () => {
    const result = StockCalculator.isZero(10);
    assert.equal(result, false);
  });

  run("Value 0 should be equal to 0", () => {
    const result = StockCalculator.isZero(0);
    assert.equal(result, true);
  });
});

describe("LossCalculator.calculateLoss", () => {
  run("Calculate loss should be 50000", () => {
    const result = LossCalculator.calculateLoss({
      actualStocks: 10000,
      weightedAverage: 10,
      unitCostSell: 20,
      quantity: 5000,
    });
    assert.equal(result, 50000);
  });

  run("Calculate loss should be 100000", () => {
    const result = LossCalculator.calculateLoss({
      actualStocks: 10000,
      weightedAverage: 30,
      unitCostSell: 10,
      quantity: 5000,
    });
    assert.equal(result, 100000);
  });
});

describe("StockCalculator.increaseStocks", () => {
  run("Increase stocks should be 3000", () => {
    const result = StockCalculator.increaseStocks({
      actualStocks: 1000,
      stocksToAdd: 2000,
    });
    assert.equal(result, 3000);
  });

});

describe("LossCalculator.deductionLoss", () => {
  run("Deduction loss should be 5000", () => {
    const result = LossCalculator.deductionLoss({
      accumulatedLoss: 10000,
      valueToDeduction: 5000,
    });
    assert.equal(result, 5000);
  });
});

describe("LossCalculator.hasLossToDeduction", () => {
  run("Has loss to deduction should be true", () => {
    const result = LossCalculator.hasLossToDeduction(1000);
    assert.equal(result, true);
  });

  run("Has loss to deduction should be false", () => {
    const result = LossCalculator.hasLossToDeduction(0);
    assert.equal(result, false);
  });

});

describe("StockCalculator.calculateTotal", () => {
  run("Calculate total should be 30000", () => {
    const result = StockCalculator.calculateTotal(10, 3000);
    assert.equal(result, 30000);
  });
});

describe("StockCalculator.calculateWeightedAverage", () => {
  run("Calculate weighted average should be 2166.67", () => {
    const result = StockCalculator.calculateWeightedAverage({
      totalActualStocks: 100000,
      totalBuyStocks: 30000,
      quantityActualStocks: 40,
      quantityBuyStocks: 20,
    });
    assert.equal(result, 2166.67);
  });

  run("Calculate weighted average should be 15", () => {
    const result = StockCalculator.calculateWeightedAverage({
      totalActualStocks: 100000,
      totalBuyStocks: 125000,
      quantityActualStocks: 10000,
      quantityBuyStocks: 5000,
    });
    assert.equal(result, 15);
  });
});

describe("TaxCalculator.zeroTax", () => {
  run("Zero tax should return 0", () => {
    const result = TaxCalculator.zeroTax();
    assert.equal(result, 0);
  });
});

describe("TaxCalculator.formatResource", () => {
  run("Format resource should return tax with two decimal cases 15.44", () => {
    const result = TaxCalculator.formatResource(15.4356);
    assert.deepEqual(result, {
      tax: 15.44,
    });
  });

  run("Format resource should return tax with two decimal cases 10.00", () => {
    const result = TaxCalculator.formatResource(10);
    assert.deepEqual(result, {
      tax: 10.0,
    });
  });
});

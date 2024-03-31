const { TaxCalculator, LossCalculator, StockCalculator } = require("../adapters/capital-gain.adapter");

const CapitalGainSellUseCase = ({
  unitCost,
  actualStocks,
  quantity,
  accumulatedLoss,
  weightedAverage,
}) => {
  let unitCostSell = unitCost;
  let totalWithSellPrice = StockCalculator.calculateTotal(unitCost, quantity);
  let totalWithWeightedAverage = StockCalculator.calculateTotal(weightedAverage, quantity);

  actualStocks -= quantity;

  if (LossCalculator.saleHadLoss(unitCostSell, weightedAverage)) {
    accumulatedLoss = LossCalculator.calculateLoss({
      actualStocks: actualStocks,
      weightedAverage: weightedAverage,
      unitCostSell: unitCostSell,
      quantity: quantity,
    });

    return {
      accumulatedLoss,
      actualStocks,
      tax: TaxCalculator.formatTax(TaxCalculator.zeroTax()),
    };
  }

  let valueToDeduction = 0;
  let tax = 0;

  if (LossCalculator.hasLossToDeduction(accumulatedLoss)) {
    valueToDeduction = LossCalculator.calculateLoss({
      actualStocks: actualStocks,
      weightedAverage: weightedAverage,
      unitCostSell: unitCostSell,
      quantity: quantity,
    });

    accumulatedLoss = LossCalculator.deductionLoss({
      accumulatedLoss: accumulatedLoss,
      valueToDeduction: valueToDeduction,
    });
  }

  const totalSaleCost = totalWithSellPrice - valueToDeduction;

  if (!TaxCalculator.hasPayTax(totalSaleCost)) {
    return {
      accumulatedLoss,
      actualStocks,
      tax: TaxCalculator.formatTax(TaxCalculator.zeroTax()),
    };
  }

  const profit = LossCalculator.hasProfit(accumulatedLoss) ? accumulatedLoss : totalSaleCost - totalWithWeightedAverage;
  tax = TaxCalculator.taxCalculation(profit);

  return {
    accumulatedLoss,
    actualStocks,
    tax: TaxCalculator.formatTax(tax),
  };
};

module.exports = {
  CapitalGainSellUseCase
};

const { TaxCalculator, StockCalculator } = require("../adapters/capital-gain.adapter");

const CapitalGainBuyUseCase = ({ unitCost, quantity, actualStocks, weightedAverage }) => {
  const updatedActualStocks = StockCalculator.increaseStocks({ actualStocks, stocksToAdd: quantity });

  const updatedWeightedAverage = StockCalculator.isZero(weightedAverage)
    ? unitCost
    : StockCalculator.calculateWeightedAverage({
      totalActualStocks: StockCalculator.calculateTotal(actualStocks, weightedAverage),
      totalBuyStocks: StockCalculator.calculateTotal(quantity, unitCost),
      quantityActualStocks: actualStocks,
      quantityBuyStocks: quantity,
    });


  const tax = TaxCalculator.formatTax(0);

  return { actualStocks: updatedActualStocks, weightedAverage: updatedWeightedAverage, tax };
};

module.exports = { CapitalGainBuyUseCase };

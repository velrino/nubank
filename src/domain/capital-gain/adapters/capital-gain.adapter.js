const TAX_THRESHOLD = 20000;
const TAX_RATE = 0.2;

const TaxCalculator = {
    hasPayTax: (totalSellCost) => totalSellCost > TAX_THRESHOLD,

    taxCalculation: (value) => Math.abs(value * TAX_RATE),

    zeroTax: () => 0,

    formatTax: (value) => ({ tax: value.toFixed(2) }),
};

const LossCalculator = {
    saleHadLoss: (unitCostSell, weightedAverage) => unitCostSell < weightedAverage,

    hasProfit: (accumulatedLoss) => accumulatedLoss < 0,

    calculateLoss: ({ actualStocks, weightedAverage, unitCostSell, quantity }) => Math.abs(
        actualStocks * weightedAverage +
        unitCostSell * quantity -
        (actualStocks + quantity) * weightedAverage
    ),

    deductionLoss: ({ accumulatedLoss, valueToDeduction }) => accumulatedLoss - valueToDeduction,

    hasLossToDeduction: (accumulatedLoss) => accumulatedLoss > 0
};

const StockCalculator = {
    increaseStocks: ({ actualStocks, stocksToAdd }) => actualStocks + stocksToAdd,

    calculateTotal: (unitCost, quantity) => unitCost * quantity,

    isZero: (value) => value === 0,

    calculateWeightedAverage: ({ totalActualStocks, totalBuyStocks, quantityActualStocks, quantityBuyStocks }) => Math.round(
        (totalActualStocks + totalBuyStocks) /
        (quantityActualStocks + quantityBuyStocks) * 100
    ) / 100,
};

module.exports = {
    TaxCalculator,
    LossCalculator,
    StockCalculator
};

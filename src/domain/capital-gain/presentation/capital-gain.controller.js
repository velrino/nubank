const { CapitalGainOperationEnum } = require("../enums/capital-gain.enum");
const { CapitalGainBuyUseCase } = require("../usecases/capital-gain-buy.usecases");
const { CapitalGainSellUseCase } = require("../usecases/capital-gain-sell.usecases");

function processBuyOperation(args, quantity, weightedAverageOperations, actualStocksOperations) {
    const { weightedAverage, actualStocks, tax } = CapitalGainBuyUseCase({
        unitCost: args["unit-cost"],
        quantity,
        actualStocks: actualStocksOperations,
        weightedAverage: weightedAverageOperations,
    });
    return { tax, weightedAverage, actualStocks };
}

function processSellOperation(args, quantity, weightedAverageOperations, actualStocksOperations, lossOperations) {
    const { accumulatedLoss, actualStocks, tax } = CapitalGainSellUseCase({
        unitCost: args["unit-cost"],
        quantity,
        actualStocks: actualStocksOperations,
        accumulatedLoss: lossOperations,
        weightedAverage: weightedAverageOperations,
    });
    return { tax, accumulatedLoss, actualStocks };
}

function CapitalGainProcess(inputLine) {
    const operations = JSON.parse(inputLine);
    let weightedAverageOperations = 0;
    let actualStocksOperations = 0;
    let lossOperations = 0;

    return operations.map(({ operation, quantity, ...args }) => {
        let tax = 0;
        if (operation === CapitalGainOperationEnum.buy) {
            const { tax: buyTax, weightedAverage, actualStocks } = processBuyOperation(args, quantity, weightedAverageOperations, actualStocksOperations);
            weightedAverageOperations = weightedAverage;
            actualStocksOperations = actualStocks;
            tax = buyTax;
        } else if (operation === CapitalGainOperationEnum.sell) {
            const { tax: sellTax, accumulatedLoss, actualStocks } = processSellOperation(args, quantity, weightedAverageOperations, actualStocksOperations, lossOperations);
            lossOperations = accumulatedLoss;
            actualStocksOperations = actualStocks;
            tax = sellTax;
        }
        return tax;
    });
}

module.exports = {
    CapitalGainProcess,
};

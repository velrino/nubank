#!/usr/bin/env node

const { main, log } = require("./src/application/cli");
const { CapitalGainProcess } = require("./src/domain/capital-gain/presentation/capital-gain.controller");

function processInput(input) {
    const response = CapitalGainProcess(input);
    
    log(response);
}

main(processInput);

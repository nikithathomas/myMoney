const { Portfolio } = require("./portfolio");
const {
    MONTH_JUNE,
    MONTH_DECEMBER,
    MONTH_JANUARY
} = require("./constants");

class ProcessPortfolio {

    constructor() {
        this.monthlyPortfolioMap = new Map();
        this.changeCount = 0;
        this.portfolioObject = '';
    }
    // Allocate Initial investment
    allocateInvestment(equityInvestment, debtInvestment, goldInvestment) {
        if (!isNaN(equityInvestment) && !isNaN(debtInvestment) && !isNaN(goldInvestment)) {
            const totalInvestment = Math.floor(
                equityInvestment + debtInvestment + goldInvestment
            );
            const percentEquity = Math.floor((equityInvestment / totalInvestment) * 100);
            const percentDebt = Math.floor((debtInvestment / totalInvestment) * 100);
            const percentGold = Math.floor((goldInvestment / totalInvestment) * 100);
            this.portfolioObject = new Portfolio(
                equityInvestment,
                debtInvestment,
                goldInvestment,
                totalInvestment,
                percentEquity,
                percentDebt,
                percentGold
            );
        }
    }

    // Allocate monthly SIP
    allocateSip(
        addEquityInvestment,
        addDebtInvestment,
        addGoldInvestment
    ) {
        if (typeof this.portfolioObject === 'object' && !isNaN(addEquityInvestment) && !isNaN(addDebtInvestment) && !isNaN(addGoldInvestment)) {
            this.portfolioObject.setSipPayments(addEquityInvestment, addDebtInvestment, addGoldInvestment);
        }
    }

    // Increment investment with montly SIP
    addSipToExisting(percentEquity, percentDebt, percentGold, month) {
        if (typeof this.portfolioObject === 'object' && month.length) {
            // convert string to the decimal percentages
            const percentEquityChange = parseFloat(percentEquity);
            const percentDebtChange = parseFloat(percentDebt);
            const percentGoldChange = parseFloat(percentGold);

            // increment by SIP only if the month is greater than January
            if (this.changeCount > MONTH_JANUARY) {
                this.portfolioObject.incrementInvestmentsWithSip();
            }
            if (!isNaN(percentEquityChange) && !isNaN(percentDebtChange) && !isNaN(percentGoldChange)) {
                // calculate the growth or loss of the fund
                this.portfolioObject.calculateGrowthAndLossOfInvestments(percentEquityChange, percentDebtChange, percentGoldChange);
            }
            // rebalance portfolio by the 6th month and 12th month
            if (this.changeCount === MONTH_JUNE || this.changeCount === MONTH_DECEMBER) {
                this.rebalancePortfolio();
            }

            // set the investment into the map for ever month
            const monthlyEquityInvest = this.portfolioObject.equityInvestment;
            const monthlyDebtInvest = this.portfolioObject.debtInvestment;
            const monthlyGoldInvest = this.portfolioObject.goldInvestment;
            this.monthlyPortfolioMap.set(month, new Portfolio(monthlyEquityInvest, monthlyDebtInvest, monthlyGoldInvest, 0));
        }
    }

    // Calculate monthly amount
    calculateChange(percentEquityChange, percentDebtChange, percentGoldChange, month) {
        if (month && month.length) {
            this.changeCount += 1;
            this.addSipToExisting(percentEquityChange, percentDebtChange, percentGoldChange, month);
        }
    }

    // Display final investment of a month requested
    calculateBalanceForMonth(month) {
        if (month && month.length) {
            const monthBalanceObj = this.monthlyPortfolioMap.get(month);
            if (monthBalanceObj) {
                console.log(`${monthBalanceObj.equityInvestment} ${monthBalanceObj.debtInvestment} ${monthBalanceObj.goldInvestment}`);
            }
        }
    }

    // Rebalance Portfolio according to allocated percentages
    rebalancePortfolio() {
        this.portfolioObject.rebalancePortfolioAllocations();
    }

    // Display rebalanced portfolio values
    displayRebalance() {
        let rebalancedValues = '';
        if (this.changeCount > MONTH_JUNE - 1) {
            const rebalancedPortfolio = (this.changeCount < MONTH_DECEMBER) ? this.monthlyPortfolioMap.get('JUNE') : this.portfolioObject;
            if (rebalancedPortfolio) {
                rebalancedValues = `${rebalancedPortfolio.equityInvestment} ${rebalancedPortfolio.debtInvestment} ${rebalancedPortfolio.goldInvestment}`;
            }
        } else {
            rebalancedValues = 'CANNOT_REBALANCE';
        }
        console.log(rebalancedValues);
    }

    // Decide the function to execute on the portfolio
    processPortfolio(data) {
        data.split("\n").forEach((newLine) => {
            const spaceSplitArray = newLine.split(" ");
            if (spaceSplitArray.length) {
                const portfolioAction = spaceSplitArray[0];
                switch (portfolioAction) {
                    case 'ALLOCATE':
                        this.allocateInvestment(parseInt(spaceSplitArray[1], 10), parseInt(spaceSplitArray[2], 10), parseInt(spaceSplitArray[3], 10));
                        break;
                    case 'SIP':
                        this.allocateSip(parseInt(spaceSplitArray[1], 10), parseInt(spaceSplitArray[2], 10), parseInt(spaceSplitArray[3], 10));
                        break;
                    case 'CHANGE':
                        this.calculateChange(spaceSplitArray[1], spaceSplitArray[2], spaceSplitArray[3], spaceSplitArray[4]);
                        break;
                    case 'BALANCE':
                        this.calculateBalanceForMonth(spaceSplitArray[1]);
                        break;
                    case 'REBALANCE':
                        this.displayRebalance();
                        break;
                }
            }
        });
    }
}

module.exports = {
    ProcessPortfolio: ProcessPortfolio,
};
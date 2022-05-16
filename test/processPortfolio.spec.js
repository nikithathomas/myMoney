const assert = require('assert');
const expect=require('expect.js');
const { ProcessPortfolio } = require('../js/processPortfolio');

let portfolioProcess = new ProcessPortfolio();

describe('Testing Process Portfolio', () => {
    describe('Testing allocateInvestment', () => {
        it('Passing correct investment allocations', () => {
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const totalInvestment = Math.floor(
                equityInvestment + debtInvestment + goldInvestment
            );
            const percentEquity = Math.floor((equityInvestment / totalInvestment) * 100);
            const percentDebt = Math.floor((debtInvestment / totalInvestment) * 100);
            const percentGold = Math.floor((goldInvestment / totalInvestment) * 100);
            portfolioProcess.allocateInvestment(equityInvestment, debtInvestment, goldInvestment);

            assert.equal(portfolioProcess.portfolioObject.percentEqInvest,percentEquity);
            assert.equal(portfolioProcess.portfolioObject.percentDebtInvest,percentDebt);
            assert.equal(portfolioProcess.portfolioObject.percentGoldInvest,percentGold);
        });
        it('Passing undefined investment allocations', () => {
            const equityInvestment=parseInt(undefined,10);
            const debtInvestment=parseInt(undefined,10);
            const goldInvestment=parseInt(undefined,10);
            portfolioProcess.allocateInvestment(equityInvestment, debtInvestment, goldInvestment);

            assert.equal(portfolioProcess.portfolioObject,'');
        });
        beforeEach('Before Each Allocate Investment', () => {
            portfolioProcess = new ProcessPortfolio();

        });
    });
    describe('Testing allocateSip',()=>{
        it('Passing correct SIP allocations',()=>{
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            assert.equal(portfolioProcess.portfolioObject.equityInvestmentSip,addEquityInvestment);
            assert.equal(portfolioProcess.portfolioObject.debtInvestmentSip,addDebtInvestment);
            assert.equal(portfolioProcess.portfolioObject.goldInvestmentSip,addGoldInvestment);
        });
        it('Passing valid SIP allocations with portfolio object undefined',()=>{
            const equityInvestment=parseInt(undefined,10);
            const debtInvestment=parseInt(undefined,10);
            const goldInvestment=parseInt(undefined,10);
            portfolioProcess.allocateInvestment(equityInvestment, debtInvestment, goldInvestment);
            const addEquityInvestment=parseInt(undefined,10);
            const addDebtInvestment=parseInt(undefined,10);
            const addGoldInvestment=parseInt(undefined,10);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            assert.equal(portfolioProcess.portfolioObject,'');
        });
        it('Passing undefined SIP allocations',()=>{
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt(undefined,10);
            const addDebtInvestment=parseInt(undefined,10);
            const addGoldInvestment=parseInt(undefined,10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            assert.equal(portfolioProcess.portfolioObject.equityInvestmentSip,0);
            assert.equal(portfolioProcess.portfolioObject.debtInvestmentSip,0);
            assert.equal(portfolioProcess.portfolioObject.goldInvestmentSip,0);
        });
        beforeEach('Before each SIP allocation',()=>{
            portfolioProcess = new ProcessPortfolio();
        });
    });

    describe("Testing calculateChange function",()=>{
        it("Passing an undefined portfolio object",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt(undefined,10);
            const debtInvestment=parseInt(undefined,10);
            const goldInvestment=parseInt(undefined,10);
            portfolioProcess.allocateInvestment(equityInvestment, debtInvestment, goldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MARCH");
            assert.equal(portfolioProcess.portfolioObject,'');
        });
        it("Passing incorrect input with empty month",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"");
            assert.equal(portfolioProcess.monthlyPortfolioMap.size,0);
        });
        it("Passing incorrect input with undefined percentages",()=>{
            const percentEquity=undefined;
            const percentDebt=undefined;
            const percentGold=undefined;
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MARCH");
            assert.equal(portfolioProcess.portfolioObject.equityInvestment,equityInvestment);
            assert.equal(portfolioProcess.portfolioObject.debtInvestment,debtInvestment);
            assert.equal(portfolioProcess.portfolioObject.goldInvestment,goldInvestment);
            assert.equal(portfolioProcess.monthlyPortfolioMap.size,1);
        });
        it("Passing input with deposit being more than once",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"FEBRUARY");            
            expect(portfolioProcess.portfolioObject.equityInvestment).to.be.greaterThan(equityInvestment+addEquityInvestment);
            expect(portfolioProcess.portfolioObject.debtInvestment).to.be.greaterThan(debtInvestment+addDebtInvestment);
            expect(portfolioProcess.portfolioObject.goldInvestment).to.be.greaterThan(goldInvestment+addGoldInvestment);
            assert.equal(portfolioProcess.monthlyPortfolioMap.size,2);
        });
        it("Passing input with deposit being more than 6 or 12 months",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"FEBRUARY");     
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MARCH");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"APRIL");      
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MAY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JUNE");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JULY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"AUGUST");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"SEPTEMBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"OCTOBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"NOVEMBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"DECEMBER");
            expect(portfolioProcess.portfolioObject.equityInvestment).to.be.greaterThan(equityInvestment+addEquityInvestment);
            expect(portfolioProcess.portfolioObject.debtInvestment).to.be.greaterThan(debtInvestment+addDebtInvestment);
            expect(portfolioProcess.portfolioObject.goldInvestment).to.be.greaterThan(goldInvestment+addGoldInvestment);
            assert.equal(portfolioProcess.monthlyPortfolioMap.size,12);
        });
        beforeEach('Before each SIP allocation',()=>{
            portfolioProcess = new ProcessPortfolio();
        });
    });
    describe("Testing calculateBalanceForMonth",()=>{
        it("Passing an undefined input",()=>{
            portfolioProcess.calculateBalanceForMonth();
        });
        it("Passing an empty month",()=>{
            portfolioProcess.calculateBalanceForMonth('');
        });
        it("Passing a month input which does not exist",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateBalanceForMonth('MARCH');
        });
        it("Passing a month input which exists",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateBalanceForMonth('JANUARY');
        });
        beforeEach('Before each SIP allocation',()=>{
            portfolioProcess = new ProcessPortfolio();
        });
    });
    describe("Testing displayRebalance function",()=>{
        it("Passing months lesser than 6",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.displayRebalance();
        });
        it("Passing months lesser than 12",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"FEBRUARY");     
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MARCH");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"APRIL");      
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MAY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JUNE");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JULY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"AUGUST");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"SEPTEMBER");
            portfolioProcess.displayRebalance();
        });
        it("Passing months equal to 12",()=>{
            const percentEquity='1.00%';
            const percentDebt='10.00%';
            const percentGold='3.00%';
            const equityInvestment=parseInt('100',10);
            const debtInvestment=parseInt('200',10);
            const goldInvestment=parseInt('300',10);
            const addEquityInvestment=parseInt('1000',10);
            const addDebtInvestment=parseInt('2000',10);
            const addGoldInvestment=parseInt('3000',10);
            portfolioProcess.allocateInvestment(equityInvestment,debtInvestment,goldInvestment);
            portfolioProcess.allocateSip(addEquityInvestment,addDebtInvestment,addGoldInvestment);
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JANUARY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"FEBRUARY");     
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MARCH");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"APRIL");      
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"MAY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JUNE");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"JULY");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"AUGUST");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"SEPTEMBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"OCTOBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"NOVEMBER");
            portfolioProcess.calculateChange(percentEquity,percentDebt,percentGold,"DECEMBER");
            portfolioProcess.displayRebalance();
        });
    });
})
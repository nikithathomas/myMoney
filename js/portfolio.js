// Portfolio Object

class Portfolio {
  constructor(
    equityInvestment,
    debtInvestment,
    goldInvestment,
    totalInvestment,
    percentEqInvest=0,
    percentDebtInvest=0,
    percentGoldInvest=0,
    equityInvestmentSip=0,
    debtInvestmentSip=0,
    goldInvestmentSip=0
  ) {
    this._equityInvestment = equityInvestment;
    this._debtInvestment = debtInvestment;
    this._goldInvestment = goldInvestment;
    this._totalInvestment = totalInvestment;
    this._percentEqInvest = percentEqInvest;
    this._percentDebtInvest = percentDebtInvest;
    this._percentGoldInvest = percentGoldInvest;
    this._equityInvestmentSip = equityInvestmentSip;
    this._debtInvestmentSip = debtInvestmentSip;
    this._goldInvestmentSip=goldInvestmentSip;
  }
  get equityInvestment() {
    return this._equityInvestment;
  }
  set equityInvestment(equityInvestment) {
    this._equityInvestment = equityInvestment;
  }
  get debtInvestment() {
    return this._debtInvestment;
  }
  set debtInvestment(debtInvestment) {
    this._debtInvestment = debtInvestment;
  }
  get goldInvestment() {
    return this._goldInvestment;
  }
  set goldInvestment(goldInvestment) {
    this._goldInvestment = goldInvestment;
  }
  get totalInvestment() {
    return this._totalInvestment;
  }
  set totalInvestment(totalInvestment) {
    this._totalInvestment = totalInvestment;
  }
  get percentEqInvest() {
    return this._percentEqInvest;
  }
  set percentEqInvest(percentEqInvest) {
    this._percentEqInvest = percentEqInvest;
  }
  get percentDebtInvest() {
    return this._percentDebtInvest;
  }
  set percentDebtInvest(percentDebtInvest) {
    this._percentDebtInvest = percentDebtInvest;
  }
  get percentGoldInvest() {
    return this._percentGoldInvest;
  }
  set percentGoldInvest(percentGoldInvest) {
    this._percentGoldInvest = percentGoldInvest;
  }
  get equityInvestmentSip(){
      return this._equityInvestmentSip;
  }
  set equityInvestmentSip(equityInvestmentSip){
      this._equityInvestmentSip=equityInvestmentSip;
  }
  get debtInvestmentSip(){
    return this._debtInvestmentSip;
  }
  set debtInvestmentSip(debtInvestmentSip){
    this._debtInvestmentSip=debtInvestmentSip;
  }
  get goldInvestmentSip(){
    return this._goldInvestmentSip;
  }
  set goldInvestmentSip(goldInvestmentSip){
    this._goldInvestmentSip=goldInvestmentSip
  }
  // function to set SIP payments
  setSipPayments(addEquityInvestment,addDebtInvestment,addGoldInvestment){
    this._equityInvestmentSip = addEquityInvestment;
    this._debtInvestmentSip = addDebtInvestment;
    this._goldInvestmentSip = addGoldInvestment;
  }
  // function to increment the deposit with SIP payments
  incrementInvestmentsWithSip(){
    this._equityInvestment = this.equityInvestment + this.equityInvestmentSip;
    this._debtInvestment = this.debtInvestment + this.debtInvestmentSip;
    this._goldInvestment = this.goldInvestment + this.goldInvestmentSip;
  }
  // function to rebalance the portfolio according to existing percentages
  rebalancePortfolioAllocations(){
    this._equityInvestment = Math.floor((this.percentEqInvest * this.totalInvestment) / 100);
    this._debtInvestment = Math.floor((this.percentDebtInvest * this.totalInvestment) / 100);
    this._goldInvestment = Math.floor((this.percentGoldInvest * this.totalInvestment) / 100);
  }
  // function to increment increase or decrease of rate of interest to existing amounts
  calculateGrowthAndLossOfInvestments(percentEquityChange,percentDebtChange,percentGoldChange){
    this._equityInvestment = this.equityInvestment + Math.floor((percentEquityChange * this.equityInvestment) / 100);
    this._debtInvestment = this.debtInvestment + Math.floor((percentDebtChange * this.debtInvestment) / 100);
    this._goldInvestment = this.goldInvestment + Math.floor((percentGoldChange * this.goldInvestment) / 100);
    this._totalInvestment = this.equityInvestment + this.debtInvestment + this.goldInvestment;
  }
}
module.exports = {
  Portfolio: Portfolio,
};

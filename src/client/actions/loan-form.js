export function createLoan(loanData) {
  return {
    type: "CREATE_LOAN",
    loanData: loanData
  };
}


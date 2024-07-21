export default function calculateLoanPayment(price: number, interestRate: number, term: number, initialPayment?: number): {monthlyPayment: number, totalCost: number } {

    const netPrincipal = price - (initialPayment || 0);

    const monthlyInterestRate = interestRate / 1200;

    const totalMonths = term * 12;

    const monthlyPayment = Number((netPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)).toFixed(2));

    const totalCost = Number((monthlyPayment * totalMonths).toFixed(2));

    return {monthlyPayment, totalCost};
}

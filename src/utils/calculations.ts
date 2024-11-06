export const calculateGrowth = (
  initialInvestment: number,
  yearlyContribution: number,
  years: number,
  returnRate: number,
  inflationRate: number
) => {
  const yearlyData = [];
  let currentValue = initialInvestment;
  const currentYear = new Date().getFullYear();

  for (let i = 0; i <= years; i++) {
    const returns = i > 0 ? (currentValue + yearlyContribution) * (returnRate / 100) : 0;
    
    yearlyData.push({
      year: currentYear + i,
      initialInvestment,
      contributions: yearlyContribution * i,
      returns: returns + (i > 1 ? yearlyData[i-1].returns * (1 + returnRate/100) : 0)
    });

    currentValue = initialInvestment + yearlyContribution * (i + 1) + returns;
  }

  const finalValue = yearlyData[years].initialInvestment + 
                    yearlyData[years].contributions + 
                    yearlyData[years].returns;
                    
  const inflationAdjusted = finalValue / Math.pow(1 + inflationRate/100, years);

  return {
    yearlyData,
    finalValue,
    inflationAdjusted
  };
};
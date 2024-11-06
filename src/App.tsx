import React, { useState, useMemo } from 'react';
import GrowthChart from './components/GrowthChart';
import ScenarioSettings from './components/ScenarioSettings';
import { calculateGrowth } from './utils/calculations';
import { formatCurrency } from './utils/formatters';

function App() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [yearlyContribution, setYearlyContribution] = useState(1000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(5.3);
  const [inflationRate, setInflationRate] = useState(3);

  const { yearlyData, finalValue, inflationAdjusted } = useMemo(() => {
    return calculateGrowth(
      initialInvestment,
      yearlyContribution,
      years,
      returnRate,
      inflationRate
    );
  }, [initialInvestment, yearlyContribution, years, returnRate, inflationRate]);

  return (
    <div className="min-h-screen bg-[#FDF8F4] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h1 className="text-xl md:text-2xl text-gray-800 mb-6 leading-relaxed">
            In {years} years, the total value of your portfolio would be {formatCurrency(finalValue)},
            {inflationRate > 0 && (
              <span> but adjusting for inflation, it'd be the equivalent of {formatCurrency(inflationAdjusted)} in today's money.</span>
            )}
          </h1>

          <div className="bg-[#FDF8F4] rounded-lg p-6">
            <div className="text-[2.5rem] font-bold text-gray-900 mb-8">
              {formatCurrency(finalValue, 2)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">Initial Investment</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(initialInvestment, 2)}</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">Additional Contributions</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(yearlyContribution * years, 2)}</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">Total Return</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(finalValue - initialInvestment - (yearlyContribution * years), 2)}</div>
              </div>
            </div>
          </div>

          <GrowthChart yearlyData={yearlyData} />
        </div>

        <div className="grid md:grid-cols-[1fr,400px] gap-8">
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Understanding Your Investment Growth</h2>
              <p className="text-gray-600 mb-6">
                This calculator shows how your investments could grow over time through the power of compound interest. 
                The chart breaks down your investment into three components:
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-teal-600 rounded mr-3"></div>
                  <span className="text-gray-700">Initial Investment - Your starting amount</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-400 rounded mr-3"></div>
                  <span className="text-gray-700">Additional Contributions - Money you add over time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-300 rounded mr-3"></div>
                  <span className="text-gray-700">Investment Returns - Money earned through interest/returns</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <ScenarioSettings
              initialInvestment={initialInvestment}
              yearlyContribution={yearlyContribution}
              years={years}
              returnRate={returnRate}
              inflationRate={inflationRate}
              onInitialInvestmentChange={setInitialInvestment}
              onYearlyContributionChange={setYearlyContribution}
              onYearsChange={setYears}
              onReturnRateChange={setReturnRate}
              onInflationRateChange={setInflationRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
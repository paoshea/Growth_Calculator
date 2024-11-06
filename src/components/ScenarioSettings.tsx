import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ScenarioSettingsProps {
  initialInvestment: number;
  yearlyContribution: number;
  years: number;
  returnRate: number;
  inflationRate: number;
  onInitialInvestmentChange: (value: number) => void;
  onYearlyContributionChange: (value: number) => void;
  onYearsChange: (value: number) => void;
  onReturnRateChange: (value: number) => void;
  onInflationRateChange: (value: number) => void;
}

export default function ScenarioSettings({
  initialInvestment,
  yearlyContribution,
  years,
  returnRate,
  inflationRate,
  onInitialInvestmentChange,
  onYearlyContributionChange,
  onYearsChange,
  onReturnRateChange,
  onInflationRateChange,
}: ScenarioSettingsProps) {
  const returnRates = [3.6, 5.3, 6.8, 11.4];
  const inflationRates = [0, 1, 3, 5, 7];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Scenario Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Initial Investment
          </label>
          <div className="flex">
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => onInitialInvestmentChange(Number(e.target.value))}
              className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-teal-500"
              min="0"
            />
            <span className="bg-gray-50 px-4 py-2 border-t border-r border-b rounded-r flex items-center text-gray-600">
              GBP (£)
            </span>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Yearly Contribution
          </label>
          <input
            type="number"
            value={yearlyContribution}
            onChange={(e) => onYearlyContributionChange(Number(e.target.value))}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Years to grow
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => onYearsChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="text-center mt-2 font-medium text-gray-700">
            {years} Years
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-gray-700 font-medium">Expected rate of return</label>
            <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
          </div>
          <div className="flex gap-2">
            {returnRates.map((rate) => (
              <button
                key={rate}
                onClick={() => onReturnRateChange(rate)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors
                  ${returnRate === rate
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {rate}%
              </button>
            ))}
          </div>
          <div className="mt-2 text-teal-600 font-medium">{returnRate}%</div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-gray-700 font-medium">Estimated yearly inflation</label>
            <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {inflationRates.map((rate) => (
              <button
                key={rate}
                onClick={() => onInflationRateChange(rate)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors
                  ${inflationRate === rate
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {rate === 0 ? 'None' : `${rate}%`}
              </button>
            ))}
          </div>
          <div className="mt-2 text-teal-600 font-medium">{inflationRate}%</div>
        </div>
      </div>
    </div>
  );
}
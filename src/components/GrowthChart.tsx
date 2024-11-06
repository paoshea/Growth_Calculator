import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface ChartProps {
  yearlyData: {
    year: number;
    initialInvestment: number;
    contributions: number;
    returns: number;
  }[];
}

export default function GrowthChart({ yearlyData }: ChartProps) {
  const maxValue = Math.max(...yearlyData.map(d => d.initialInvestment + d.contributions + d.returns));
  const height = 300;

  return (
    <div className="mt-8">
      <div className="relative h-[300px]">
        <div className="absolute left-0 h-full flex flex-col justify-between text-sm text-gray-500">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              {formatCurrency(maxValue * (5 - i) / 5, 0)}
            </div>
          ))}
        </div>
        
        <div className="ml-16 h-full flex items-end space-x-2">
          {yearlyData.map((data, i) => {
            const totalHeight = ((data.initialInvestment + data.contributions + data.returns) / maxValue) * height;
            const initialHeight = (data.initialInvestment / maxValue) * height;
            const contributionsHeight = (data.contributions / maxValue) * height;
            
            return (
              <div key={i} className="flex-1 relative">
                <div className="absolute bottom-0 w-full">
                  <div 
                    style={{ height: `${totalHeight}px` }}
                    className="w-full flex flex-col-reverse transition-all duration-300"
                  >
                    <div 
                      style={{ height: `${initialHeight}px` }}
                      className="w-full bg-teal-600 transition-all duration-300"
                    />
                    <div 
                      style={{ height: `${contributionsHeight}px` }}
                      className="w-full bg-orange-400 transition-all duration-300"
                    />
                    <div 
                      className="w-full bg-yellow-300 transition-all duration-300"
                      style={{ 
                        height: `${totalHeight - initialHeight - contributionsHeight}px`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="ml-16 flex justify-between mt-2 text-sm text-gray-500">
        {yearlyData.map((data, i) => (
          <div key={i}>{data.year}</div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const MarketTicker: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([
    { symbol: 'TASI', name: 'تاسي', value: 12584.23, change: 125.45, changePercent: 1.01 },
    { symbol: 'DFM', name: 'دبي', value: 4152.67, change: -23.12, changePercent: -0.55 },
    { symbol: 'ADX', name: 'أبوظبي', value: 9876.54, change: 67.89, changePercent: 0.69 },
    { symbol: 'QSI', name: 'قطر', value: 10234.56, change: -45.67, changePercent: -0.44 },
    { symbol: 'MSM', name: 'مسقط', value: 4567.89, change: 12.34, changePercent: 0.27 },
    { symbol: 'BASI', name: 'البحرين', value: 1987.65, change: 8.76, changePercent: 0.44 },
    { symbol: 'KWSE', name: 'الكويت', value: 7654.32, change: -87.65, changePercent: -1.13 },
    { symbol: 'NASDAQ', name: 'ناسداك', value: 16274.94, change: 234.56, changePercent: 1.46 },
    { symbol: 'S&P500', name: 'إس آند بي', value: 4783.45, change: 45.67, changePercent: 0.96 },
    { symbol: 'DOW', name: 'داو جونز', value: 37863.80, change: -156.78, changePercent: -0.41 },
    { symbol: 'FTSE', name: 'فوتسي', value: 7731.65, change: 28.90, changePercent: 0.38 },
    { symbol: 'DAX', name: 'داكس', value: 16892.45, change: 112.34, changePercent: 0.67 },
    { symbol: 'CAC', name: 'كاك', value: 7578.90, change: -34.56, changePercent: -0.45 },
    { symbol: 'NIKKEI', name: 'نيكاي', value: 33445.90, change: 267.89, changePercent: 0.81 },
    { symbol: 'HSI', name: 'هانغ سنغ', value: 16334.37, change: -234.56, changePercent: -1.42 }
  ]);

  useEffect(() => {
    // محاكاة تحديث الأسعار
    const interval = setInterval(() => {
      setIndices(prevIndices =>
        prevIndices.map(index => {
          const changeAmount = (Math.random() - 0.5) * 100;
          const newValue = index.value + changeAmount;
          const newChange = index.change + changeAmount;
          const newChangePercent = (newChange / newValue) * 100;

          return {
            ...index,
            value: newValue,
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/90 border-b border-gold/20 overflow-hidden">
      <div className="relative flex">
        <div className="animate-scroll flex space-x-8 py-2 px-4">
          {[...indices, ...indices].map((index, i) => (
            <div
              key={`${index.symbol}-${i}`}
              className="flex items-center space-x-2 text-sm whitespace-nowrap"
            >
              <span className="text-gold font-semibold">{index.name}:</span>
              <span className="text-white">{index.value.toFixed(2)}</span>
              <div className={`flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {index.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}</span>
                <span className="ml-1">({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;

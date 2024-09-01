import React from 'react';

const feeStructures = [
  { class: '1', monthlyFee: 2000, yearlyFee: 22000 },
  { class: '2', monthlyFee: 2100, yearlyFee: 23100 },
  { class: '3', monthlyFee: 2200, yearlyFee: 24200 },
  // Add more classes up to 12
  { class: '12', monthlyFee: 3000, yearlyFee: 33000 },
];

const FeeStructure = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Fee Structure</h2>
        <div className="space-y-4">
          {feeStructures.map((fee, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold">Class: {fee.class}</h3>
              <p>Monthly Fee: PKR {fee.monthlyFee}</p>
              <p>Yearly Fee: PKR {fee.yearlyFee}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;

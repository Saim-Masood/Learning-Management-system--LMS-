import React from 'react';
import { useNavigate } from 'react-router-dom';

const feeVouchers = [
  { id: 1, class: '1', dueAmount: 2000 },
  { id: 2, class: '2', dueAmount: 2100 },
  { id: 3, class: '3', dueAmount: 2200 },
  // Add more fee vouchers as needed
];

const FeeVoucher = () => {
  const navigate = useNavigate();

  const handlePayNow = (id) => {
    navigate(`/dashboard/fees/submission/${id}`);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Fee Vouchers</h2>
        <div className="space-y-4">
          {feeVouchers.map((voucher) => (
            <div key={voucher.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Class: {voucher.class}</h3>
                <p>Due Amount: PKR {voucher.dueAmount}</p>
              </div>
              <button
                onClick={() => handlePayNow(voucher.id)}
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeVoucher;

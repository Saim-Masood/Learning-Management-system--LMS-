import React, { useState } from 'react';
import { db } from '../config/firebase'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore';

const FeeSubmission = () => {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [paymentCategory, setPaymentCategory] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Example payment categories
  const paymentCategories = [
    'Bank Transfer',
    'Credit Card',
    'Debit Card',
    'Cash',
    'Mobile Payment',
    'Online Payment Gateway',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Add fee submission details to the database
      await addDoc(collection(db, 'fee_submissions'), {
        studentName,
        className,
        paymentCategory,
        amountPaid,
        transactionId,
        timestamp: new Date(), // Optionally add a timestamp
      });

      // Clear the form fields
      setStudentName('');
      setClassName('');
      setPaymentCategory('');
      setAmountPaid('');
      setTransactionId('');

      alert('Fee submission successful!');
    } catch (error) {
      console.error('Error submitting fee:', error);
      alert('Failed to submit fee.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Fee Submission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="student-name" className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              type="text"
              id="student-name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              id="class-name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="payment-category" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="payment-category"
              value={paymentCategory}
              onChange={(e) => setPaymentCategory(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select a payment method</option>
              {paymentCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount-paid" className="block text-sm font-medium text-gray-700">Amount Paid</label>
            <input
              type="number"
              id="amount-paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="transaction-id" className="block text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-lg ${submitting ? 'bg-gray-400' : 'bg-indigo-600'} text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {submitting ? 'Submitting...' : 'Submit Fee'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeeSubmission;

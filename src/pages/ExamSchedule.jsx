import React from 'react';

const Examination = () => {
  const examSchedule = [
    { className: 'Class 1', examDate: '2024-09-15', subject: 'Mathematics' },
    { className: 'Class 2', examDate: '2024-09-16', subject: 'English' },
    { className: 'Class 3', examDate: '2024-09-17', subject: 'Science' },
    { className: 'Class 4', examDate: '2024-09-18', subject: 'Social Studies' },
    { className: 'Class 5', examDate: '2024-09-19', subject: 'Mathematics' },
    { className: 'Class 6', examDate: '2024-09-20', subject: 'English' },
    { className: 'Class 7', examDate: '2024-09-21', subject: 'Science' },
    { className: 'Class 8', examDate: '2024-09-22', subject: 'Social Studies' },
    { className: 'Class 9', examDate: '2024-09-23', subject: 'Mathematics' },
    { className: 'Class 10', examDate: '2024-09-24', subject: 'English' },
    { className: 'Class 11', examDate: '2024-09-25', subject: 'Physics' },
    { className: 'Class 12', examDate: '2024-09-26', subject: 'Chemistry' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Exam Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examSchedule.map((exam, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.examDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Examination;

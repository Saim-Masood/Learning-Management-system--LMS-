import React from 'react';

const ExamResult = () => {
  const examResults = [
    { className: 'Class 1', studentName: 'Alice', subject: 'Mathematics', marks: 95 },
    { className: 'Class 2', studentName: 'Bob', subject: 'English', marks: 88 },
    { className: 'Class 3', studentName: 'Charlie', subject: 'Science', marks: 92 },
    { className: 'Class 4', studentName: 'David', subject: 'Social Studies', marks: 85 },
    { className: 'Class 5', studentName: 'Eve', subject: 'Mathematics', marks: 97 },
    { className: 'Class 6', studentName: 'Frank', subject: 'English', marks: 89 },
    { className: 'Class 7', studentName: 'Grace', subject: 'Science', marks: 93 },
    { className: 'Class 8', studentName: 'Hank', subject: 'Social Studies', marks: 87 },
    { className: 'Class 9', studentName: 'Ivy', subject: 'Mathematics', marks: 94 },
    { className: 'Class 10', studentName: 'Jack', subject: 'English', marks: 90 },
    { className: 'Class 11', studentName: 'Kate', subject: 'Physics', marks: 91 },
    { className: 'Class 12', studentName: 'Leo', subject: 'Chemistry', marks: 96 },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Results</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examResults.map((result, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">{result.className}</h3>
              <p className="text-gray-600 mt-2">Student: <span className="font-medium text-gray-800">{result.studentName}</span></p>
              <p className="text-gray-600 mt-1">Subject: <span className="font-medium text-gray-800">{result.subject}</span></p>
              <p className="text-gray-600 mt-1">Marks: <span className="font-medium text-gray-800">{result.marks}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamResult;

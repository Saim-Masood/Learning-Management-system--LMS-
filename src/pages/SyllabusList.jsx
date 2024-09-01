import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const SyllabusList = () => {
  const [syllabi, setSyllabi] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'syllabi'), (snapshot) => {
      const syllabusData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSyllabi(syllabusData);
    });

    return () => unsubscribe();
  }, []);

  const handleDownload = (pdfURL) => {
    const link = document.createElement('a');
    link.href = pdfURL;
    link.download = 'syllabus.pdf';
    link.click();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Syllabus List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {syllabi.map((syllabus) => (
              <tr key={syllabus.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{syllabus.subjectName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{syllabus.className}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDownload(syllabus.pdfURL)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SyllabusList;

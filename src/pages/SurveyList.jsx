// SurveyListPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const SurveyListPage = () => {
  const [surveyList, setSurveyList] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyCollection = collection(db, 'surveys');
      const surveySnapshot = await getDocs(surveyCollection);
      const surveyData = surveySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSurveyList(surveyData);
    };

    fetchSurveys();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Survey List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {surveyList.map((survey) => (
              <tr key={survey.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{survey.surveyTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{survey.questions.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(survey.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyListPage;

// SurveyPage.jsx
import React, { useState } from 'react';
import { db } from '../config/firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const SurveyPage = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleResponseChange = (question, value) => {
    setResponses({ ...responses, [question]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'surveys'), {
        surveyTitle,
        questions,
        responses,
        date: new Date().toISOString(),
      });
      setSurveyTitle('');
      setQuestions(['']);
      setResponses({});
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Survey</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="survey-title" className="block text-sm font-medium text-gray-700">Survey Title</label>
            <input
              type="text"
              id="survey-title"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">Question {index + 1}</label>
              <input
                type="text"
                id={`question-${index}`}
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Responses</label>
                <input
                  type="text"
                  placeholder="Enter response"
                  value={responses[question] || ''}
                  onChange={(e) => handleResponseChange(question, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Question
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-lg ${submitting ? 'bg-gray-400' : 'bg-indigo-600'} text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {submitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;

// FeedbackPage.jsx
import React, { useState } from 'react';
import { db } from '../config/firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const FeedbackPage = () => {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        studentName,
        course,
        feedbackText,
        date: new Date().toISOString(),
      });
      setStudentName('');
      setCourse('');
      setFeedbackText('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Feedback</h2>
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
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="feedback-text" className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              id="feedback-text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-lg ${submitting ? 'bg-gray-400' : 'bg-indigo-600'} text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;

// SubjectAdd.jsx
import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const SubjectAdd = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectClass, setSubjectClass] = useState('');
  const [subjectGroup, setSubjectGroup] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save data to Firestore
    try {
      await addDoc(collection(db, 'subjects'), {
        subjectName,
        subjectClass,
        subjectGroup,
      });
      // Clear form
      setSubjectName('');
      setSubjectClass('');
      setSubjectGroup('');
      alert('Subject added successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to add subject.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700">Subject Name</label>
            <input
              type="text"
              id="subject-name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="subject-class" className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              id="subject-class"
              value={subjectClass}
              onChange={(e) => setSubjectClass(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="subject-group" className="block text-sm font-medium text-gray-700">Subject Group</label>
            <input
              type="text"
              id="subject-group"
              value={subjectGroup}
              onChange={(e) => setSubjectGroup(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectAdd;

// src/pages/StudentList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot,doc } from 'firebase/firestore';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentCollection = collection(db, 'students');

    const unsubscribe = onSnapshot(studentCollection, (snapshot) => {
      const studentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Student List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.className}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

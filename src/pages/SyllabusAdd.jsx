import React, { useState } from 'react';
import { db, storage } from '../config/firebase'; // Make sure to configure Firebase storage
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Correct import
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames

const SyllabusAdd = () => {
  const [subjectName, setSubjectName] = useState('');
  const [className, setClassName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  
  const handleFileChange = (e) => {
    
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (pdfFile) {
        const fileRef = ref(storage, `syllabi/${uuidv4()}_${pdfFile.name}`);
        await uploadBytes(fileRef, pdfFile);
        const fileURL = await getDownloadURL(fileRef); // Correct method to get download URL

        await addDoc(collection(db, 'syllabi'), {
          subjectName,
          className,
          pdfURL: fileURL,
        });

        setSubjectName('');
        setClassName('');
        setPdfFile(null);
        alert('Syllabus added successfully!');
      } else {
        alert('Please upload a PDF file.');
      }
    } catch (error) {
      console.error('Error adding syllabus:', error);
      alert('Failed to add syllabus.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Syllabus</h2>
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
            <label htmlFor="pdf-upload" className="block text-sm font-medium text-gray-700">Upload PDF</label>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 px-4 rounded-lg ${uploading ? 'bg-gray-400' : 'bg-indigo-600'} text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {uploading ? 'Uploading...' : 'Add Syllabus'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SyllabusAdd;

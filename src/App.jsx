// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StudentRegistrationForm from './pages/StudentRegistration';
import StudentList from './pages/StudentList';
import TeacherRegistrationForm from './pages/TeacherRegistration';
import TeacherList from './pages/TeacherList';
import SubjectAdd from './pages/SubjectAdd';
import SubjectList from './pages/SubjectList';
import SyllabusAdd from './pages/SyllabusAdd';
import SyllabusList from './pages/SyllabusList';
import FeeStructure from './pages/FeeStructure';
import FeeVoucher from './pages/FeeVoucher';
import FeeSubmission from './pages/FeeSubmission';
import Examination from './pages/ExamSchedule';
import ExamResult from './pages/ExamResult';
import FeedbackPage from './pages/FeedbackPage';
import SurveyPage from './pages/Survey';
import FeedbackListPage from './pages/FeedbackList';
import SurveyListPage from './pages/SurveyList';
import { auth } from './config/firebase'; // Import your firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="students/register" element={<ProtectedRoute element={<StudentRegistrationForm />} />} />
          <Route path="students/list" element={<ProtectedRoute element={<StudentList />} />} />
          <Route path="teachers/register" element={<ProtectedRoute element={<TeacherRegistrationForm />} />} />
          <Route path="teachers/list" element={<ProtectedRoute element={<TeacherList />} />} />
          <Route path="subjects/add" element={<ProtectedRoute element={<SubjectAdd />} />} />
          <Route path="subjects/list" element={<ProtectedRoute element={<SubjectList />} />} />
          <Route path="syllabus/add" element={<ProtectedRoute element={<SyllabusAdd />} />} />
          <Route path="syllabus/list" element={<ProtectedRoute element={<SyllabusList />} />} />
          <Route path="fees/structure" element={<ProtectedRoute element={<FeeStructure />} />} />
          <Route path="fees/voucher" element={<ProtectedRoute element={<FeeVoucher />} />} />
          <Route path="fees/submission/:id" element={<ProtectedRoute element={<FeeSubmission />} />} />
          <Route path="examinations/schedule" element={<ProtectedRoute element={<Examination />} />} />
          <Route path="examinations/result" element={<ProtectedRoute element={<ExamResult />} />} />
          <Route path="feedback&surveys/feedback" element={<ProtectedRoute element={<FeedbackPage />} />} />
          <Route path="feedback&surveys/survey" element={<ProtectedRoute element={<SurveyPage />} />} />
          <Route path="feedback&surveys/feedback-list" element={<ProtectedRoute element={<FeedbackListPage />} />} />
          <Route path="feedback&surveys/survey-list" element={<ProtectedRoute element={<SurveyListPage />} />} />
        </Route>

        {/* Redirect from root to login if user is not authenticated */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;

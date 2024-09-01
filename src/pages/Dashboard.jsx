// src/pages/Dashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, Typography } from '@mui/material';



const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
         
        <main className="flex-1 p-4">
        
         
          <Outlet /> {/* This will render nested routes */}
        
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

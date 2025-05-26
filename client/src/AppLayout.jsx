import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function AppLayout() {
  return (
    <div className=''>
      <Navbar />
      <Outlet />
    </div>
  );
}

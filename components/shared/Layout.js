import React from 'react';
import AddNewBoard from '../modals/AddNewBoard';
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

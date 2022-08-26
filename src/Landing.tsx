import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkInReturningStudent } from './services/students';

export const Landing = () => {

  const increment = async () => {
    await checkInReturningStudent()
  }

  return (
    <div>
      <button onClick={increment}>
        Returning Student
      </button>
      <Link to="/search">
        New Student
      </Link>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {

  const increment = () => {
    
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


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkInReturningStudent } from './services/students';
import { Student } from './components/Student';

import Modal from "react-modal";

export const Landing = () => {
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);

  const openModal = () => {
    setCheckInModalOpen(true)
  }

  const increment = async () => {
    await checkInReturningStudent()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh", flex: 1 }}>
      <Link style={{ margin: "0 auto", padding: "1rem 2rem", backgroundColor: "rgb(0, 82, 136)", color: "white", marginBottom: 100 }} to="/search">
        New Student
      </Link>
      <button style={{ margin: "0 auto", padding: "0.5rem 1rem", color: "rgb(0, 82, 136)" }} onClick={openModal}>
        Returning Student
      </button>

      <Modal isOpen={checkInModalOpen}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-3xl">Are you sure?</h2>
          </div>

          <div className="flex items-end flex-col w-full">
            <button className="w-full h-24 my-5 rounded-xl bg-green-300 cursor-pointer border border-black" type="button" onClick={() => { increment(); setCheckInModalOpen(false) }}>Yes</button>
            <button className="w-full h-24 my-5 rounded-xl bg-red-300 cursor-pointer border border-black" type="button" onClick={() => setCheckInModalOpen(false)}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

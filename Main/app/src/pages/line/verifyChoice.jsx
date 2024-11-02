import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Verification Method</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/verifyPhone')}
          className="w-64 py-3 text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 transition-colors"
        >
          Verify by Phone
        </button>
        <button
          onClick={() => navigate('/verify-by-email')}
          className="w-64 py-3 text-white bg-green-500 rounded-md shadow-lg hover:bg-green-600 transition-colors"
        >
          Verify by Email
        </button>
      </div>
    </div>
  );
};

export default VerificationChoice;

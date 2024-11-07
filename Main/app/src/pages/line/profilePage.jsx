import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmailFromLocalStorage ,saveEmailToLocalStorage } from '../../utils/localStorageUtils';
const ProfilePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(); // สร้าง ref สำหรับเมนู
  const email = getEmailFromLocalStorage(); // ดึง email จาก Local Storage

  const handleViewRewards = () => {
    saveEmailToLocalStorage(email); // บันทึก email ลง Local Storage
    navigate('/rewardsPage'); // นำทางไปหน้า rewardsPage โดยไม่ใช้ state
  };
  
  const handleEditProfile = () => {
    saveEmailToLocalStorage(email); // บันทึก email ลง Local Storage
    navigate('/edit-profile'); // นำทางไปหน้า edit-profile โดยไม่ใช้ state
    setMenuOpen(false);
  };

  const handleConsent = () => {
    saveEmailToLocalStorage(email); // บันทึก email ลง Local Storage
    navigate('/edit-consent'); // นำทางไปหน้า edit-consent โดยไม่ใช้ state
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // ใช้ useEffect เพื่อเพิ่ม event listener สำหรับการคลิกนอกเมนู
  useEffect(() => {
    const handleClickOutside = (event) => {
      // ถ้าเมนูเปิดและผู้ใช้คลิกนอกเมนู ให้ปิดเมนู
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // เพิ่ม event listener สำหรับการคลิก
    document.addEventListener('mousedown', handleClickOutside);

    // ลบ event listener เมื่อ component ถูก unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* White Box Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        
        {/* Premium Background Container */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6 relative">
          {/* Hamburger Menu */}
          <div className="flex justify-between items-center mb-4 relative">
            <h1 className="text-xl font-bold text-white">profile</h1>
            <button onClick={toggleMenu} className="focus:outline-none">
              {/* Hamburger Icon */}
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="bg-white shadow-md rounded-md absolute right-0 mt-2 w-40 z-20"
              >
                <ul>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={handleEditProfile}
                  >
                    Edit profile</li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={handleConsent}
                  >
                    Consent</li>
                </ul>
              </div>
            )}
          </div>

          {/* Card Section */}
          <div className="bg-gray-400 p-8 rounded-lg text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">PLATINUM</h2>
                <p className="text-sm">Points Earned</p>
                <p className="text-2xl font-semibold">500/1000</p>
                <p className="text-sm mt-2">You're VIP Member</p>
              </div>
              
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: '50%' }} // กำหนดความยาวของ progress ตามคะแนน
              ></div>
            </div>
          </div>
        </div>

        {/* Expire Date Section */}
        <div className="flex justify-between mb-6">
          <p className="font-semibold">Expire Date</p>
          <p>31 Dec 2024</p>
        </div>

        {/* Terms and Conditions Section */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Terms and Conditions</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* View Rewards Button */}
        <button 
          onClick={handleViewRewards}
          className="bg-green-600 text-white py-3 px-3 w-full rounded-md hover:bg-green-700 transition"
        >
          View rewards
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

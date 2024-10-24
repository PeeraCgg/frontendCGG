import React from 'react';
import { useNavigate } from 'react-router-dom';

function FoodRewards() {
    const navigate = useNavigate();

    // ฟังก์ชันเพื่อจัดการการ Redeem
    const handleRedeem = () => {
        // สามารถเพิ่ม logic สำหรับการ Redeem ได้ที่นี่ เช่น การเรียก API
        navigate('/profilePage'); // นำทางไปที่หน้า /profilePage หลังจาก Redeem เสร็จสิ้น
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="bg-white border-2 border-green-400 p-6 rounded-lg w-full max-w-xl">
            {/* Image Section */}
            <div className="flex justify-center mb-6">
              <img
                src='https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg'
                alt="Voucher Ticket"
                className="h-40"
              />
            </div>
    
            {/* Title Section */}
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              Food Voucher Value THB 1,000.-
            </h2>
    
            {/* Points and Validity Section */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">Points</p>
                <p className="text-blue-600">800 PT</p>
              </div>
              <div>
                <p className="font-semibold">Validity</p>
                <p className="text-gray-500">01 Sep 2022 to 31 Sep 2022</p>
              </div>
            </div>
    
            {/* Description Section */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
            </div>
    
            {/* Terms & Conditions Section */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Term & Condition</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              </ul>
            </div>
    
            {/* Redeem Button */}
            <div className="flex justify-center">
              <button 
                onClick={handleRedeem} // เรียกฟังก์ชัน handleRedeem เมื่อคลิก
                className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      );
    };

export default FoodRewards;

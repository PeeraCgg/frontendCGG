import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RewardsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const rewards = [
    {
      id: 1,
      image: 'https://media.istockphoto.com/id/1348081839/th/รูปถ่าย/สนามกอล์ฟวางสีเขียวพร้อมธงยามอาทิตย์อัสดง.jpg?s=612x612&w=0&k=20&c=jEZBY83wZrr25ZZYrD0ZbWGhVLM_dEPmiyGpZNtKHR8=',
      title: 'Green Fee Voucher 1 Round',
      points: 1000,
      link: '/green-fee', 
    },
    {
      id: 2,
      image: 'https://www.neighbor.com/storage-blog/wp-content/uploads/2024/02/Buying-a-used-golf-cart.jpg',
      title: 'Golf Cart Voucher 1 Time',
      points: 500,
      link: '/golf-cart', 
    },
    {
      id: 3,
      image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
      title: 'Food Voucher Value THB 1,000',
      points: 800,
      link: '/foodRewards', 
    },
  ];

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoToProfile = () => {
    navigate('/profilePage'); // นำทางไปยังหน้า ProfilePage
  };

  const filteredRewards = rewards.filter((reward) =>
    reward.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-green-50 border-2 border-green-400 p-6 rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Rewards</h1>
        
        {/* Search Box */}
        <div className="w-full max-w-md mb-6 mx-auto">
          <input
            type="text"
            placeholder="Search Promotion"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Points Earned */}
        <div className="w-full max-w-md mb-4 mx-auto">
          <p className="text-lg font-bold text-center">Points earned 1000 points</p>
        </div>

        {/* Rewards List */}
        <div className="w-full max-w-md space-y-4 mb-6 mx-auto">
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center bg-white shadow-md rounded-md p-4"
              >
                {/* Image */}
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-16 h-16 rounded-md mr-4"
                />

                {/* Reward Details */}
                <div className="flex-1">
                  <h2 className="text-md font-bold">{reward.title}</h2>
                  <p className="text-green-600">{reward.points} PT</p>
                </div>

                {/* Action Icon */}
                <button className="text-green-600" onClick={() => handleNavigate(reward.link)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No promotions found</p>
          )}
        </div>

        {/* Buttons at the Bottom */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Refresh
          </button>

          {/* Empty Button to go to Profile Page */}
          <button
            onClick={handleGoToProfile}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Profile Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;

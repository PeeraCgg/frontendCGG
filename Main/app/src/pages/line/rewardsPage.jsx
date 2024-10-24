import React from 'react';
import { useNavigate } from 'react-router-dom';

const RewardsPage = () => {
  const navigate = useNavigate();

  const rewards = [
    {
      id: 1,
      image: 'https://media.istockphoto.com/id/1348081839/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%81%E0%B8%AD%E0%B8%A5%E0%B9%8C%E0%B8%9F%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%98%E0%B8%87%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B8%B2%E0%B8%97%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C%E0%B8%AD%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%87.jpg?s=612x612&w=0&k=20&c=jEZBY83wZrr25ZZYrD0ZbWGhVLM_dEPmiyGpZNtKHR8=',
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

  // ฟังก์ชัน Refresh สำหรับรีเฟรชหน้า
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {/* Container with Light Green Border */}
      <div className="bg-green-50 border-2 border-green-400 p-6 rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Rewards</h1>
        
        {/* Search Box */}
        <div className="w-full max-w-md mb-6 mx-auto">
          <input
            type="text"
            placeholder="Coupon"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Points Earned */}
        <div className="w-full max-w-md mb-4 mx-auto">
          <p className="text-lg font-bold text-center">Points earned 1000 points</p>
        </div>

        {/* Rewards List */}
        <div className="w-full max-w-md space-y-4 mb-6 mx-auto">
          {rewards.map((reward) => (
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
          ))}
        </div>

        {/* Buttons at the Bottom */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Refresh
          </button>

          {/* Empty Button */}
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Empty Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
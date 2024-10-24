import React from 'react';
import ReactDOM from 'react-dom/client';
import {
createBrowserRouter,
RouterProvider
} from 'react-router-dom';
import WelcomePage from './pages/line/welcomePage'

import './index.css';  // Import ไฟล์ CSS ที่คุณสร้าง
import PhoneNumberForm from './pages/line/verifyPhone';
import  ProfileForm from './pages/line/checkProfile';
import RegistrationSuccess from './pages/line/viewProfile';
import ConsentForm from './pages/line/checkPdpa';
import ProfilePage from './pages/line/profilePage';
import RewardsPage from './pages/line/rewardsPage';
import FoodRewards from './pages/line/foodRewards';
import VerifyOTPPage from './pages/line/checkOtp';




const router = createBrowserRouter([
// [] ใช้กรณี ใช้ array มีหลายหน้า
  {
    path:'/',
    element:<WelcomePage />

  },
  {
    path:'/verifyPhone',
    element:<PhoneNumberForm />
  },
  {
    path:'/checkOtp',
    element:<VerifyOTPPage/>
  },
  {
    path:'/checkProfile',
    element:<ProfileForm />
  },
  {
    path:'/checkPdpa',
    element:<ConsentForm  />
  },
  {
    path:'/viewProfile',
    element:<RegistrationSuccess />
  },
  {
    path:'/profilePage',
    element:<ProfilePage  />
  },{
    path:'/rewardsPage',
    element:<RewardsPage />
  },
  {
    path:'/foodRewards',
    element:<FoodRewards />
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


import React, { useEffect,useState } from 'react';
import { getHealth } from '@/services/api';

const NextStagePage = () => {

  const [serverStatus, setServerStatus] = useState('Checking.......');

   const checkServerStatus = async () => {
    try {
      const response = await getHealth();
      setServerStatus('Connected ✅');
      console.log('Server status:', response.data);
    } catch (error) {
      setServerStatus('Disconnected ❌');
    }
  }; 
  
  useEffect(() => {
    checkServerStatus();
    // Hide navigation bar
    const navbar = document.querySelector('nav, header, .navbar, .navigation');
    if (navbar) navbar.style.display = 'none';
    
    // Hide footer
    const footer = document.querySelector('footer, .footer');
    if (footer) footer.style.display = 'none';
    
    // Optional: Add a class to body for additional styling
    document.body.classList.add('hide-nav-footer');
    
    // Cleanup when component unmounts
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      document.body.classList.remove('hide-nav-footer');
    };
  }, []);

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans text-center p-5">
      <div>
        <p className="text-2xl text-gray-800 font-medium mb-4">
          Congraturations🎉🎉 on making your stage 1 payment.Stage 2 is under development!!
        </p>
        <p>{serverStatus}</p>
        
      </div>
    </div>
  );
};

export default NextStagePage;
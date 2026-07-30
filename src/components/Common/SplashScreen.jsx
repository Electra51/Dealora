import { useEffect } from "react";
import logo from "/assets/images/Logo.webp"; 

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds total (2s delay + 0.5s fade out)
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-container fixed inset-0 z-9999 bg-[#1a1a24] flex flex-col items-center justify-center">
      
      {/* Logo Animation */}
      <div className="splash-logo">
       
        <img 
          src={logo} 
          alt="Dealora" 
          className="w-48 md:w-64 h-auto" 
          loading="eager" 
          decoding="async"
        />
      </div>
      
      {/* Loading Bar Animation */}
      <div className="splash-bar h-1 bg-linear-to-r from-orange-500 to-pink-500 mt-8 rounded-full" />
      
      {/* Text Animation */}
      <p className="splash-text text-gray-400 text-sm mt-4 font-medium tracking-widest">
        DEALORA
      </p>
      
    </div>
  );
};

export default SplashScreen;
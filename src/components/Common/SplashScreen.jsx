import { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/Logo.png"; 

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed inset-0 z-9999 bg-[#1a1a24] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <img src={logo} alt="Dealora" className="w-48 md:w-64 h-auto" />
      </motion.div>
      
      {/* Loading Bar Animation */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "200px", opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="h-1 bg-linear-to-r from-orange-500 to-pink-500 mt-8 rounded-full"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm mt-4 font-medium tracking-widest"
      >
        DEALORA
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
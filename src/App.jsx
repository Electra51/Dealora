import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./Routes/Routes";
import { useEffect, useState } from "react";
import SplashScreen from "./components/Common/SplashScreen";

// function App() {
//   const [showSplash, setShowSplash] = useState(true);

//     useEffect(() => {
//     const hasVisited = sessionStorage.getItem("dealora_visited");
//     if (hasVisited) {
//       setShowSplash(false);
//     }
//   }, []);

//   const handleSplashComplete = () => {
//     setShowSplash(false);
//     sessionStorage.setItem("dealora_visited", "true");
//   };
//   return (
//    <>
//       {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
//       <div className={showSplash ? "hidden" : ""}>
//         <RouterProvider router={router} />
//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: '#1a1a24',
//               color: '#fff',
//               border: '1px solid rgba(255,255,255,0.1)'
//             }
//           }}
//         />
//       </div>
//     </>
//   );
// }

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("dealora_visited");
    if (hasVisited) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("dealora_visited", "true");
  };

  // স্প্ল্যাশ স্ক্রিন সক্রিয় থাকলে সরাসরি শুধুই স্প্ল্যাশ রিটার্ন করুন
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
    </>
  );
}

export default App;
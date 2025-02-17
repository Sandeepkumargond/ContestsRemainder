import { useState, useEffect } from "react";
import noInternetImg from "../assets/no-internet.webp";

const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return props.children;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <img
        src={noInternetImg}
        loading="lazy"
        draggable={false}
        alt="no internet"
        className="w-32 h-32 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">No Internet Connection</h3>
      <p className="text-gray-600 mt-2">Please try again later.</p>
    </div>
  );
};

export default NoInternetConnection;

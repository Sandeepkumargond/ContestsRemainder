import { useState, useEffect } from "react";


function InformationBanner({ message }) {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const notificationMessage =
    localStorage.getItem("notification-message") || message;
  const isBannerClosed = localStorage.getItem("bannerClosed") === "true";

  useEffect(() => {
    if (!isBannerClosed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isBannerClosed]);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem("bannerClosed", "true");
      setShowBanner(false);
    }, 500);
  };
  return (
    <>
      {showBanner && notificationMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-lg shadow-md transition-all duration-500 ${
            isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="font-bold">Update:</span> {notificationMessage}
            </p>
            <button
              title="Close"
              className="text-blue-800 font-bold hover:text-blue-600 focus:outline-none"
              onClick={closeBanner}
            >
              &times;
            </button>
          </div>
         
        </div>
      )}
    </>
  );
}

export default InformationBanner;

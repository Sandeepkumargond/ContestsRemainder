import plateforms from "../shared/plateformsList";
import PlateformCard from "../components/PlateformCard";
import plateformImage from "../shared/GetPlateformImage";
import Footer from "../components/Footer";
import appInit from "../initialzeApp";
import { useEffect, useState } from "react";

const Settings = () => {
  const [selectedSites, setSelectedSites] = useState(() => {
    const storedSites = localStorage.getItem("selected_sites");
    return storedSites ? JSON.parse(storedSites) : {};
  });

  const [showBanner, setShowBanner] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedSites = localStorage.getItem("selected_sites");
      if (storedSites) {
        setSelectedSites(JSON.parse(storedSites));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateLocalStorage = (sites) => {
    localStorage.setItem("selected_sites", JSON.stringify(sites));
    setSelectedSites(sites);
  };

  const toggleCheckBox = (name) => {
    setSelectedSites((prevSites) => {
      const updatedSites = { ...prevSites, [name]: !prevSites[name] };
      localStorage.setItem("selected_sites", JSON.stringify(updatedSites));
      return updatedSites;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetApp = () => {
    localStorage.removeItem("selected_sites"); // Only reset selected_sites, not everything
    appInit();

    const allSelectedSites = plateforms.reduce((acc, { name }) => {
      acc[name] = true;
      return acc;
    }, {});

    updateLocalStorage(allSelectedSites);
    setShowBanner(true);
    scrollToTop();
  };

  const deselectAll = () => {
    const allDeselectedSites = plateforms.reduce((acc, { name }) => {
      acc[name] = false;
      return acc;
    }, {});

    updateLocalStorage(allDeselectedSites);
  };

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setShowBanner(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  return (
    <>
      {/* Fixed Positioning for the Buttons */}
      <div className="top-24 mt-24 left-0 right-0 z-20 bg-gray-100 shadow-md p-2 flex justify-center gap-8">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={resetApp}
        >
          Reset Application
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={deselectAll}
        >
          Deselect All
        </button>
      </div>
      
      {/* Main Content */}
      <div className="mt-2 px-4 pb-6"> 
        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plateforms.map((plateform) => (
            <PlateformCard
              key={plateform.name}
              url={plateform.url}
              imgUrl={plateformImage(plateform.name)}
              name={plateform.name}
              isChecked={selectedSites[plateform.name] || false}
              toggleCheckBox={toggleCheckBox}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Settings;

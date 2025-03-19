import { useEffect, useState } from "react";
import ContestDetails from "../components/ContestDetails";
import {
  filterBySelectedSites,
  filterContestsWithin24Hours,
  filterUpcomingContests,
} from "../shared/contestFilters";
import InformationBanner from "../components/InformationBanner";
import { contestDuration, has24HoursPassed } from "../shared/dateTimeUtility";
import Footer from "../components/Footer";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState([]);
  const [activeButton, setActiveButton] = useState(1);

  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  let contestChache = JSON.parse(localStorage.getItem("contestChache"));

  const notificationMessage = localStorage.getItem("notification-message");

  let lastApiCall =
    JSON.parse(localStorage.getItem("time")) ?? new Date().toISOString();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
    setLoaded(false);
  
    const currentDate = new Date();
  
    const getValidContests = (contests) => {
      contests.sort(
        (a, b) => parseFloat(a.start_time) - parseFloat(b.start_time)
      );
  
      return contests.filter((item) => {
        if (item) {
          const endTime = new Date(item.end_time);
          return endTime > currentDate;
        }
        return false;
      });
    };
  
    if (has24HoursPassed(lastApiCall) || !contestChache) {
      fetch("https://c-r-backend.onrender.com/api/v1/contests/all")
        .then((res) => res.json())
        .then((result) => {
          console.log("API Response:", result); // Log the API response
          setLoaded(true);
          const validContests = getValidContests(result);
          setItems(validContests);
  
          const filtered = filterBySelectedSites(validContests, selectedSites);
          
          localStorage.setItem("contestChache", JSON.stringify(validContests));
          localStorage.setItem("time", JSON.stringify(lastApiCall));
  
          filterContests(filterBySelectedSites, "Contests on Selected Platforms", 1);
          setFilter(filtered);
        })
        .catch((error) => {
          console.error("error in fetching data ", error);
          setLoaded(true);
          setError(error);
        });
  
      fetch("https://c-r-backend.onrender.com/api/v2/notification")
        .then((res) => res.json())
        .then((result) => {
          if (!notificationMessage || notificationMessage !== result.message) {
            localStorage.setItem("notification-message", result.message);
            localStorage.setItem("bannerClosed", false);
          }
        })
        .catch((error) => {
          console.error("error in fetching notification ", error);
          setLoaded(true);
          setError(error);
        });
    } else {
      const validContests = getValidContests(contestChache);
      setItems(validContests);
  
      const filtered = filterBySelectedSites(validContests, selectedSites);
      setFilter(filtered);
      setLoaded(true);
    }
  }, []);

  const filterContests = (filterFn, headingText, buttonId) => {
    scrollToTop();
    setActiveButton(buttonId);
    const filteredList = filterFn(items, selectedSites);  
   
    setFilter(filteredList);

  };

  return (
    <>
      <div className="flex justify-center space-x-4 mt-16">
        <button
          className={`py-2 px-4 rounded-md ${
            activeButton === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            filterContests(filterBySelectedSites, "Contests on Selected Platforms", 1)
          }
        >
          All Contests
        </button>


        {/* <button
          className={`py-2 px-4 rounded-md ${
            activeButton === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => filterContests(filterLiveContests, "Ongoing Contests", 2)}
        >
          <span className="text-red-500">Live</span> Contest
        </button> */}


        <button
          className={`py-2 px-4 rounded-md ${
            activeButton === 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            filterContests(filterContestsWithin24Hours, "Contests within 24 hours", 3)
          }
        >
          In 24 Hours
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            activeButton === 4 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            filterContests(filterUpcomingContests, "Contests in Future", 4)
          }
        >
          Upcomings
        </button>
      </div>

      <div className="container mx-auto px-4">
        <InformationBanner />
        <div className="mt-4">
          <ContestDetails error={error} isLoaded={isLoaded} items={filter} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

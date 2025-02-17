import { useState, useEffect } from "react";
import getImage from "../shared/GetPlateformImage";
import remindOff from "../assets/remindme-off.webp";
import remindOn from "../assets/remindme-on.webp";
import { SlCalender } from "react-icons/sl";
import day from "../assets/day.svg"
import duration from "../assets/duration.png"
import { FormatedDateForNotification } from "../shared/dateTimeUtility.js";
import TimeLeftToStartContest from "./TimeLeftToStartContest.jsx";

const ContestDetailsContainer = (props) => {
  const {
    cName,
    cSite,
    cUrl,
    cDuration,
    sTime,
    eTime,
    sDate,
    eDate,
    timer,
    calStartTime,
    calEndTime,
    showNotification,
  } = props;

  const [calUrl, setCalUrl] = useState(null);
  const [remindImg, setRemindImg] = useState(remindOff);

  // checking did user already selected for notification or not
  const dateTime = FormatedDateForNotification(calStartTime);

  useEffect(() => {
    const notification = JSON.parse(localStorage.getItem("notification")) || [];
    const hasValue = notification.includes(dateTime);

    // turning on notification bell on if already selected
    if (hasValue) {
      setRemindImg(remindOn);
    } else {
      setRemindImg(remindOff);
    }
  }, []);

  // setting notification for reminder
  const remindBeforeFiveMinutes = (addNotification) => {
    let notification = JSON.parse(localStorage.getItem("notification")) || [];

    // Get today's date
    const today = new Date().toISOString().slice(0, 19);

    // Remove dates from existingNotification that are no longer valid
    notification = notification.filter(
      (element) => new Date(element) >= new Date(today)
    );

    if (addNotification && notification.includes(dateTime)) return;
    if (!addNotification) {
      notification = notification.filter((element) => element !== dateTime);
    } else {
      if (!notification.includes(dateTime)) {
        notification.push(dateTime);
      }
    }

    localStorage.setItem("notification", JSON.stringify(notification));
    chrome.alarms.create("myAlarm", { when: Date.parse(dateTime) });

    // Clear the particular time from localStorage after the notification is triggered
    setTimeout(() => {
      notification = notification.filter((element) => element !== dateTime);
      localStorage.setItem("notification", JSON.stringify(notification));
    }, Date.parse(dateTime) - Date.now());
  };

  const updateRemind = () => {
    if (remindImg === remindOff) {
      setRemindImg(remindOn);
      remindBeforeFiveMinutes(true); // add notification
      return;
    }
    setRemindImg(remindOff);
    remindBeforeFiveMinutes(false); // remove notification
  };

  // link for google calender with event date
  const addToGoogleCalender = () => {
    let result =
      "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
      cName +
      "&dates=" +
      calStartTime +
      "/" +
      calEndTime +
      "&location=" +
      cUrl +
      "&pli=1&uid=&sf=true&output=xml#eventpage_6";
    setCalUrl(result.replace(/#/g, "%23"));
  };
  
  const formattedDate = new Date(timer);
  
  return (
    <div className="p-4 rounded-lg bg-gray-800 flex flex-col">
      <div className="flex items-center gap-3">
        <img
          src={getImage(cSite)}
          alt="contest-logo"
          className="w-10 h-10 object-contain"
          draggable={false}
          loading="lazy"
        />
        <a
          href={cUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-white hover:underline"
        >
          {cName}
        </a>
       
        
      </div>

      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <img src={day} alt="bell" className="w-6 h-6" />
          <div className="flex">
            <div>
              <span className="text-white font-medium">
                {`${sDate.day} ${sDate.date}`}
              </span>
             <span className="text-white ml-2 py-0.5 px-1 rounded-md bg-green-700">{sTime}</span>
            </div>
            <div>
            <span className="text-white ml-3 font-medium">
                {`${eDate.day} ${eDate.date}`}
              </span>
              <span className="ml-2 text-white py-0.5 px-1 rounded-md bg-red-700">{eTime}</span>
            </div>
          </div>
        </div>
        
          <div className="items-center flex-col">
          {showNotification && (
            <img
              src={remindImg}
              className="w-6 h-6 cursor-pointer"
              onClick={updateRemind}
              loading="lazy"
              draggable={false}
              title="Notify me 5 minutes before Contest Start"
              alt="notify-me"
            />
          )}
          <SlCalender className="w-6 text-white h-6 cursor-pointer"
            onClick={addToGoogleCalender}
            loading="lazy"
            draggable={false}
            title="Add to Google Calendar"
            alt="google-calendar" />
          
        </div>
        
      </div>

      <div className="flex items-center space-x-2 ">
        <img src={duration} alt="calendar" className="w-6 text-white h-6" />
        <span className="text-white font-medium">DURATION</span>
        <span className="text-white py-0.5 px-1 rounded-md bg-blue-700">{cDuration}</span>
      </div>

      <div className="bg-gray-800 rounded p-3 text-center">
        <TimeLeftToStartContest contestTime={formattedDate} />
      </div>
    </div>
  );
};

export default ContestDetailsContainer;
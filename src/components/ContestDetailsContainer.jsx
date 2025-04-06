import { useState, useEffect } from "react";
import getImage from "../shared/GetPlateformImage";
import remindOff from "../assets/remindme-off.webp";
import remindOn from "../assets/remindme-on.webp";
import {
  CalendarDays,
  Clock3,
  Link as LinkIcon,
  BellRing,
  CalendarPlus,
} from "lucide-react";
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

  const dateTime = FormatedDateForNotification(calStartTime);

  useEffect(() => {
    const notification = JSON.parse(localStorage.getItem("notification")) || [];
    const hasValue = notification.includes(dateTime);
    setRemindImg(hasValue ? remindOn : remindOff);
  }, []);

  const remindBeforeFiveMinutes = (addNotification) => {
    let notification = JSON.parse(localStorage.getItem("notification")) || [];
    const today = new Date().toISOString().slice(0, 19);
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

    setTimeout(() => {
      notification = notification.filter((element) => element !== dateTime);
      localStorage.setItem("notification", JSON.stringify(notification));
    }, Date.parse(dateTime) - Date.now());
  };

  const updateRemind = () => {
    if (remindImg === remindOff) {
      setRemindImg(remindOn);
      remindBeforeFiveMinutes(true);
    } else {
      setRemindImg(remindOff);
      remindBeforeFiveMinutes(false);
    }
  };

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
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-semibold text-white">{cName}</p>
          <a
            href={cUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Link
            <LinkIcon className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-6 h-6 text-white" />
          <div className="flex flex-col space-y-1">
            <div>
              <span className="text-white font-medium">
                {`${sDate.day} ${sDate.date}`}
              </span>
              <span className="text-white ml-2 py-0.5 px-1 rounded-md bg-green-700">
                {sTime}
              </span>
            </div>
            <div>
              <span className="text-white font-medium">
                {`${eDate.day} ${eDate.date}`}
              </span>
              <span className="ml-2 text-white py-0.5 px-1 rounded-md bg-red-700">
                {eTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
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
          <CalendarPlus
            className="w-6 h-6 text-white cursor-pointer"
            onClick={addToGoogleCalender}
            title="Add to Google Calendar"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <Clock3 className="w-6 h-6 text-white" />
        <span className="text-white font-medium">DURATION</span>
        <span className="text-white py-0.5 px-1 rounded-md bg-blue-700">
          {cDuration}
        </span>
      </div>

      <div className="bg-gray-800 rounded p-3 text-center mt-3">
        <TimeLeftToStartContest contestTime={formattedDate} />
      </div>
    </div>
  );
};

export default ContestDetailsContainer;

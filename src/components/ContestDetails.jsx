import Loading from "../shared/Loading";
import ContestDetailsContainer from "./ContestDetailsContainer";
import funnyNotFound from "../assets/not-found.png";

import {
  contestDuration,
  isValidForNotification,
  formatDateText,
  formatStartTime,
  formatEndTime,
  calendarDateTime,
} from "../shared/dateTimeUtility.js";

const ContestDetails = (props) => {
  const { error, isLoaded, items } = props;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl font-semibold text-red-600">{error.message}</h2>
        <p className="text-gray-600">Please check your internet connection</p>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <h1 className="flex justify-center items-center mt-20">
        <Loading />
      </h1>
    );
  } else {
    return (
      <ul className="mt-6 space-y-6">
        {items.length < 1 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src={funnyNotFound}
              className="w-64 h-64 object-contain"
              draggable={false}
              loading="lazy"
              alt="Not Found"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              No Contest Available!
            </h2>
          </div>
        ) : (
          items.map((item) => (
            <ContestDetailsContainer
              key={`${item.id}`}
              cName={item.name}
              cSite={item.site}
              cUrl={item.url}
              cDuration={contestDuration(item.duration)}
              sTime={formatStartTime(item.start_time)}
              eTime={formatEndTime(item.end_time)}
              sDate={formatDateText(item.start_time)}
              eDate={formatDateText(item.end_time)}
              timer={item.start_time}
              calStartTime={calendarDateTime(item.start_time)}
              calEndTime={calendarDateTime(item.end_time)}
              showNotification={isValidForNotification(item.start_time)}
            />
          ))
        )}
      </ul>
    );
  }
};

export default ContestDetails;

function PlateformCard({ name, url, imgUrl, isChecked, toggleCheckBox }) {
  return (
  <div className="flex p-2 bg-white rounded-lg shadow-md hover:shadow-lg">
  <div className="flex items-center">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-center"
    >
      <img
        src={imgUrl}
        alt="platform logo"
        className="w-12 h-12 object-cover mb-2"
        draggable="false"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </a>
  </div>

  <div className="flex items-center ml-auto">
    <label htmlFor={name} className="flex items-center cursor-pointer">
      
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          id={name}
          checked={isChecked}
          onChange={() => toggleCheckBox(name)}
        />
        <div className={`w-12  h-6 ${
            isChecked ? 'bg-blue-400' : 'bg-gray-300'
          }   rounded-full shadow-inner`}></div>
        
        <div
          className={`absolute top-0 left-0 w-6 h-6 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out ${
            isChecked ? 'translate-x-6' : 'translate-x-0'
          } `}
        ></div>
      </div>
      
      
    </label>
  </div>
  </div>

  );
};

export default PlateformCard;

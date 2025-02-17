const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-6 h-6 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
      <div className="w-6 h-6 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
      <div className="w-6 h-6 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
      <div className="w-6 h-6 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;

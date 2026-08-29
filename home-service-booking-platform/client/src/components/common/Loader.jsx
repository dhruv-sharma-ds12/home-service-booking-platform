function Loader({ text = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

      {text && (
        <p className="mt-4 text-sm text-gray-500 font-medium">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;
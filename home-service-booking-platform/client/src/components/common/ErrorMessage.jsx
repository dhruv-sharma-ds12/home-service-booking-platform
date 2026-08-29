function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 rounded-xl p-5"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0">
          ⚠️
        </span>

        <div className="flex-1">
          <h3 className="font-semibold text-red-800">
            Something went wrong
          </h3>

          <p className="text-sm text-red-700 mt-1">
            {message}
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
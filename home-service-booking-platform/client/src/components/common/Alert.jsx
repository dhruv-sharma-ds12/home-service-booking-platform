function Alert({
  type = "error",
  message,
  onClose,
}) {
  if (!message) {
    return null;
  }

  const styles = {
    error: {
      container: "bg-red-50 border-red-200 text-red-700",
      icon: "⚠️",
    },

    success: {
      container: "bg-green-50 border-green-200 text-green-700",
      icon: "✓",
    },

    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-700",
      icon: "⚠️",
    },

    info: {
      container: "bg-blue-50 border-blue-200 text-blue-700",
      icon: "ℹ️",
    },
  };

  const currentStyle = styles[type] || styles.error;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 border rounded-xl p-4 ${currentStyle.container}`}
    >
      <span className="shrink-0 text-lg">
        {currentStyle.icon}
      </span>

      <p className="flex-1 text-sm font-medium">
        {message}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alert"
          className="shrink-0 text-current opacity-60 hover:opacity-100 text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
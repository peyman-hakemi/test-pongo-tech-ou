import classNames from "classnames"; // Optional: use classNames library for easier conditional class handling

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string; // Additional className prop
}

function Button({
  title,
  loading = false,
  disabled = false,
  variant = "primary",
  onClick,
  className, // Destructure className prop
  ...props
}: IProps) {
  const baseStyles =
    "px-6 py-3 font-bold text-white rounded-md focus:outline-none transition-transform transform-gpu duration-300 ease-out";

  const primaryStyles = `
    bg-gradient-to-r from-purple-700 via-pink-600 to-red-600
    hover:from-purple-600 hover:via-pink-500 hover:to-red-500
    focus:ring-4 focus:ring-purple-400 focus:ring-opacity-75
    shadow-lg hover:shadow-2xl hover:scale-105
  `;

  const secondaryStyles = `
    bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500
    hover:from-gray-600 hover:via-gray-500 hover:to-gray-400
    focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75
    shadow-md hover:shadow-lg hover:scale-105
  `;

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyles = classNames(
    baseStyles,
    variant === "primary" ? primaryStyles : secondaryStyles,
    disabled || loading ? disabledStyles : "",
    className // Append the additional className prop
  );

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        title
      )}
    </button>
  );
}

export default Button;

import { Link } from "react-router-dom";

const SectionHeader = ({
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
  showAction = false,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 ${className}`}
    >
      <div>
        <h2 className="text-4xl font-black text-gray-900 leading-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {showAction &&
        (actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center gap-2 text-orange-600 font-semibold transition-all duration-300 hover:gap-3"
          >
            {actionText}

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        ) : (
          <button
            onClick={onActionClick}
            className="inline-flex items-center gap-2 text-orange-600 font-semibold transition-all duration-300 hover:gap-3"
          >
            {actionText}

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        ))}
    </div>
  );
};

export default SectionHeader;
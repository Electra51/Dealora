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
      className={`flex items-center justify-between md:items-end mb-6 md:mb-10 ${className}`}
    >
      <div>
        <h2 className="text-xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-lg text-gray-600 leading-relaxed hidden md:flex">
            {description}
          </p>
        )}
      </div>

      {showAction &&
        (actionLink ? (
          <Link
            aria-label={actionText}
            to={actionLink}
            className="inline-flex items-center gap-1 md:gap-2 bg-linear-to-tr from-[#FF7203] to-[#FF9A03] bg-clip-text text-transparent font-semibold transition-all duration-300 md:hover:gap-3 shrink-0"
          >
            <span className="hidden md:inline">{actionText}</span>

            {/* Desktop Arrow */}
            <svg
              className="w-5 h-5 hidden md:block"
              fill="none"
              stroke="#FF7203"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            
            {/* Mobile Angle Icon */}
            <svg 
              className="w-6 h-6 md:hidden" 
              fill="none" 
              stroke="#FF7203" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        ) : (
          <button
          aria-label="section text"
            onClick={onActionClick}
            className="inline-flex items-center gap-1 md:gap-2 bg-linear-to-tr from-[#FF7203] to-[#FF9A03] bg-clip-text text-transparent font-semibold transition-all duration-300 md:hover:gap-3 shrink-0"
          >
            <span className="hidden md:inline">{actionText}</span>

            {/* Desktop Arrow */}
            {/* <svg
              className="w-5 h-5 hidden md:block"
              fill="none"
              stroke="#FF7203"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg> */}
            
            {/* Mobile Angle Icon */}
            {/* <svg 
              className="w-6 h-6 md:hidden" 
              fill="none" 
              stroke="#FF7203" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7" 
              />
            </svg> */}
          </button>
        ))}
    </div>
  );
};

export default SectionHeader;
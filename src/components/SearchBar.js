import React from 'react';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 pl-10 rounded-full border border-pastel-blue-light bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pastel-blue-darker focus:border-pastel-blue-darker transition-all duration-300 ease-in-out text-pastel-blue-dark placeholder-pastel-blue-light"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pastel-blue-darker"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchBar;

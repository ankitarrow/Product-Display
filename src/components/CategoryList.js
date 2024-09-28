import React from 'react';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          className={`px-4 py-2 m-1 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pastel-blue-dark focus:ring-opacity-50 shadow-md hover:shadow-lg ${
            !selectedCategory
              ? 'bg-pastel-blue-dark text-black hover:bg-pastel-blue-darker'
              : 'bg-white text-pastel-blue-dark hover:bg-pastel-blue-light'
          }`}
          onClick={() => onSelectCategory('')}
        >
          All
        </button>
        {safeCategories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-1 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pastel-blue-dark focus:ring-opacity-50 shadow-md hover:shadow-lg ${
              selectedCategory === category.slug.name
                ? 'bg-pastel-blue-dark text-black hover:bg-pastel-blue-darker'
                : 'bg-white text-pastel-blue-dark hover:bg-pastel-blue-light'
            }`}
            onClick={() => onSelectCategory(category.slug.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

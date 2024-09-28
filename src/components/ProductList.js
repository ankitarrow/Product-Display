import React from 'react';

const ProductList = ({ products, loading }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map(product => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-lg bg-white transition-transform duration-200 hover:scale-105 hover:bg-pastel-blue-light"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2 text-pastel-blue-dark">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-lg font-bold text-pastel-blue-darker">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center mt-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pastel-blue-darker"></div>
        </div>
      )}
      {products.length === 0 && !loading && (
        <div className="text-center mt-6 text-lg text-pastel-blue-dark">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductList;

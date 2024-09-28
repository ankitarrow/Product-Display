import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchCategories,
  fetchProducts,
  setSelectedCategory,
  setSearchQuery,
  incrementPage,
  resetPagination,
} from './redux/catalogSlice';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { 
    categories, 
    selectedCategory, 
    products, 
    searchQuery, 
    currentPage, 
    totalCount, 
    loading 
  } = useSelector(state => state.catalog);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    const query = params.get('search') || '';

    dispatch(setSelectedCategory(category));
    dispatch(setSearchQuery(query));
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(resetPagination());
  }, [selectedCategory, searchQuery, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingMore(true);
      await dispatch(fetchProducts({ category: selectedCategory, searchQuery, page: currentPage }));
      setIsLoadingMore(false);
    };
    fetchData();
  }, [dispatch, selectedCategory, searchQuery, currentPage]);

  const handleCategoryChange = (categorySlug) => {
    const params = new URLSearchParams(location.search);
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    navigate(`?${params.toString()}`);
  };

  const handleSearch = (query) => {
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    navigate(`?${params.toString()}`);
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Undual Catalog</h1>
      <div className="mb-8">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
      </div>
      <div className="mb-8">
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      </div>
      <ProductList products={products} loading={loading && currentPage === 1} />
      {isLoadingMore && <p className="text-center mt-4">Loading more products...</p>}
      {products.length < totalCount && !loading && !isLoadingMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useShopFilters = (products) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filters from URL parameters
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || null,
    collection: searchParams.get('collection') || null,
    minPrice: searchParams.get('minPrice') || null,
    maxPrice: searchParams.get('maxPrice') || null,
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : null,
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    sortBy: searchParams.get('sortBy') || 'featured',
    search: searchParams.get('search') || '',
  });

  // Sync filters to URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== '' && value !== false) {
        params.set(key, value);
      }
    });
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Sync from URL to filters when URL changes externally
  useEffect(() => {
    setFilters(prev => {
      const newFilters = {
        category: searchParams.get('category') || null,
        collection: searchParams.get('collection') || null,
        minPrice: searchParams.get('minPrice') || null,
        maxPrice: searchParams.get('maxPrice') || null,
        rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : null,
        inStock: searchParams.get('inStock') === 'true',
        onSale: searchParams.get('onSale') === 'true',
        sortBy: searchParams.get('sortBy') || 'featured',
        search: searchParams.get('search') || '',
      };

      const hasChanges = Object.keys(newFilters).some(key => newFilters[key] !== prev[key]);
      return hasChanges ? newFilters : prev;
    });
  }, [searchParams]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      collection: null,
      minPrice: null,
      maxPrice: null,
      rating: null,
      inStock: false,
      onSale: false,
      sortBy: 'featured',
      search: '',
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category?.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Collection filter (from URL or manual selection)
      if (filters.collection && product.collection?.toLowerCase() !== filters.collection.toLowerCase()) {
        return false;
      }

      // Price range filter
      if (filters.minPrice && product.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && product.price > Number(filters.maxPrice)) {
        return false;
      }

      // Rating filter
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stock <= 0) {
        return false;
      }

      // Sale filter
      if (filters.onSale && (!product.discount || product.discount <= 0)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [products, filters]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (filters.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => {
          if (a.newArrival && !b.newArrival) return -1;
          if (!a.newArrival && b.newArrival) return 1;
          return 0;
        });
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        // featured - prioritize best sellers and trending
        return sorted.sort((a, b) => {
          const scoreA = (a.bestSeller ? 2 : 0) + (a.trending ? 1 : 0);
          const scoreB = (b.bestSeller ? 2 : 0) + (b.trending ? 1 : 0);
          return scoreB - scoreA;
        });
    }
  }, [filteredProducts, filters.sortBy]);

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredProducts: sortedProducts,
  };
};
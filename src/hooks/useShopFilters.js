import { useState, useMemo } from 'react';

export const useShopFilters = (products) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subCategory: '',
    brand: '',
    collection: '',
    minPrice: null,
    maxPrice: null,
    rating: null,
    sort: 'default',
    inStock: false,
    onSale: false,
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      subCategory: '',
      brand: '',
      collection: '',
      minPrice: null,
      maxPrice: null,
      rating: null,
      sort: 'default',
      inStock: false,
      onSale: false,
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.subCategory.toLowerCase().includes(searchLower) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Sub Category filter
    if (filters.subCategory) {
      result = result.filter(p => p.subCategory === filters.subCategory);
    }

    // Brand filter
    if (filters.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }

    // Collection filter
    if (filters.collection) {
      result = result.filter(p => p.collection === filters.collection);
    }

    // Price range filter
    if (filters.minPrice) {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Rating filter
    if (filters.rating) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    // Stock filter
    if (filters.inStock) {
      result = result.filter(p => p.stock > 0);
    }

    // Sale filter
    if (filters.onSale) {
      result = result.filter(p => p.discount > 0);
    }

    // Sorting
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        result.sort((a, b) => {
          if (a.newArrival && !b.newArrival) return -1;
          if (!a.newArrival && b.newArrival) return 1;
          return 0;
        });
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Featured: prioritize featured, trending, bestSeller
        result.sort((a, b) => {
          const scoreA = (a.featured ? 3 : 0) + (a.trending ? 2 : 0) + (a.bestSeller ? 1 : 0);
          const scoreB = (b.featured ? 3 : 0) + (b.trending ? 2 : 0) + (b.bestSeller ? 1 : 0);
          return scoreB - scoreA;
        });
    }

    return result;
  }, [products, filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredProducts,
  };
};
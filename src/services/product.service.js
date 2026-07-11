import productsData from '../../public/products.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getProducts: async () => { await delay(600); return productsData; },
  getTrendingProducts: async () => { await delay(400); return productsData.filter(p => p.trending); },
  getBestSellerProducts: async () => { await delay(400); return productsData.filter(p => p.bestSeller); },
  getNewArrivalProducts: async () => { await delay(400); return productsData.filter(p => p.newArrival); },
  getDeals: async () => { await delay(500); return productsData.filter(p => p.discount > 0); },
  
  filterProducts: async (filters) => {
    await delay(300);
    let result = [...productsData];
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.brand) result = result.filter(p => p.brand === filters.brand);
    if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.rating) result = result.filter(p => p.rating >= filters.rating);
    return result;
  },
  
  sortProducts: async (products, sortBy) => {
    await delay(200);
    const sorted = [...products];
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }
};
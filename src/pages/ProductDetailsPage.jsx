import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  ChevronLeft, 
  Star, 
  ShoppingBag, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { productService } from '../services/product.service';
import SEO from '../components/Common/SEO';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        if (data) {
          setProduct(data);
          if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
          if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    toast.success(`Added ${product.name} to cart!`, {
      icon: '',
      style: { background: '#1f2937', color: '#fff' },
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }
console.log("product",product)
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice > product.price 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8 mt-15">
    
  <SEO
        title="Dealora | Product Details Page"
        description="Shop premium sneakers, men's fashion, women's fashion, accessories, and lifestyle products at Dealora. Fast shipping, secure checkout, and exclusive deals."
      />
      {/* Desktop Back Button */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 pt-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-8 md:px-8 md:py-8">
          
          {/* Image Gallery - Mobile */}
          <div className="md:hidden">
            <div className="relative bg-white aspect-square">
              <img 
                src={product.thumbnail} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
             
            </div>
            
            {/* Thumbnail Strip */}
            {product.gallery?.length > 0 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-white">
                {[product.thumbnail, ...product.gallery].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image Gallery - Desktop */}
          <div className="hidden md:block bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <img 
                src={product.thumbnail} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 p-4">
              {[product.thumbnail, ...product.gallery].slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:p-6 bg-white md:rounded-3xl md:shadow-sm mt-4 md:mt-0">
            {/* Brand & Category - Mobile */}
            <div className="md:hidden px-4 py-3">
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">
                {product.brand}
              </p>
              <p className="text-xs text-gray-500">
                {product.category} {product.subCategory && `• ${product.subCategory}`}
              </p>
            </div>

            {/* Product Name & Price - Mobile */}
            <div className="md:hidden px-4 pb-4 border-b border-gray-100">
              <h1 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-gray-900">
                  ${product.price}
                </span>
                {product.comparePrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.comparePrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Info - Desktop */}
            <div className="hidden md:block p-6">
              <p className="text-sm text-orange-600 font-bold uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-gray-900">
                  ${product.price}
                </span>
                {product.comparePrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.comparePrice}
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{product.soldCount} sold</span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="px-4 md:px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Color</span>
                  <span className="text-sm text-gray-500">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="px-4 md:px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Size</span>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-orange-600 font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity - Mobile */}
            <div className="md:hidden px-4 py-4 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900 block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description Tabs - Mobile */}
            <div className="md:hidden px-4 py-4">
              <div className="flex gap-6 border-b border-gray-200 mb-4">
                {['description', 'details', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize transition-colors relative ${
                      activeTab === tab ? 'text-orange-600' : 'text-gray-500'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="text-sm text-gray-600 leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.shortDescription}</p>
                )}
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                    <p><span className="font-semibold">Category:</span> {product.category}</p>
                    <p><span className="font-semibold">Collection:</span> {product.collection}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-orange-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Delivery Time</p>
                        <p className="text-gray-600">{product.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-orange-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Free Returns</p>
                        <p className="text-gray-600">30 days return policy</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Info Sections */}
            <div className="hidden md:block p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-pb">
        <div className="flex gap-3">
          <button 
            onClick={handleWishlist}
            className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
              isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex-1 h-14 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart - ${product.price * quantity}
          </button>
        </div>
      </div>

      {/* Desktop Add to Cart */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 mt-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="h-12 px-8 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart - ${product.price * quantity}
            </button>
          </div>
          <button 
            onClick={handleWishlist}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Size Guide</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>Size S</span>
                  <span>Chest: 36-38"</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Size M</span>
                  <span>Chest: 38-40"</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Size L</span>
                  <span>Chest: 40-42"</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Size XL</span>
                  <span>Chest: 42-44"</span>
                </div>
              </div>
              <button 
                onClick={() => setShowSizeGuide(false)}
                className="w-full mt-6 py-3 bg-gray-900 text-white font-bold rounded-xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsPage;
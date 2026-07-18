import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions
const generateId = () => Math.random().toString(36).substring(2, 11);
const generateSku = (prefix) =>
  `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(1));
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomBoolean = (probability = 0.5) => Math.random() < probability;
const randomDate = (start, end) =>
  new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();

const IMAGE_PATH = "src/assets/active.jpeg";

const brands = [
  "Nike",
  "Adidas",
  "Levi's",
  "Zara",
  "H&M",
  "Puma",
  "Under Armour",
  "Calvin Klein",
  "Tommy Hilfiger",
  "The Ordinary",
  "Aesop",
  "Tom Ford",
];
const customerNames = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "Chris Brown",
  "Jessica Garcia",
  "Matthew Miller",
  "Ashley Wilson",
  "David Moore",
  "Amanda Taylor",
];
const comments = [
  "Absolutely love this product! The quality is top-notch.",
  "Good value for money, but the sizing runs a bit small.",
  "Exceeded my expectations. Will definitely buy again.",
  "Fast shipping and great customer service.",
  "It's okay, but I expected a bit more based on the pictures.",
  "Perfect for my daily use. Highly recommended!",
  "The material feels very premium.",
  "A must-have! I get compliments all the time.",
  "Decent product, does the job well.",
  "Looks exactly like the pictures, very satisfied.",
];
const titles = [
  "Great buy!",
  "Good, not perfect",
  "Highly recommend",
  "Fast shipping",
  "A bit disappointed",
  "Perfect!",
  "Premium feel",
  "Must have",
  "Decent",
  "Very satisfied",
];

const categories = {
  Clothing: ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Jeans"],
  Footwear: ["Sneakers", "Running Shoes", "Boots", "Sandals", "Formal Shoes"],
  Accessories: ["Bags", "Watches", "Caps", "Wallets", "Belts"],
  Grooming: [
    "Perfumes",
    "Body Sprays",
    "Face Wash",
    "Hair Care",
    "Shaving Kits",
  ],
};

const collections = [
  "Weekend Casual",
  "Office Ready",
  "Black Edition",
  "Active Lifestyle",
  "Grooming Picks",
];

const productTemplates = [
  // Weekend Casual
  {
    name: "Oversized Vintage Hoodie",
    category: "Clothing",
    subCategory: "Hoodies",
    collection: "Weekend Casual",
    price: 65,
    comparePrice: 85,
  },
  {
    name: "Relaxed Cargo Jeans",
    category: "Clothing",
    subCategory: "Jeans",
    collection: "Weekend Casual",
    price: 55,
    comparePrice: 70,
  },
  {
    name: "Classic Canvas Sneakers",
    category: "Footwear",
    subCategory: "Sneakers",
    collection: "Weekend Casual",
    price: 45,
    comparePrice: 60,
  },
  {
    name: "Faded Denim Jacket",
    category: "Clothing",
    subCategory: "Jackets",
    collection: "Weekend Casual",
    price: 89,
    comparePrice: 120,
  },
   {
    name: "Faded Denim Jacket",
    category: "Footwear",
    "subCategory": "Boots",
    collection: "Weekend Casual",
    price: 89,
    comparePrice: 120,
  },
  {
    name: "Graphic Cotton T-Shirt",
    category: "Clothing",
    subCategory: "T-Shirts",
    collection: "Weekend Casual",
    price: 25,
    comparePrice: 35,
  },

  // Office Ready
  {
    name: "Oxford Button-Down Shirt",
    category: "Clothing",
    subCategory: "Shirts",
    collection: "Office Ready",
    price: 45,
    comparePrice: 65,
  },
  {
    name: "Tailored Slim Jeans",
    category: "Clothing",
    subCategory: "Jeans",
    collection: "Office Ready",
    price: 60,
    comparePrice: 80,
  },
  {
    name: "Premium Leather Formal Shoes",
    category: "Footwear",
    subCategory: "Formal Shoes",
    collection: "Office Ready",
    price: 120,
    comparePrice: 150,
  },
  {
    name: "Premium Leather Belt",
    category: "Accessories",
    subCategory: "Belts",
    collection: "Office Ready",
    price: 30,
    comparePrice: 45,
  },
  {
    name: "Executive Leather Briefcase",
    category: "Accessories",
    subCategory: "Bags",
    collection: "Office Ready",
    price: 199,
    comparePrice: 250,
  },

  // Black Edition
  {
    name: "Jet Black Bomber Jacket",
    category: "Clothing",
    subCategory: "Jackets",
    collection: "Black Edition",
    price: 110,
    comparePrice: 140,
  },
  {
    name: "Slim Fit Black Jeans",
    category: "Clothing",
    subCategory: "Jeans",
    collection: "Black Edition",
    price: 75,
    comparePrice: 95,
  },
  {
    name: "Stealth Chronograph Watch",
    category: "Accessories",
    subCategory: "Watches",
    collection: "Black Edition",
    price: 150,
    comparePrice: 200,
  },
  {
    name: "Matte Black Chelsea Boots",
    category: "Footwear",
    subCategory: "Boots",
    collection: "Black Edition",
    price: 135,
    comparePrice: 180,
  },
  {
    name: "Black Baseball Cap",
    category: "Accessories",
    subCategory: "Caps",
    collection: "Black Edition",
    price: 25,
    comparePrice: 35,
  },

  // Active Lifestyle
  {
    name: "Moisture-Wicking Running Shirt",
    category: "Clothing",
    subCategory: "T-Shirts",
    collection: "Active Lifestyle",
    price: 35,
    comparePrice: 50,
  },
  {
    name: "Lightweight Sport Sandals",
    category: "Footwear",
    subCategory: "Sandals",
    collection: "Active Lifestyle",
    price: 40,
    comparePrice: 55,
  },
  {
    name: "Ultra-Bounce Running Shoes",
    category: "Footwear",
    subCategory: "Running Shoes",
    collection: "Active Lifestyle",
    price: 130,
    comparePrice: 160,
  },
  {
    name: "Sporty Zipper Hoodie",
    category: "Clothing",
    subCategory: "Hoodies",
    collection: "Active Lifestyle",
    price: 50,
    comparePrice: 70,
  },
  {
    name: "Waterproof Sport Windbreaker",
    category: "Clothing",
    subCategory: "Jackets",
    collection: "Active Lifestyle",
    price: 95,
    comparePrice: 130,
  },

  // Grooming Picks
  {
    name: "Purifying Charcoal Face Wash",
    category: "Grooming",
    subCategory: "Face Wash",
    collection: "Grooming Picks",
    price: 22,
    comparePrice: 30,
  },
  {
    name: "Daily Hydrating Face Wash",
    category: "Grooming",
    subCategory: "Face Wash",
    collection: "Grooming Picks",
    price: 35,
    comparePrice: 45,
  },
  {
    name: "Texturizing Matte Hair Care",
    category: "Grooming",
    subCategory: "Hair Care",
    collection: "Grooming Picks",
    price: 18,
    comparePrice: 25,
  },
  {
    name: "Wood & Spice Signature Perfume",
    category: "Grooming",
    subCategory: "Perfumes",
    collection: "Grooming Picks",
    price: 85,
    comparePrice: 110,
  },
  {
    name: "Refreshing Body Spray",
    category: "Grooming",
    subCategory: "Body Sprays",
    collection: "Grooming Picks",
    price: 20,
    comparePrice: 28,
  },
];

const generateReviews = (productId, reviewCount) => {
  const reviews = [];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: generateId(),
      productId: productId,
      customerName: randomItem(customerNames),
      avatar: IMAGE_PATH,
      verifiedPurchase: randomBoolean(0.8),
      rating: randomInt(3, 5),
      title: randomItem(titles),
      comment: randomItem(comments),
      reviewDate: randomDate(new Date(2023, 0, 1), new Date()),
      helpfulCount: randomInt(0, 50),
    });
  }
  return reviews;
};

const generateProducts = () => {
  const products = [];
  const allReviews = [];

  // Create base products
  productTemplates.forEach((template) => {
    const id = generateId();
    const sku = generateSku(template.category.substring(0, 3).toUpperCase());
    const slug = slugify(template.name);

    const reviewCount = randomInt(5, 120);
    const reviews = generateReviews(id, reviewCount);
    allReviews.push(...reviews);

    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating =
      reviewCount > 0 ? parseFloat((totalRating / reviewCount).toFixed(1)) : 0;

    const stock = randomInt(0, 500);
    const soldCount = randomInt(10, 1000);

    let colors = ["Black", "White", "Navy", "Olive", "Grey"];
    if (template.category === "Grooming") colors = []; // Grooming usually has no colors

    let sizes = ["S", "M", "L", "XL"];
    if (template.category === "Footwear") sizes = ["8", "9", "10", "11", "12"];
    if (
      template.category === "Accessories" &&
      template.subCategory !== "Watches"
    )
      sizes = ["One Size"];
    if (template.category === "Grooming") sizes = ["50ml", "100ml", "200ml"];

    const isNewArrival = randomBoolean(0.3);
    const isFeatured = randomBoolean(0.2);
    const isTrending = soldCount > 500;
    const isBestSeller = soldCount > 800;

    products.push({
      id,
      sku,
      slug,
      name: template.name,
      shortDescription: `Experience the best of ${template.collection} with our ${template.name}. Designed for quality and comfort.`,
      fullDescription: `The ${template.name} is a premium product from our ${template.collection} collection. Crafted with the finest materials to ensure durability and style. Perfect for any occasion, it seamlessly blends functionality with modern aesthetics. Available in various sizes and colors to match your personal preference. Add this essential piece to your collection today.`,
      brand: randomItem(brands),
      category: template.category,
      subCategory: template.subCategory,
      collection: template.collection,
      gender: randomItem(["Men", "Unisex"]),
      tags: [
        template.category.toLowerCase(),
        template.subCategory.toLowerCase(),
        template.collection.toLowerCase().replace(" ", "-"),
        "premium",
        "new",
      ],
      thumbnail: IMAGE_PATH,
      gallery: [IMAGE_PATH, IMAGE_PATH, IMAGE_PATH, IMAGE_PATH],
      price: template.price,
      comparePrice: template.comparePrice,
      inventory: {
        stock,
        lowStock: stock > 0 && stock <= 10,
        inStock: stock > 0,
        preorder: stock === 0 && randomBoolean(0.5),
        shippingDays: randomInt(2, 7),
      },
      rating: averageRating,
      reviewCount,
      soldCount,
      colors: randomBoolean(0.7)
        ? colors.slice(0, randomInt(1, colors.length))
        : [],
      sizes: sizes,
      shipping: {
        freeShipping: randomBoolean(0.6),
        cost: randomBoolean(0.6) ? 0 : 15,
      },
      estimatedDelivery: `${randomInt(2, 4)} - ${randomInt(5, 7)} Business Days`,
      flags: {
        featured: isFeatured,
        trending: isTrending,
        newArrival: isNewArrival,
        bestSeller: isBestSeller,
        isLimitedEdition: randomBoolean(0.1),
        isFeaturedCollection: randomBoolean(0.4),
      },
      createdAt: randomDate(new Date(2023, 0, 1), new Date()),
      updatedAt: randomDate(new Date(2023, 6, 1), new Date()),
      // Relationships placeholders
      relatedProducts: [],
      recommendedProducts: [],
      frequentlyBoughtTogether: [],
    });
  });

  // Assign relationships
  products.forEach((product) => {
    // Related products: same category or collection
    const related = products.filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.collection === product.collection),
    );
    product.relatedProducts = related
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((p) => p.id);

    // Recommended products: trending or best sellers
    const recommended = products.filter(
      (p) => p.id !== product.id && (p.flags.trending || p.flags.bestSeller),
    );
    product.recommendedProducts = recommended
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((p) => p.id);

    // Frequently bought together: Random products
    const fbt = products.filter((p) => p.id !== product.id);
    product.frequentlyBoughtTogether = fbt
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((p) => p.id);
  });

  return { products, reviews: allReviews };
};

const data = generateProducts();

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, "db.json"), JSON.stringify(data, null, 2));

console.log("Data generation complete! Saved to src/data/db.json");

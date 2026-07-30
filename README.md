# Best Dealz (Dealora)

Best Dealz (also known as Dealora) is a modern, highly optimized e-commerce web application built with React. Originally a legacy project, it has been completely revitalized and migrated to **Vite** to ensure blazing fast development and production builds. 

Significant effort has been put into performance tuning, SEO optimization, and creating a seamless user experience. The application features a mobile-first, app-like UI, fluid animations, and a solid state management architecture.

## 🚀 Performance & Lighthouse Scores

We take performance seriously. After recent optimizations, the application achieves exceptional Lighthouse scores across all metrics:

- **Performance:** 94
- **Accessibility:** 95
- **Best Practices:** 96
- **SEO:** 92

*These scores reflect optimizations in lazy loading components, image delivery (handling layout shifts), semantic HTML, dynamic SEO management, and minimizing main-thread blocking.*

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **SEO:** React Helmet Async

## ✨ Key Features

- **Dynamic Homepage:** Features Hero sections, Trending Products, New Arrivals, and Shop by Brand with mobile-friendly horizontal scrolling.
- **Shop & Filtering:** Advanced filtering system for browsing categories and brands efficiently.
- **Product Details:** Comprehensive product view including images, descriptions, and dynamic discount calculations.
- **Cart Management:** Fully functional shopping cart utilizing Zustand for predictable state.
- **Mobile-First Design:** Carefully crafted components that mimic a native application feel on mobile devices, including bottom navigation and optimized headers.
- **SEO Ready:** Every page is optimized with dynamic meta tags and proper heading structures.

## 🚦 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd best-dealz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   *You can also run `npm run preview` to preview the production build locally.*

## 📈 Recent Optimizations

- **Vite Migration:** Moved away from older bundlers to Vite for faster HMR and optimized asset bundling.
- **Component Lazy Loading:** Implemented Intersection Observer for heavy homepage components.
- **Image Optimization:** Explicit width/height attributes added to prevent Cumulative Layout Shift (CLS).
- **Reduced Bundle Size:** Replaced library-heavy icons with optimized SVGs where necessary and used `vite-plugin-image-optimizer`.
- **UI Enhancements:** Removed redundant animations for a snappier feel and fixed mobile z-index issues.

---
*Built with passion for performance and clean UI.*

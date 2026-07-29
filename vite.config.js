// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react(),
//   ],
// })




// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react(),
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('framer-motion')) return 'vendor-framer';
//             if (id.includes('lucide-react')) return 'vendor-lucide';
//             if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
//               return 'vendor-core';
//             }
//             return 'vendor-others';
//           }
//         },
//       },
//     },
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    ViteImageOptimizer({
      // WebP ইমেজের কোয়ালিটি এবং কম্প্রেশন সেটিংস
      webp: {
        quality: 75, // ৭৫% কোয়ালিটিতে চোখে পড়ার মতো কোনো চেঞ্জ হয় না, কিন্তু ফাইল সাইজ ৫০-৭০% কমে যায়
      },
      // প্রজেক্টে PNG/JPG থাকলে সেগুলোর জন্যও সেটিং
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-core';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
})
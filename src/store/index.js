import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
      { id: 1, name: 'Bedding', slug: 'Bedding' },
      { id: 2, name: 'Bath', slug: 'Bath' }
    ]
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
    },
    updateCartItem(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    clearCart(state) {
      state.cart = []
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // In a real app, this would be an API call
      // For now, we'll use hardcoded data
      const products = [
        {
          "id": 1,
          "name": "BM10 Mini Quad Band Phone Box Packed (PTA Approved)",
          "price": 2599,
          "originalPrice": 3799,
          "description": "Mini & Compact design with voice changer, dual SIM support, MP3/MP4 music player, and Bluetooth connectivity. Perfect as a standalone phone or bluetooth headset.",
          "category": "Mobile Phones",
          "image": "https://m.media-amazon.com/images/I/610bYaxyI9L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 2,
          "name": "Dz09 Smartwatch (1.56 inch Display)",
          "price": 2999,
          "originalPrice": 3699,
          "description": "Smart watch with 1.56 inch display, Bluetooth connectivity, fitness tracking, and mobile notifications support.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/6127YV8BpIL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 3,
          "name": "Xiaomi Mi Band 5 Black Global Version",
          "price": 4899,
          "originalPrice": 6499,
          "description": "Fitness tracker with heart rate monitor, sleep tracking, and 14-day battery life. Features a colorful AMOLED display and 5 ATM water resistance.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/619syjM2gxL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 4,
          "name": "Q & Q VP34J005 WHITE DIAL RUBBER STRAP",
          "price": 1699,
          "originalPrice": 2299,
          "description": "Elegant white dial watch with comfortable rubber strap, water-resistant design, and Japanese quartz movement.",
          "category": "Watches",
          "image": "https://m.media-amazon.com/images/I/61A5AN+xXsL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 5,
          "name": "Anex Deluxe Citrus Juicer AG-2158 With Official Warranty",
          "price": 9449,
          "originalPrice": 13899,
          "description": "Powerful citrus juicer with stainless steel design, multiple speed settings, and pulp control for fresh juice extraction.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/71hV+I0QjpL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 6,
          "name": "Anex Citrus Juicer AG 2055 With Official Warranty",
          "price": 5819,
          "originalPrice": 7999,
          "description": "Efficient citrus juicer with powerful motor, stainless steel filter, and easy-to-clean design. Comes with a 2-year official warranty.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/713WvPA7hFL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 7,
          "name": "Anex Citrus Juicer AG 2054 With Official Warranty",
          "price": 6179,
          "originalPrice": 9809,
          "description": "Stylish citrus juicer with automatic operation, large capacity container, and durable construction for long-lasting use.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/7155EbXa3XL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 8,
          "name": "Blulory Glifo G6 Pro Smart Watch Leather Brown",
          "price": 6899,
          "originalPrice": 7999,
          "description": "Premium smartwatch with leather band, heart rate monitoring, sleep tracking, and multiple sport modes. Features IP68 water resistance.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/71QA9CUvpzL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 9,
          "name": "Ronin R-03 BT Calling Smartwatch",
          "price": 9458,
          "originalPrice": 11899,
          "description": "Full-featured smartwatch with Bluetooth calling, health monitoring, multiple sport modes, and long battery life.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/71tzAgUsDDL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 10,
          "name": "Itel A27 (2 GB RAM) (32 GB) Official Warranty with (PTA Approved)",
          "price": 13550,
          "originalPrice": 14999,
          "description": "Budget smartphone with 2GB RAM, 32GB storage, Android OS, and large display. PTA approved with official warranty.",
          "category": "Mobile Phones",
          "image": "https://m.media-amazon.com/images/I/71ojBUfqjSL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 25
        },
        {
          "id": 11,
          "name": "Anex AG-3061 Single Hot Plate With Official Warranty",
          "price": 10439,
          "originalPrice": 14899,
          "description": "Durable single hot plate with temperature control, stainless steel construction, and non-slip feet. Ideal for small kitchens and travel.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/71ztFZZHEmL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 12,
          "name": "Redmi Watch 5 Active Global With Bluetooth Calling",
          "price": 10679,
          "originalPrice": 15899,
          "description": "Advanced smartwatch with Bluetooth calling, large AMOLED display, heart rate monitoring, and over 100 sports modes.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/61sTOZCxuUL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 13,
          "name": "KIESLECT KR SMART WATCH BLACK",
          "price": 8899,
          "originalPrice": 12899,
          "description": "Modern smartwatch with fitness tracking, blood pressure monitoring, sleep analysis, and waterproof design.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/51VaRX1rmqL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 14,
          "name": "Ronin (R-01) Smart Watch Fitness & Bluetooth Calling With Warranty",
          "price": 10794,
          "originalPrice": 13899,
          "description": "Feature-rich smartwatch with fitness tracking, Bluetooth calling, heart rate monitor, and long-lasting battery life.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/71asiwzC7JL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 15,
          "name": "Anex Deluxe AG-644 Grinder Wet & Dry With Official Warranty",
          "price": 7849,
          "originalPrice": 11899,
          "description": "Versatile grinder for wet and dry ingredients with powerful motor, stainless steel blades, and safety features.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/71c9z9UvSOL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 16,
          "name": "Philips Pro Mix Hand Blender HR2545/01",
          "price": 20399,
          "originalPrice": 28699,
          "description": "Premium hand blender with Pro Mix technology, multiple speeds, and easy-to-clean detachable parts for versatile food preparation.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/61tC-StfzvL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 17,
          "name": "Intelligent Automatic Rechargeable Mute Sweeping Robot For Dry & Wet Floor",
          "price": 4199,
          "originalPrice": 5999,
          "description": "Smart cleaning robot with rechargeable battery, wet and dry cleaning modes, and quiet operation for hassle-free floor maintenance.",
          "category": "Home Appliances",
          "image": "https://m.media-amazon.com/images/I/71q+JOnNstL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 18,
          "name": "Ronin R-02 Smart Watch",
          "price": 10998,
          "originalPrice": 13799,
          "description": "Advanced smartwatch with health monitoring, sports tracking, notification support, and long battery life in a stylish design.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/61c8PI8DtvL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 19,
          "name": "Blulory Glifo G6 Pro Black Silicon",
          "price": 5170,
          "originalPrice": 8170,
          "description": "Modern smartwatch with silicon band, fitness tracking, heart rate monitoring, and sleep analysis in a sleek black design.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/71aDKOcvDGL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 20,
          "name": "Blulory Glifo G6 Pro Smart Watch Leather Black",
          "price": 5170,
          "originalPrice": 7170,
          "description": "Elegant smartwatch with leather band, fitness features, notifications support, and long battery life in a classic black design.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/614OVef7rPL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 21,
          "name": "Amazon Fire 7 1GB, 8GB 7 inches Box Pack",
          "price": 7499,
          "originalPrice": 8299,
          "description": "Compact tablet with 7-inch display, 1GB RAM, 8GB storage, and access to Amazon's content ecosystem. Perfect for reading and media consumption.",
          "category": "Tablets",
          "image": "https://m.media-amazon.com/images/I/415DQGAV8mL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 12
        },
        {
          "id": 22,
          "name": "Anex Citrus Juicer (AG-2154) With Official Warranty",
          "price": 6659,
          "originalPrice": 9899,
          "description": "Efficient citrus juicer with automatic operation, pulp control, and durable stainless steel filter. Comes with official warranty.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/81dNYhIrzaL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 23,
          "name": "Anex Deluxe Citrus Juicer (AG-2058) With Official Warranty",
          "price": 5849,
          "originalPrice": 9799,
          "description": "Powerful citrus juicer with easy-to-clean design, large capacity, and official warranty for peace of mind.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/61LzKY5ranL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 24,
          "name": "JOYROOM FT1 Smart Watch",
          "price": 4499,
          "originalPrice": 6499,
          "description": "Feature-packed smartwatch with health monitoring, sports modes, notification support, and stylish design at an affordable price.",
          "category": "Smart Watches",
          "image": "https://m.media-amazon.com/images/I/71asiwzC7JL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 20
        },
        {
          "id": 25,
          "name": "Intelligent Automatic Rechargeable Mute Sweeping Robot For Dry & Wet Floor",
          "price": 4599,
          "originalPrice": 6999,
          "description": "Smart robotic vacuum with automatic operation, rechargeable battery, and both wet and dry cleaning capabilities.",
          "category": "Home Appliances",
          "image": "https://m.media-amazon.com/images/I/61QtX7tKB7L._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 26,
          "name": "Anex Deluxe Digital Double Hot Plate AG-3028",
          "price": 21299,
          "originalPrice": 27999,
          "description": "High-quality double hot plate with digital temperature control, stainless steel construction, and energy-efficient design.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/61vfC-MGxcL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 10
        },
        {
          "id": 27,
          "name": "Anex AG-2166EX Deluxe Induction Cooker",
          "price": 13399,
          "originalPrice": 16999,
          "description": "Energy-efficient induction cooker with multiple cooking modes, digital display, and safety features for modern cooking.",
          "category": "Kitchen Appliances",
          "image": "https://m.media-amazon.com/images/I/71iDDKZIJVL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 8
        },
        {
          "id": 28,
          "name": "Panasonic VL-SV74 Video Door Intercom Systems",
          "price": 69599,
          "originalPrice": 73899,
          "description": "Advanced video door intercom system with night vision, wide-angle camera, and intuitive interface for home security.",
          "category": "Home Security",
          "image": "https://m.media-amazon.com/images/I/41Bz0Vd0UyL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 5
        },
        {
          "id": 29,
          "name": "AOC 34\" Frameless Curved LED Gaming Monitor Black / Red (CU34G2X)",
          "price": 50000,
          "originalPrice": 62098,
          "description": "Ultra-wide curved gaming monitor with high refresh rate, vibrant colors, and immersive viewing experience for gaming enthusiasts.",
          "category": "Computer Accessories",
          "image": "https://m.media-amazon.com/images/I/819cIGDvUYL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 5
        },
        {
          "id": 30,
          "name": "HP Laptop 15s-du2098tu | Core i5-10th Generation | 4GB RAM | 1TB HDD",
          "price": 45999,
          "originalPrice": 49999,
          "description": "Powerful laptop with 10th gen Core i5 processor, 4GB RAM, 1TB storage, and 15.6-inch display for productivity and entertainment.",
          "category": "Laptops",
          "image": "https://m.media-amazon.com/images/I/61DOwrWYWfL._AC_UY436_FMwebp_QL65_.jpg",
          "stock": 10
        }
      ]

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})

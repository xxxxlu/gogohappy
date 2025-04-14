<template>
  <div class="cyber-product-card">
    <div class="product-border-glow"></div>
    <div class="card-glitch-effect"></div>
    
    <div class="cyber-product-image">
      <div class="image-container">
        <img
          :src="product.image"
          :alt="product.name"
        />
        <div class="image-glitch"></div>
      </div>
      <div class="cyber-discount" v-if="discountPercentage > 0">
        <span class="discount-text">{{ discountPercentage }}%</span>
        <span class="discount-label">SAVE</span>
      </div>
      <div class="corner tl"></div>
      <div class="corner tr"></div>
      <div class="corner bl"></div>
      <div class="corner br"></div>
    </div>
    
    <div class="cyber-product-details">
      <div class="product-header">
        <h3 class="cyber-product-title">
          <router-link :to="`/product/${product.id}`" class="title-link">{{ product.name }}</router-link>
        </h3>
      </div>
      
      <div class="detail-line"></div>
      
      <div class="cyber-product-price">
        <div class="price-tag">
          <span class="currency">Rs.</span>
          <span class="current-price">{{ formatPrice(product.price) }}</span>
          <span class="original-price" v-if="product.originalPrice > product.price">
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>
        <div class="stock-indicator" :class="{ 'out-of-stock': product.stock <= 0 }">
          {{ product.stock > 0 ? 'IN STOCK' : 'DEPLETED' }}
        </div>
      </div>
      
      <button
        class="cyber-btn"
        @click="addToCart"
        :disabled="product.stock <= 0"
      >
        <span class="btn-text">{{ product.stock > 0 ? 'CONNECT' : 'UNAVAILABLE' }}</span>
        <span class="btn-glitch"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercentage() {
      if (this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    addToCart() {
      this.$store.commit('addToCart', this.product)
    }
  }
}
</script>

<style scoped>
:root {
  --cyber-purple: #9333ea;
  --cyber-purple-dark: #7e22ce;
  --cyber-purple-light: #a855f7;
  --cyber-pink: #ec4899;
  --cyber-blue: #2dd4bf;
  --cyber-yellow: #facc15;
  --cyber-bg-dark: #09090b;
  --cyber-bg-light: #18181b;
  --cyber-text: #e2e8f0;
  --cyber-grid: rgba(168, 85, 247, 0.2);
  --cyber-border: #7e22ce;
}

/* Cyberpunk Product Card */
.cyber-product-card {
  background-color: rgba(24, 24, 27, 0.8);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--cyber-purple-dark);
  clip-path: polygon(0 0, 100% 0, 97% 100%, 3% 100%);
}

.product-border-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  box-shadow: 0 0 15px var(--cyber-purple);
  z-index: 10;
}

.card-glitch-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(147, 51, 234, 0.15), transparent);
  z-index: 1;
  pointer-events: none;
}

.cyber-product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 25px rgba(147, 51, 234, 0.3);
  border-color: var(--cyber-purple);
}

.cyber-product-card:hover .product-border-glow {
  box-shadow: 0 0 20px var(--cyber-purple);
}

/* Product Image */
.cyber-product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background-color: rgba(9, 9, 11, 0.6);
  z-index: 2;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.cyber-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: saturate(1.2) contrast(1.1);
}

.cyber-product-card:hover .cyber-product-image img {
  transform: scale(1.08);
}

.image-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(147, 51, 234, 0.1), transparent);
  mix-blend-mode: color-dodge;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-product-card:hover .image-glitch {
  opacity: 1;
}

.corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid var(--cyber-purple-light);
  z-index: 3;
}

.tl {
  top: 5px;
  left: 5px;
  border-bottom: none;
  border-right: none;
}

.tr {
  top: 5px;
  right: 5px;
  border-bottom: none;
  border-left: none;
}

.bl {
  bottom: 5px;
  left: 5px;
  border-top: none;
  border-right: none;
}

.br {
  bottom: 5px;
  right: 5px;
  border-top: none;
  border-left: none;
}

/* Discount Badge */
.cyber-discount {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(147, 51, 234, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.7);
  z-index: 4;
}

.discount-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--cyber-text);
  line-height: 1;
}

.discount-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--cyber-pink);
  letter-spacing: 1px;
  opacity: 0.9;
}

/* Product Details */
.cyber-product-details {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 3;
}

.cyber-product-title {
  font-size: 16px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 44px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
}

.title-link {
  color: var(--cyber-text);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.title-link:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 5px var(--cyber-purple);
}

.detail-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple-dark), transparent);
  margin: 10px 0;
  opacity: 0.7;
}

/* Price Section */
.cyber-product-price {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.price-tag {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}

.currency {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  color: var(--cyber-pink);
  margin-right: 2px;
}

.current-price {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--cyber-purple-light);
  margin-right: 8px;
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: rgba(226, 232, 240, 0.6);
  position: relative;
}

.original-price::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--cyber-pink);
  transform: translateY(-50%);
}

/* Stock Indicator */
.stock-indicator {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  padding: 3px 8px;
  background-color: rgba(45, 212, 191, 0.2);
  color: var(--cyber-blue);
  border: 1px solid var(--cyber-blue);
  letter-spacing: 0.5px;
}

.stock-indicator.out-of-stock {
  background-color: rgba(236, 72, 153, 0.2);
  color: var(--cyber-pink);
  border-color: var(--cyber-pink);
}

/* Button */
.cyber-btn {
  width: 100%;
  padding: 10px 15px;
  background-color: var(--cyber-purple-dark);
  color: var(--cyber-text);
  border: 1px solid var(--cyber-purple);
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  margin-top: auto;
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--cyber-purple), var(--cyber-purple-light));
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.cyber-btn:hover {
  background-color: var(--cyber-purple);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.5);
}

.cyber-btn:hover .btn-glitch {
  opacity: 0.5;
}

.cyber-btn:disabled {
  background-color: rgba(39, 39, 42, 0.8);
  border-color: rgba(147, 51, 234, 0.3);
  color: rgba(226, 232, 240, 0.5);
  cursor: not-allowed;
  box-shadow: none;
}

.cyber-btn:disabled:hover {
  transform: none;
}

.cyber-btn:disabled .btn-glitch {
  opacity: 0;
}

/* Active element for touch */
@media (hover: none) {
  .cyber-product-card:active {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(147, 51, 234, 0.3);
  }
  
  .cyber-btn:active {
    background-color: var(--cyber-purple);
  }
}
</style>

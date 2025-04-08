<template>
  <div class="cyber-product-detail cyber-grid-bg">
    <div class="container">
      <div class="cyber-breadcrumbs">
        <router-link to="/">HOME</router-link>
        <span class="separator">//</span>
        <router-link :to="`/products?category=${product.category}`">
          {{ categoryName.toUpperCase() }}
        </router-link>
        <span class="separator">//</span>
        <span class="current">{{ product.name.toUpperCase() }}</span>
      </div>

      <div class="cyber-product-container" v-if="product">
        <div class="cyber-product-images">
          <div class="cyber-main-image">
            <div class="cyber-image-wrapper">
              <img
                :src="product.image"
                :alt="product.name"
                @error="handleImageError"
              />
              <div class="cyber-corner tl"></div>
              <div class="cyber-corner tr"></div>
              <div class="cyber-corner bl"></div>
              <div class="cyber-corner br"></div>
              <div class="image-glitch"></div>
            </div>
          </div>
        </div>

        <div class="cyber-product-info">
          <h1 class="cyber-product-title"><span class="title-text">{{ product.name }}</span><span class="blinking-cursor">_</span></h1>

          <div class="cyber-product-price cyber-card">
            <div class="price-display">
              <span class="currency">Rs.</span>
              <span class="current-price">{{ formatPrice(product.price) }}</span>
              <span class="original-price" v-if="product.originalPrice > product.price">
                Rs. {{ formatPrice(product.originalPrice) }}
              </span>
            </div>
            <div class="cyber-discount" v-if="discountPercentage > 0">
              <span class="discount-text">{{ discountPercentage }}%</span>
              <span class="discount-label">SAVE</span>
            </div>
          </div>

          <div class="cyber-stock-status" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock <= 0 }">
            <div class="status-indicator"></div>
            <span class="status-text">{{ product.stock > 0 ? `STOCK_STATUS::${product.stock}_UNITS` : 'STOCK_DEPLETED::ERROR_404' }}</span>
          </div>

          <div class="cyber-quantity-selector">
            <label class="cyber-label" for="quantity">QUANTITY_SETTING::</label>
            <div class="cyber-quantity-controls">
              <button class="cyber-qty-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input class="cyber-input" type="number" id="quantity" v-model.number="quantity" min="1" :max="product.stock" />
              <button class="cyber-qty-btn" @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
            </div>
          </div>

          <div class="cyber-action-buttons">
            <button
              class="cyber-btn add-to-cart-btn"
              @click="addToCart"
              :disabled="product.stock <= 0"
            >
              <span class="btn-text">ADD_TO_NEURAL_CART</span>
              <span class="btn-glow"></span>
            </button>
            <button
              class="cyber-btn buy-now-btn"
              @click="buyNow"
              :disabled="product.stock <= 0"
            >
              <span class="btn-text">INSTANT_UPLOAD</span>
              <span class="btn-glow"></span>
            </button>
          </div>

          <div class="cyber-product-details cyber-card">
            <h3 class="cyber-section-title">PRODUCT_DATA::</h3>
            <div class="detail-line"></div>
            <p class="cyber-text">{{ product.description }}</p>
          </div>

          <div class="cyber-delivery-info">
            <div class="cyber-delivery-option">
              <div class="icon-container">
                <i class="cyber-icon delivery-icon"></i>
              </div>
              <span class="option-text">NATIONWIDE_NEURAL_TRANSFER</span>
            </div>
            <div class="cyber-delivery-option">
              <div class="icon-container">
                <i class="cyber-icon warranty-icon"></i>
              </div>
              <span class="option-text">7_DAYS_QUANTUM_WARRANTY</span>
            </div>
            <div class="cyber-delivery-option">
              <div class="icon-container">
                <i class="cyber-icon service-icon"></i>
              </div>
              <span class="option-text">TECH_SUPPORT: 0311-1444717</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cyber-loading" v-else>
        <div class="loading-spinner"></div>
        <p class="loading-text">SCANNING_PRODUCT_DATA<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span></p>
      </div>

      <div class="cyber-related-products" v-if="relatedProducts.length > 0">
        <div class="cyber-section-header">
          <div class="glitch-line"></div>
          <h2 class="cyber-section-title">NEURAL_CONNECTIONS://</h2>
        </div>
        <div class="cyber-related-products-grid">
          <product-card
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      return this.products.find(p => p.id === this.productId) || null
    },
    categoryName() {
      if (this.product) {
        const category = this.categories.find(cat => cat.slug === this.product.category)
        return category ? category.name : 'Products'
      }
      return 'Products'
    },
    discountPercentage() {
      if (this.product && this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    },
    relatedProducts() {
      if (!this.product) return []

      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.productId)
        .slice(0, 4)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      alert('Product added to cart!')
    },
    buyNow() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      this.$router.push('/cart')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/cyberpunk.css');

.cyber-product-detail {
  padding: 48px 0;
  background-color: var(--cyber-bg-base);
  min-height: 100vh;
  position: relative;
}

.cyber-grid-bg {
  position: relative;
  z-index: 1;
}

.cyber-grid-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--cyber-purple-dark) 1px, transparent 1px),
                  linear-gradient(90deg, var(--cyber-purple-dark) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0;
  opacity: 0.03;
  z-index: -1;
}

.cyber-breadcrumbs {
  margin-bottom: 32px;
  color: var(--cyber-text-darker);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1px;
}

.cyber-breadcrumbs a {
  color: var(--cyber-text-darker);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  padding: 0 4px;
}

.cyber-breadcrumbs a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple-light), transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.cyber-breadcrumbs a:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 8px rgba(147, 51, 234, 0.3);
}

.cyber-breadcrumbs a:hover::after {
  transform: scaleX(1);
}

.cyber-breadcrumbs .separator {
  color: var(--cyber-purple-dark);
  opacity: 0.7;
}

.cyber-breadcrumbs .current {
  color: var(--cyber-purple-light);
  font-weight: 500;
  text-shadow: 0 0 8px rgba(147, 51, 234, 0.3);
}

.cyber-product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.cyber-product-images {
  position: relative;
}

.cyber-main-image {
  overflow: hidden;
  position: relative;
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
}

.cyber-image-wrapper {
  position: relative;
  padding-top: 100%;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  overflow: hidden;
}

.cyber-image-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  box-shadow: 0 0 15px var(--cyber-purple);
  z-index: 10;
}

.cyber-image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 32px;
  transition: all 0.4s ease;
  z-index: 1;
}

.cyber-main-image:hover img {
  transform: scale(1.05);
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
}

.cyber-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 2;
}

.cyber-corner.tl {
  top: 0;
  left: 0;
  border-top: 2px solid var(--cyber-purple-light);
  border-left: 2px solid var(--cyber-purple-light);
}

.cyber-corner.tr {
  top: 0;
  right: 0;
  border-top: 2px solid var(--cyber-purple-light);
  border-right: 2px solid var(--cyber-purple-light);
}

.cyber-corner.bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid var(--cyber-purple-light);
  border-left: 2px solid var(--cyber-purple-light);
}

.cyber-corner.br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--cyber-purple-light);
  border-right: 2px solid var(--cyber-purple-light);
}

.image-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 65%, rgba(139, 92, 246, 0.1) 70%, transparent 75%);
  background-size: 200% 200%;
  animation: glitchEffect 5s infinite linear;
  z-index: 3;
  pointer-events: none;
}

@keyframes glitchEffect {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

.cyber-product-info {
  position: relative;
}

.cyber-product-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--cyber-text);
  margin-bottom: 24px;
  line-height: 1.2;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  position: relative;
}

.cyber-product-title .title-text {
  background: linear-gradient(to right, var(--cyber-text), var(--cyber-purple-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
  color: var(--cyber-purple-light);
  margin-left: 5px;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.cyber-card {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  position: relative;
  overflow: hidden;
  padding: 24px;
  margin-bottom: 32px;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  box-shadow: 0 0 15px var(--cyber-purple);
  z-index: 2;
}

.cyber-product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-display {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
}

.currency {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  color: var(--cyber-text-darker);
}

.current-price {
  font-size: 34px;
  font-weight: 700;
  color: var(--cyber-purple-light);
  font-family: 'Orbitron', sans-serif;
  line-height: 1;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.original-price {
  font-size: 16px;
  text-decoration: line-through;
  color: var(--cyber-text-darker);
  opacity: 0.7;
  position: relative;
}

.cyber-discount {
  background-color: var(--cyber-purple-dark);
  padding: 6px 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.cyber-discount::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.discount-text {
  font-size: 22px;
  font-weight: 700;
  color: var(--cyber-text);
  font-family: 'Orbitron', sans-serif;
  line-height: 1;
}

.discount-label {
  font-size: 12px;
  color: var(--cyber-purple-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 3px;
}

.cyber-stock-status {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 12px 16px;
  background-color: rgba(139, 92, 246, 0.05);
  border-left: 3px solid var(--cyber-purple-dark);
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
}

.in-stock .status-indicator {
  background-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: pulse 2s infinite;
}

.out-of-stock .status-indicator {
  background-color: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.status-text {
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text);
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cyber-quantity-selector {
  margin-bottom: 32px;
}

.cyber-label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: var(--cyber-text-darker);
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cyber-quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--cyber-purple-dark);
  background-color: var(--cyber-bg-light);
  overflow: hidden;
  position: relative;
}

.cyber-quantity-controls::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple-light), transparent);
  opacity: 0.7;
}

.cyber-qty-btn {
  width: 40px;
  height: 42px;
  border: none;
  background-color: transparent;
  color: var(--cyber-text);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.cyber-qty-btn:hover:not(:disabled) {
  background-color: rgba(139, 92, 246, 0.1);
  color: var(--cyber-purple-light);
}

.cyber-qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cyber-input {
  width: 60px;
  height: 42px;
  border: none;
  border-left: 1px solid var(--cyber-purple-dark);
  border-right: 1px solid var(--cyber-purple-dark);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--cyber-text);
  background-color: transparent;
  -moz-appearance: textfield;
  appearance: textfield;
  font-family: 'Orbitron', sans-serif;
}

.cyber-input::-webkit-outer-spin-button,
.cyber-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cyber-action-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.cyber-btn {
  flex: 1;
  position: relative;
  background-color: transparent;
  border: 1px solid var(--cyber-purple);
  padding: 14px 26px;
  color: var(--cyber-text);
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent);
  transition: all 0.5s ease;
  z-index: -1;
}

.cyber-btn .btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple-light), transparent);
  box-shadow: 0 0 8px var(--cyber-purple);
  transition: all 0.3s ease;
}

.cyber-btn:hover .btn-glow {
  box-shadow: 0 0 15px var(--cyber-purple);
}

.cyber-btn:hover {
  border-color: var(--cyber-purple-light);
  text-shadow: 0 0 8px rgba(147, 51, 234, 0.5);
}

.buy-now-btn {
  background-color: var(--cyber-purple-dark);
}

.buy-now-btn:hover {
  background-color: var(--cyber-purple);
}

.cyber-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: var(--cyber-text-darker);
}

.cyber-product-details {
  margin-bottom: 40px;
}

.cyber-section-title {
  color: var(--cyber-text);
  font-size: 20px;
  font-weight: 600;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  margin-bottom: 18px;
  letter-spacing: 1px;
}

.detail-line {
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-purple-dark), transparent);
  margin-bottom: 18px;
}

.cyber-text {
  color: var(--cyber-text-darker);
  line-height: 1.7;
  margin-bottom: 16px;
  font-family: 'Rajdhani', sans-serif;
}

.cyber-delivery-info {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  padding: 20px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-delivery-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  box-shadow: 0 0 15px var(--cyber-purple);
  z-index: 2;
}

.cyber-delivery-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.cyber-delivery-option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.icon-container {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(139, 92, 246, 0.05);
  border-radius: 50%;
  position: relative;
}

.icon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 1px solid var(--cyber-purple-dark);
  opacity: 0.5;
  animation: pulseBorder 2s infinite;
}

@keyframes pulseBorder {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
}

.option-text {
  color: var(--cyber-text-darker);
  font-size: 14px;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Loading state */
.cyber-loading {
  text-align: center;
  padding: 80px;
  color: var(--cyber-text-darker);
  font-size: 16px;
  position: relative;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border: 3px solid rgba(139, 92, 246, 0.1);
  border-top: 3px solid var(--cyber-purple-light);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.loading-text {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.loading-text .dot-1, .loading-text .dot-2, .loading-text .dot-3 {
  animation: fadeDots 1.5s infinite;
  opacity: 0;
}

.loading-text .dot-2 {
  animation-delay: 0.5s;
}

.loading-text .dot-3 {
  animation-delay: 1s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeDots {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

/* Related Products Section */
.cyber-related-products {
  margin-top: 80px;
  position: relative;
}

.cyber-section-header {
  position: relative;
  margin-bottom: 40px;
  text-align: center;
}

.glitch-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.cyber-section-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--cyber-text);
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

.cyber-related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .cyber-product-container {
    gap: 40px;
  }

  .cyber-related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .cyber-product-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cyber-related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cyber-action-buttons {
    flex-direction: column;
  }
  
  .cyber-product-title {
    font-size: 28px;
  }
  
  .current-price {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .cyber-product-detail {
    padding: 24px 0;
  }
  
  .cyber-related-products-grid {
    grid-template-columns: 1fr;
  }
  
  .cyber-product-title {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 24px;
  }
}
</style>

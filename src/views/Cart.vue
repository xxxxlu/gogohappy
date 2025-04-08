<template>
  <div class="cyber-cart-page cyber-grid-bg">
    <div class="container">
      <div class="cyber-page-header">
        <h1>NEURAL_CART::V1.0</h1>
        <div class="cyber-breadcrumbs">
          <router-link to="/">HOME</router-link> <span>//</span>
          <span>CART_INTERFACE</span>
        </div>
      </div>

      <div class="cyber-cart-content" v-if="cart.length > 0">
        <div class="cyber-cart-items">
          <div class="cyber-cart-item" v-for="item in cart" :key="item.id">
            <div class="cyber-item-image">
              <div class="image-container">
                <img
                  :src="item.image"
                  :alt="item.name"
                  @error="handleImageError"
                />
                <div class="image-glitch"></div>
                <div class="cyber-corner tl"></div>
                <div class="cyber-corner tr"></div>
                <div class="cyber-corner bl"></div>
                <div class="cyber-corner br"></div>
              </div>
            </div>
            <div class="cyber-item-details">
              <h3 class="cyber-item-title">
                <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
              </h3>
              <div class="cyber-item-price">
                <span class="currency">Rs.</span>
                <span class="current-price">{{ formatPrice(item.price) }}</span>
                <span class="original-price" v-if="item.originalPrice > item.price">
                  {{ formatPrice(item.originalPrice) }}
                </span>
              </div>
            </div>
            <div class="cyber-item-quantity">
              <div class="cyber-quantity-controls">
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1" class="cyber-qty-btn">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  :max="item.stock"
                  @change="updateQuantity(item.id, item.quantity)"
                  class="cyber-input"
                />
                <button @click="increaseQuantity(item.id)" :disabled="item.quantity >= item.stock" class="cyber-qty-btn">+</button>
              </div>
              <button class="cyber-remove-btn" @click="removeItem(item.id)">
                <span class="btn-text">DISCONNECT</span>
                <span class="btn-glitch"></span>
              </button>
            </div>
            <div class="cyber-item-total">
              <span class="currency">Rs.</span>
              <span class="total-value">{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>
        </div>

        <div class="cyber-cart-summary">
          <div class="summary-header">
            <h3 class="cyber-title">DATA_SUMMARY</h3>
            <div class="corner-decoration"></div>
          </div>
          
          <div class="summary-body">
            <div class="cyber-summary-row">
              <span class="row-label">SUBTOTAL</span>
              <span class="row-value">Rs. {{ formatPrice(cartTotal) }}</span>
            </div>
            
            <div class="cyber-summary-row">
              <span class="row-label">NEURAL_DELIVERY</span>
              <span class="row-value">Rs. {{ formatPrice(shippingFee) }}</span>
            </div>
            
            <div class="cyber-divider"></div>
            
            <div class="cyber-summary-row total">
              <span class="row-label">TOTAL_CREDITS</span>
              <span class="row-value">Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
            </div>
          </div>
          
          <button class="cyber-btn checkout-btn" @click="proceedToCheckout">
            <span class="btn-text">INITIATE_PAYMENT</span>
            <span class="btn-glow"></span>
          </button>
          
          <div class="cyber-continue-shopping">
            <router-link to="/products" class="cyber-link">CONTINUE_BROWSING</router-link>
          </div>
        </div>
      </div>

      <div class="cyber-empty-cart" v-else>
        <div class="cyber-empty-cart-content">
          <div class="hologram-container">
            <div class="hologram-ring"></div>
            <img src="https://cdn.pixabay.com/photo/2023/07/06/15/47/machine-8111071_1280.png" alt="Empty Neural Link" />
          </div>
          <div class="cyber-corner tl"></div>
          <div class="cyber-corner tr"></div>
          <div class="cyber-corner bl"></div>
          <div class="cyber-corner br"></div>
          <h2 class="cyber-title">NEURAL_LINK <span class="cyber-highlight">DISCONNECTED</span></h2>
          <p class="cyber-subtitle">No digital assets detected in your neural interface.</p>
          <router-link to="/products" class="cyber-btn">
            <span class="btn-text">CONNECT_TO_MARKET</span>
            <span class="btn-glow"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      shippingFee: 399
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity < item.stock) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity + 1 })
      }
    },
    decreaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity > 1) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity - 1 })
      }
    },
    updateQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id)
      if (item) {
        // Ensure quantity is valid
        let validQuantity = Math.max(1, Math.min(item.stock, quantity))
        this.$store.commit('updateCartItem', { id, quantity: validQuantity })
      }
    },
    removeItem(id) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.$store.commit('removeFromCart', id)
      }
    },
    proceedToCheckout() {
      this.$router.push('/checkout')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
@import '../assets/css/cyberpunk.css';

.cyber-cart-page {
  padding: 60px 0;
  background-color: var(--cyber-bg-dark);
  color: var(--cyber-text);
  min-height: 80vh;
}

/* 购物车内容区域布局 */
.cyber-cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 购物车商品列表 */
.cyber-cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 购物车商品项 */
.cyber-cart-item {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, 100% 0, 97% 100%, 3% 100%);
}

.cyber-cart-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  opacity: 0.7;
}

.cyber-cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.3);
  border-color: var(--cyber-purple);
}

/* 商品图片区域 */
.cyber-item-image {
  position: relative;
  height: 100px;
  overflow: hidden;
  background-color: rgba(9, 9, 11, 0.6);
  z-index: 2;
}

.cyber-item-image .image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.cyber-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: saturate(1.2) contrast(1.1);
}

.cyber-cart-item:hover .cyber-item-image img {
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

.cyber-cart-item:hover .image-glitch {
  opacity: 1;
}

/* 商品详情 */
.cyber-item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cyber-item-title {
  font-size: 16px;
  margin-bottom: 12px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
}

.cyber-item-title a {
  color: var(--cyber-text);
  text-decoration: none;
  transition: all 0.3s ease;
}

.cyber-item-title a:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 5px var(--cyber-purple);
}

.cyber-item-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.cyber-item-price .currency {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  color: var(--cyber-pink);
}

.cyber-item-price .current-price {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--cyber-purple-light);
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
}

.cyber-item-price .original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: rgba(226, 232, 240, 0.6);
  position: relative;
}

/* 数量控制区域 */
.cyber-item-quantity {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.cyber-quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--cyber-purple-dark);
  background-color: rgba(9, 9, 11, 0.4);
  padding: 2px;
}

.cyber-qty-btn {
  background-color: var(--cyber-purple-dark);
  color: var(--cyber-text);
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cyber-qty-btn:hover {
  background-color: var(--cyber-purple);
  box-shadow: 0 0 8px rgba(147, 51, 234, 0.7);
}

.cyber-qty-btn:disabled {
  background-color: rgba(39, 39, 42, 0.8);
  color: rgba(226, 232, 240, 0.5);
  cursor: not-allowed;
  box-shadow: none;
}

.cyber-quantity-controls .cyber-input {
  width: 40px;
  height: 28px;
  border: none;
  text-align: center;
  font-size: 14px;
  padding: 0;
  background-color: transparent;
  margin: 0 2px;
  clip-path: none;
}

.cyber-remove-btn {
  background: rgba(236, 72, 153, 0.1);
  border: 1px solid var(--cyber-pink);
  color: var(--cyber-pink);
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  transition: all 0.3s ease;
  padding: 5px 8px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  display: block;
  text-align: center;
  width: 100%;
}

.cyber-remove-btn:hover {
  background-color: rgba(236, 72, 153, 0.2);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
}

.cyber-remove-btn .btn-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(236, 72, 153, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-remove-btn:hover .btn-glitch {
  opacity: 1;
}

/* 商品总价 */
.cyber-item-total {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--cyber-purple-light);
  align-self: center;
}

.cyber-item-total .currency {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  color: var(--cyber-pink);
  margin-right: 2px;
}

.cyber-item-total .total-value {
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.cart-items {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8fafc;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.05);
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-title a {
  color: #1e293b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-title a:hover {
  color: #3b82f6;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-weight: 600;
  color: #3b82f6;
  font-size: 18px;
}

.original-price {
  font-size: 15px;
  text-decoration: line-through;
  color: #94a3b8;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f8fafc;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #f1f5f9;
  color: #3b82f6;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  height: 36px;
  border: none;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  background-color: #ffffff;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #dc2626;
}

.item-total {
  font-weight: 600;
  font-size: 18px;
  color: #1e293b;
}

.cart-summary {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.cart-summary h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #475569;
  font-size: 15px;
}

.summary-row.total {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 20px;
  color: #1e293b;
}

.checkout-btn {
  width: 100%;
  padding: 16px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0 16px;
  transition: all 0.2s ease;
}

.checkout-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.continue-shopping {
  text-align: center;
}

.continue-shopping a {
  color: #64748b;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.continue-shopping a:hover {
  color: #3b82f6;
}

.empty-cart {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 60px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.empty-cart-content img {
  width: 120px;
  height: 120px;
  opacity: 0.4;
  margin-bottom: 24px;
  transition: opacity 0.2s ease;
}

.empty-cart-content:hover img {
  opacity: 0.6;
}

.empty-cart-content h2 {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.empty-cart-content p {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 16px 32px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.continue-shopping-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

@media (max-width: 1200px) {
  .cart-content {
    grid-template-columns: 1fr 350px;
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      "image details"
      "image quantity"
      "total total";
    gap: 16px;
    padding: 20px;
  }

  .item-image {
    grid-area: image;
  }

  .item-image img {
    width: 100px;
    height: 100px;
  }

  .item-details {
    grid-area: details;
  }

  .item-quantity {
    grid-area: quantity;
  }

  .item-total {
    grid-area: total;
    text-align: right;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e2e8f0;
  }
}

@media (max-width: 480px) {
  .cart-page {
    padding: 24px 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .cart-item {
    padding: 16px;
  }

  .item-title {
    font-size: 15px;
  }

  .current-price {
    font-size: 16px;
  }

  .quantity-controls {
    width: 100%;
    margin-bottom: 8px;
  }

  .remove-btn {
    width: 100%;
    text-align: center;
    padding: 8px 0;
    background-color: #fef2f2;
    border-radius: 6px;
    color: #ef4444;
  }

  .empty-cart {
    padding: 40px 20px;
  }

  .empty-cart-content h2 {
    font-size: 24px;
  }

  .empty-cart-content p {
    font-size: 15px;
  }
}

/* 订单摘要区域 */
.cyber-cart-summary {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  padding: 24px;
  position: relative;
  overflow: hidden;
  height: fit-content;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-cart-summary::before {
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

.summary-header {
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(147, 51, 234, 0.3);
}

.corner-decoration {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-top: 2px solid var(--cyber-purple);
  border-right: 2px solid var(--cyber-purple);
}

.summary-body {
  margin-bottom: 25px;
}

.cyber-summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-family: 'Rajdhani', sans-serif;
}

.cyber-summary-row .row-label {
  color: var(--cyber-text-darker);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cyber-summary-row .row-value {
  font-family: 'Orbitron', sans-serif;
  color: var(--cyber-text);
  font-weight: 600;
}

.cyber-summary-row.total {
  margin-top: 20px;
  font-weight: 700;
}

.cyber-summary-row.total .row-label {
  color: var(--cyber-purple-light);
  font-size: 16px;
}

.cyber-summary-row.total .row-value {
  color: var(--cyber-purple-light);
  font-size: 20px;
  text-shadow: 0 0 8px rgba(147, 51, 234, 0.5);
}

.checkout-btn {
  width: 100%;
  margin: 20px 0;
  padding: 14px 20px;
  font-size: 16px;
}

.cyber-continue-shopping {
  text-align: center;
  margin-top: 15px;
}

.cyber-link {
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text-darker);
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.cyber-link::after {
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

.cyber-link:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.3);
}

.cyber-link:hover::after {
  transform: scaleX(1);
}

/* 空购物车区域 */
.cyber-empty-cart {
  animation: fadeIn 0.5s ease-out;
}

.cyber-empty-cart-content {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-purple-dark);
  padding: 50px 30px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-empty-cart-content::before {
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

.hologram-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 25px;
}

.hologram-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid var(--cyber-purple-light);
  border-radius: 50%;
  animation: hologramPulse 2s infinite;
  z-index: 1;
}

@keyframes hologramPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4), inset 0 0 0 0 rgba(147, 51, 234, 0.4);
    transform: scale(0.9);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(147, 51, 234, 0.4), inset 0 0 10px 2px rgba(147, 51, 234, 0.4);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4), inset 0 0 0 0 rgba(147, 51, 234, 0.4);
    transform: scale(0.9);
  }
}

.hologram-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  opacity: 0.8;
  filter: brightness(1.5) hue-rotate(-20deg);
  animation: floatImage 3s ease-in-out infinite;
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cyber-empty-cart-content .cyber-subtitle {
  margin-bottom: 30px;
  color: var(--cyber-text-darker);
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .cyber-cart-content {
    grid-template-columns: 1fr;
  }
  
  .cyber-cart-summary {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .cyber-cart-item {
    grid-template-columns: 1fr;
    padding: 16px;
  }
  
  .cyber-item-image {
    height: 160px;
    margin-bottom: 15px;
  }
  
  .cyber-item-quantity {
    margin: 15px 0;
  }
  
  .cyber-item-total {
    justify-content: flex-start;
    margin-top: 10px;
  }
}
</style>

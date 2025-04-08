<template>
  <div class="cyber-checkout-page cyber-grid-bg">
    <div class="container">
      <div class="cyber-page-header">
        <h1 class="cyber-title">NEURAL_CHECKOUT<span class="blinking-cursor">_</span></h1>
        <div class="cyber-breadcrumbs">
          <router-link to="/">HOME</router-link>
          <span class="separator">//</span>
          <router-link to="/cart">CART_INTERFACE</router-link>
          <span class="separator">//</span>
          <span class="current">CHECKOUT_TERMINAL</span>
        </div>
      </div>

      <div class="cyber-checkout-content" v-if="cart.length > 0">
        <div class="cyber-customer-details cyber-panel">
          <h2 class="cyber-section-title">USER_BIOMETRICS::</h2>
          <div class="section-line"></div>
          <form @submit.prevent="proceedToPayment" class="cyber-form">
            <div class="cyber-form-group">
              <label for="fullName" class="cyber-label">FULL_IDENTITY *</label>
              <div class="cyber-input-wrapper">
                <input
                  type="text"
                  id="fullName"
                  class="cyber-input"
                  v-model="customerInfo.fullName"
                  required
                />
                <div class="input-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="email" class="cyber-label">NEURAL_MAIL *</label>
              <div class="cyber-input-wrapper">
                <input
                  type="email"
                  id="email"
                  class="cyber-input"
                  v-model="customerInfo.email"
                  required
                />
                <div class="input-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="phone" class="cyber-label">COM_LINK *</label>
              <div class="cyber-input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  class="cyber-input"
                  v-model="customerInfo.phone"
                  required
                />
                <div class="input-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="address" class="cyber-label">DROP_POINT_COORDINATES *</label>
              <div class="cyber-textarea-wrapper">
                <textarea
                  id="address"
                  class="cyber-textarea"
                  v-model="customerInfo.address"
                  required
                ></textarea>
                <div class="textarea-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="city" class="cyber-label">URBAN_SECTOR *</label>
              <div class="cyber-input-wrapper">
                <input
                  type="text"
                  id="city"
                  class="cyber-input"
                  v-model="customerInfo.city"
                  required
                />
                <div class="input-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="postalCode" class="cyber-label">GRID_REFERENCE</label>
              <div class="cyber-input-wrapper">
                <input
                  type="text"
                  id="postalCode"
                  class="cyber-input"
                  v-model="customerInfo.postalCode"
                />
                <div class="input-edge"></div>
              </div>
            </div>

            <div class="cyber-form-group">
              <label for="notes" class="cyber-label">NEURAL_TRANSMISSION [OPT]</label>
              <div class="cyber-textarea-wrapper">
                <textarea
                  id="notes"
                  class="cyber-textarea"
                  v-model="customerInfo.notes"
                ></textarea>
                <div class="textarea-edge"></div>
              </div>
            </div>

            <h2 class="cyber-section-title">CREDIT_TRANSFER_PROTOCOL::</h2>
            <div class="section-line"></div>
            <div class="cyber-payment-methods">
              <div class="cyber-payment-method">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="cod"
                  v-model="customerInfo.paymentMethod"
                  class="cyber-radio"
                />
                <label for="cashOnDelivery" class="cyber-radio-label"></label>
                <div class="payment-image-container">
                  <img src="../assets/easypaisa.png" alt="" class="payment-image">
                  <div class="image-overlay"></div>
                  <div class="cyber-corner tl"></div>
                  <div class="cyber-corner tr"></div>
                  <div class="cyber-corner bl"></div>
                  <div class="cyber-corner br"></div>
                </div>
              </div>
              <div class="cyber-payment-method">
                <input
                  type="radio"
                  id="bankTransfer"
                  value="bank"
                  v-model="customerInfo.paymentMethod"
                  class="cyber-radio"
                />
                <label for="bankTransfer" class="cyber-radio-label"></label>
                <div class="payment-image-container">
                  <img src="../assets/Frame.png" alt="" class="payment-image">
                  <div class="image-overlay"></div>
                  <div class="cyber-corner tl"></div>
                  <div class="cyber-corner tr"></div>
                  <div class="cyber-corner bl"></div>
                  <div class="cyber-corner br"></div>
                </div>
              </div>
            </div>

            <div class="cyber-form-actions">
              <router-link to="/cart" class="cyber-back-btn">
                <span class="btn-text">« RETURN_TO_CART</span>
              </router-link>
              <button type="submit" class="cyber-btn place-order-btn">
                <span class="btn-text">EXECUTE_ORDER</span>
                <span class="btn-glow"></span>
              </button>
            </div>
          </form>
        </div>

        <div class="cyber-order-summary cyber-panel">
          <h2 class="cyber-section-title">ORDER_MANIFEST::</h2>
          <div class="section-line"></div>
          <div class="cyber-summary-items">
            <div class="cyber-summary-item" v-for="item in cart" :key="item.id">
              <div class="cyber-item-image">
                <img
                  :src="item.image"
                  :alt="item.name"
                  @error="handleImageError"
                />
                <div class="image-frame"></div>
              </div>
              <div class="cyber-item-details">
                <h3 class="cyber-item-name">{{ item.name }}</h3>
                <div class="cyber-item-price-qty">
                  <span>Rs. {{ formatPrice(item.price) }} <span class="multiply-sign">×</span> {{ item.quantity }}</span>
                </div>
              </div>
              <div class="cyber-item-total">
                Rs. {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="cyber-summary-totals">
            <div class="cyber-summary-row">
              <span class="row-label">SUBTOTAL::</span>
              <span class="row-value">Rs. {{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="cyber-summary-row">
              <span class="row-label">TRANSPORT_FEE::</span>
              <span class="row-value">Rs. {{ formatPrice(shippingFee) }}</span>
            </div>
            <div class="cyber-summary-row total">
              <span class="row-label">TOTAL_CREDITS::</span>
              <span class="row-value highlight">Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cyber-empty-checkout" v-else>
        <div class="cyber-empty-checkout-content">
          <div class="error-icon"></div>
          <h2 class="cyber-title">ERROR_404::CART_EMPTY</h2>
          <p class="error-message">DATA_REQUIRED::ADD_PRODUCTS_BEFORE_PROCEEDING</p>
          <router-link to="/products" class="cyber-btn continue-shopping-btn">
            <span class="btn-text">BROWSE_INVENTORY</span>
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
  name: 'Checkout',
  data() {
    return {
      shippingFee: 399,
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'cod'
      }
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
    proceedToPayment() {
      // Save customer info in session/local storage
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo))
      localStorage.setItem('orderTotal', JSON.stringify({
        subtotal: this.cartTotal,
        shipping: this.shippingFee,
        total: this.cartTotal + this.shippingFee
      }))

      // In a real app, you would send this data to your server
      // For now, just redirect to success page
      this.$router.push('/checkout-success')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  },
  created() {
    // Redirect if cart is empty
    if (this.cart.length === 0) {
      this.$router.push('/cart')
    }

    // If returning from payment, don't clear the form
    const savedInfo = localStorage.getItem('customerInfo')
    if (savedInfo) {
      this.customerInfo = JSON.parse(savedInfo)
    }
  }
}
</script>

<style>
@import url('../assets/css/cyberpunk.css');

.cyber-checkout-page {
  min-height: 100vh;
  padding: 40px 0;
  background-color: var(--cyber-bg-base);
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
  background-image: linear-gradient(var(--cyber-green-dark) 1px, transparent 1px),
                  linear-gradient(90deg, var(--cyber-green-dark) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0;
  opacity: 0.03;
  z-index: -1;
}

.cyber-page-header {
  margin-bottom: 30px;
  position: relative;
}

.cyber-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--cyber-text);
  margin-bottom: 18px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
  color: var(--cyber-green-light);
  margin-left: 5px;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.cyber-breadcrumbs {
  margin-bottom: 20px;
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
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.cyber-breadcrumbs a:hover {
  color: var(--cyber-green-light);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.cyber-breadcrumbs a:hover::after {
  transform: scaleX(1);
}

.cyber-breadcrumbs .separator {
  color: var(--cyber-green-dark);
  opacity: 0.7;
}

.cyber-breadcrumbs .current {
  color: var(--cyber-green-light);
  font-weight: 500;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.cyber-checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

.cyber-panel {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  padding: 25px;
  position: relative;
  overflow: hidden;
}

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
  z-index: 10;
}

.cyber-section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--cyber-green-light);
  margin-bottom: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.section-line {
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-green-dark), transparent);
  margin-bottom: 20px;
  opacity: 0.5;
}

.cyber-form-group {
  margin-bottom: 20px;
}

.cyber-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text);
  letter-spacing: 1px;
  font-size: 14px;
}

.cyber-input-wrapper, .cyber-textarea-wrapper {
  position: relative;
}

.cyber-input, .cyber-textarea {
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(22, 163, 74, 0.05);
  border: 1px solid var(--cyber-green-dark);
  color: var(--cyber-text);
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
}

.cyber-input:focus, .cyber-textarea:focus {
  outline: none;
  border-color: var(--cyber-green-light);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.cyber-textarea {
  height: 80px;
  resize: vertical;
}

.input-edge, .textarea-edge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--cyber-green-light);
  border-bottom: 2px solid var(--cyber-green-light);
  opacity: 0.7;
  pointer-events: none;
}

.cyber-payment-methods {
  margin-bottom: 30px;
}

.cyber-payment-method {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.cyber-radio {
  position: absolute;
  opacity: 0;
}

.cyber-radio + .cyber-radio-label {
  position: relative;
  cursor: pointer;
  padding-left: 30px;
  margin-right: 15px;
}

.cyber-radio + .cyber-radio-label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid var(--cyber-green-dark);
  background: rgba(22, 163, 74, 0.05);
}

.cyber-radio:checked + .cyber-radio-label:before {
  background: var(--cyber-green-dark);
}

.cyber-radio:checked + .cyber-radio-label:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 5px;
  width: 8px;
  height: 8px;
  background: var(--cyber-green-light);
  box-shadow: 0 0 10px var(--cyber-green-light);
}

.payment-image-container {
  position: relative;
  width: 120px;
  height: 90px;
  margin-left: 15px;
  border: 1px solid var(--cyber-green-dark);
  background: rgba(22, 163, 74, 0.05);
  overflow: hidden;
}

.payment-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(22, 163, 74, 0.2), transparent);
  z-index: 3;
}

.cyber-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: var(--cyber-green-light);
  z-index: 4;
}

.tl {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
}

.tr {
  top: 0;
  right: 0;
  border-top: 2px solid;
  border-right: 2px solid;
}

.bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.cyber-form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.cyber-back-btn {
  color: var(--cyber-text-darker);
  text-decoration: none;
  font-family: 'Rajdhani', sans-serif;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.cyber-back-btn:hover {
  color: var(--cyber-green-light);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.cyber-back-btn::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-green-light), transparent);
  transition: all 0.3s ease;
}

.cyber-back-btn:hover::after {
  width: 120%;
  opacity: 0.7;
}

.place-order-btn {
  position: relative;
  overflow: hidden;
  padding: 12px 30px;
  cursor: pointer;
}

.place-order-btn:hover .btn-text {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

.place-order-btn:hover .btn-glow {
  opacity: 1;
}

.place-order-btn .btn-text {
  position: relative;
  z-index: 3;
  color: var(--cyber-text-light);
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.place-order-btn .btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), transparent);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-summary-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  scrollbar-width: thin;
  scrollbar-color: var(--cyber-green-dark) var(--cyber-bg-light);
}

.cyber-summary-items::-webkit-scrollbar {
  width: 6px;
}

.cyber-summary-items::-webkit-scrollbar-track {
  background: var(--cyber-bg-light);
}

.cyber-summary-items::-webkit-scrollbar-thumb {
  background-color: var(--cyber-green-dark);
  border-radius: 3px;
}

.cyber-summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(22, 163, 74, 0.2);
  align-items: center;
}

.cyber-summary-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.cyber-item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  position: relative;
  border: 1px solid var(--cyber-green-dark);
}

.cyber-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.image-frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(34, 197, 94, 0.3);
  pointer-events: none;
  z-index: 2;
}

.cyber-item-details {
  flex: 1;
}

.cyber-item-name {
  font-size: 14px;
  margin-bottom: 5px;
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text);
}

.cyber-item-price-qty {
  font-size: 13px;
  color: var(--cyber-text-darker);
  font-family: 'Rajdhani', sans-serif;
}

.multiply-sign {
  color: var(--cyber-green);
  margin: 0 4px;
}

.cyber-item-total {
  font-weight: bold;
  margin-left: 15px;
  color: var(--cyber-green-light);
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
}

.cyber-summary-totals {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(22, 163, 74, 0.2);
}

.cyber-summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-family: 'Rajdhani', sans-serif;
}

.row-label {
  color: var(--cyber-text-darker);
  letter-spacing: 1px;
}

.row-value {
  color: var(--cyber-text);
  font-weight: 600;
}

.cyber-summary-row.total {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(22, 163, 74, 0.2);
  font-size: 18px;
}

.row-value.highlight {
  color: var(--cyber-green-light);
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
}

.cyber-empty-checkout {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  padding: 60px 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cyber-empty-checkout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(var(--cyber-green-dark) 1px, transparent 1px),
                  linear-gradient(90deg, var(--cyber-green-dark) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.05;
  z-index: 0;
}

.cyber-empty-checkout-content {
  position: relative;
  z-index: 1;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  border: 2px solid var(--cyber-green-dark);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-icon::before {
  content: '!';
  font-family: 'Orbitron', sans-serif;
  font-size: 50px;
  font-weight: 700;
  color: var(--cyber-green-light);
}

.error-icon::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 1px solid var(--cyber-green-light);
  opacity: 0.5;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
}

.cyber-title {
  font-size: 28px;
  margin-bottom: 15px;
  font-family: 'Orbitron', sans-serif;
  color: var(--cyber-text);
  letter-spacing: 1px;
}

.error-message {
  color: var(--cyber-text-darker);
  margin-bottom: 35px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 40px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.continue-shopping-btn:hover .btn-text {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

.continue-shopping-btn:hover .btn-glow {
  opacity: 1;
}

@media (max-width: 992px) {
  .cyber-checkout-content {
    grid-template-columns: 1fr;
  }

  .cyber-order-summary {
    order: -1;
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .cyber-form-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .cyber-back-btn {
    order: 2;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .cyber-payment-method {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .payment-image-container {
    margin-left: 30px;
    margin-top: 10px;
  }
}</style>

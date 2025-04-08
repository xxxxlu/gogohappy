<template>
  <div class="checkout-success">
    <div class="container">
      <div class="success-card cyber-panel">
        <div class="success-icon">
          <div class="checkmark-circle">
            <div class="checkmark"></div>
          </div>
        </div>
        <h1>NEURAL_TRANSFER_COMPLETE</h1>
        <p class="order-number">ORDER_ID::{{ orderId }}</p>

        <div class="success-message">
          <p>DATA_TRANSACTION successfully processed. Your order is now live on the grid.</p>
          <p>NEURAL_MESSAGE transmitted to <strong>{{ customerInfo.email }}</strong>.</p>
        </div>

        <div class="order-details">
          <h2>TRANSACTION_DATA</h2>

          <div class="details-section">
            <h3>DELIVERY_COORDINATES</h3>
            <div class="info-item">
              <span class="label">IDENTITY:</span>
              <span class="value">{{ customerInfo.fullName }}</span>
            </div>
            <div class="info-item">
              <span class="label">LOCATION:</span>
              <span class="value">{{ customerInfo.address }}</span>
            </div>
            <div class="info-item">
              <span class="label">URBAN_SECTOR:</span>
              <span class="value">{{ customerInfo.city }}</span>
            </div>
            <div class="info-item" v-if="customerInfo.postalCode">
              <span class="label">GRID_CODE:</span>
              <span class="value">{{ customerInfo.postalCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">COM_LINK:</span>
              <span class="value">{{ customerInfo.phone }}</span>
            </div>
          </div>

          <div class="details-section">
            <h3>CREDIT_PROTOCOL</h3>
            <div class="info-item">
              <span class="label">TRANSFER_TYPE:</span>
              <span class="value">{{ paymentMethod }}</span>
            </div>
          </div>

          <div class="details-section">
            <h3>ITEMS_MANIFEST</h3>
            <div class="summary-items">
              <div class="summary-item" v-for="item in cart" :key="item.id">
                <span class="item-name">{{ item.name }} × {{ item.quantity }}</span>
                <span class="item-price">Rs. {{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="summary-totals">
              <div class="total-row">
                <span>BASE_COST:</span>
                <span>Rs. {{ formatPrice(orderTotal.subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>DELIVERY_FEE:</span>
                <span>Rs. {{ formatPrice(orderTotal.shipping) }}</span>
              </div>
              <div class="total-row grand-total">
                <span>FINAL_COST:</span>
                <span>Rs. {{ formatPrice(orderTotal.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <router-link to="/" class="continue-btn cyber-btn">
            <span class="btn-text">CONTINUE_BROWSING</span>
            <span class="btn-glow"></span>
          </router-link>
          <button class="print-btn" @click="printOrder">
            <span class="btn-text">EXPORT_RECEIPT</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      orderId: this.generateOrderId(),
      customerInfo: {},
      orderTotal: {
        subtotal: 0,
        shipping: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    paymentMethod() {
      const methods = {
        'cod': 'Cash on Delivery',
        'bank': 'Bank Transfer'
      }
      return methods[this.customerInfo.paymentMethod] || this.customerInfo.paymentMethod
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    generateOrderId() {
      // Generate a random order ID
      const prefix = 'SYM'
      const timestamp = new Date().getTime().toString().slice(-6)
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      return `${prefix}${timestamp}${random}`
    },
    printOrder() {
      window.print()
    }
  },
  created() {
    // Retrieve customer information and order details from local storage
    const customerInfoStr = localStorage.getItem('customerInfo')
    const orderTotalStr = localStorage.getItem('orderTotal')

    if (customerInfoStr) {
      this.customerInfo = JSON.parse(customerInfoStr)
    } else {
      // Redirect if no customer info is found
      this.$router.push('/cart')
    }

    if (orderTotalStr) {
      this.orderTotal = JSON.parse(orderTotalStr)
    }

    // Clear the cart after successful checkout
    this.$store.commit('clearCart')
  }
}
</script>

<style>
@import url('../assets/css/cyberpunk.css');

.checkout-success {
  padding: 60px 0;
  background-color: var(--cyber-bg-base);
  position: relative;
}

.checkout-success::before {
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
  z-index: 0;
}

.success-card {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  padding: 48px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 30px rgba(22, 163, 74, 0.1);
}

.success-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  z-index: 10;
}

.success-icon {
  text-align: center;
  margin-bottom: 36px;
  position: relative;
}

.checkmark-circle {
  width: 90px;
  height: 90px;
  background-color: rgba(22, 163, 74, 0.1);
  border: 2px solid var(--cyber-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.checkmark-circle::after {
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

.checkmark {
  width: 40px;
  height: 20px;
  border-left: 5px solid var(--cyber-green-light);
  border-bottom: 5px solid var(--cyber-green-light);
  transform: rotate(-45deg);
  box-shadow: 0 0 10px var(--cyber-green-light);
}

h1 {
  text-align: center;
  color: var(--cyber-text);
  font-size: 36px;
  margin-bottom: 20px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.order-number {
  text-align: center;
  font-size: 18px;
  color: var(--cyber-green-light);
  margin-bottom: 36px;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.success-message {
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
  color: var(--cyber-text-darker);
  font-family: 'Rajdhani', sans-serif;
  padding: 20px;
  border: 1px solid rgba(22, 163, 74, 0.2);
  position: relative;
}

.success-message::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-green-light), transparent);
}

.success-message::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light));
}

.order-details {
  margin-bottom: 40px;
}

.order-details h2 {
  font-size: 28px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(22, 163, 74, 0.2);
  color: var(--cyber-green);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.details-section {
  margin-bottom: 36px;
  position: relative;
}

.details-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, var(--cyber-green-dark), transparent);
  opacity: 0.5;
}

.details-section h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--cyber-green);
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding-left: 15px;
  position: relative;
}

.details-section h3::before {
  content: '//';
  position: absolute;
  left: 0;
  color: var(--cyber-green-dark);
  opacity: 0.7;
}

.info-item {
  display: flex;
  margin-bottom: 14px;
  padding-left: 15px;
}

.label {
  font-weight: 600;
  width: 160px;
  flex-shrink: 0;
  color: var(--cyber-text-darker);
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.value {
  color: var(--cyber-text);
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 0.5px;
}

.summary-items {
  margin-bottom: 20px;
  padding-left: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(22, 163, 74, 0.1);
  font-family: 'Rajdhani', sans-serif;
}

.summary-totals {
  padding-top: 20px;
  padding-left: 15px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  font-family: 'Rajdhani', sans-serif;
}

.grand-total {
  font-size: 22px;
  font-weight: 700;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(22, 163, 74, 0.2);
  color: var(--cyber-green-light);
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.2);
  letter-spacing: 0.5px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.continue-btn, .print-btn {
  position: relative;
  padding: 14px 30px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
}

.continue-btn {
  background-color: var(--cyber-green);
  color: var(--cyber-text-light);
  border: none;
}

.print-btn {
  background-color: transparent;
  color: var(--cyber-text);
  border: 1px solid var(--cyber-green-dark);
}

.continue-btn::before, .print-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
  transition: left 0.5s ease;
}

.continue-btn:hover::before, .print-btn:hover::before {
  left: 100%;
}

.continue-btn:hover {
  background-color: var(--cyber-green-dark);
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
}

.print-btn:hover {
  border-color: var(--cyber-green-light);
  color: var(--cyber-green-light);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
}

@media (max-width: 768px) {
  .success-card {
    padding: 30px 20px;
    margin: 0 15px;
  }

  h1 {
    font-size: 28px;
  }

  .order-number {
    font-size: 16px;
  }

  .info-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 6px;
  }

  .actions {
    flex-direction: column;
    gap: 16px;
  }

  .continue-btn, .print-btn {
    width: 100%;
    text-align: center;
  }
  
  .details-section h3 {
    font-size: 18px;
  }
  
  .grand-total {
    font-size: 20px;
  }
}</style>

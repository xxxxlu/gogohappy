<template>
  <div id="app" class="cyberpunk-theme">
    <div class="neon-grid-overlay"></div>
    <header class="cyber-header">
      <div class="header-top">
        <div class="container cyber-container">
          <div class="logo">
            <router-link to="/" class="cyber-logo">
              <span class="logo-text">GOGO<span class="highlight">HAPPY</span></span>
            </router-link>
          </div>
          <div class="header-actions">
            <div class="account">
              <div class="cyber-btn-small" v-if="username">
                <router-link to="/account" class="glitch-text">{{ username }}</router-link>
              </div>
              <router-link v-else to="/account" class="cyber-btn-small">
                <span class="glitch-text">CONNECT</span>
              </router-link>
            </div>
            <div class="cart">
              <router-link to="/cart" class="cart-icon-cyber">
                <i class="cyber-icon">🛒</i>
                <span class="cart-count">{{ cartCount }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav class="main-nav cyber-nav">
        <div class="container">
          <div class="nav-glitch-line"></div>
          <ul class="nav-items">
            <li>
              <router-link to="/" class="nav-link">HOME</router-link>
            </li>
            <li>
              <router-link to="/products" class="nav-link">PRODUCTS</router-link>
            </li>
            <li>
              <router-link to="/contact" class="nav-link">CONTACT</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="cyber-main">
      <router-view />
    </main>

    <footer class="cyber-footer">
      <div class="cyber-grid-line"></div>
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column cyber-panel">
            <h3 class="cyber-heading">NEURAL_LINK</h3>
            <ul>
              <li><a href="#" class="cyber-link">Contact Us</a></li>
              <li><a href="#" class="cyber-link">Support Portal</a></li>
              <li><a href="#" class="cyber-link">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-column cyber-panel">
            <h3 class="cyber-heading">DATA_PORT</h3>
            <ul>
              <li><a href="#" class="cyber-link">gogohappy@gogohappy.shop</a></li>
            </ul>
          </div>
          <div class="footer-column cyber-panel">
            <h3 class="cyber-heading">CREDIT_TRANSFER</h3>
            <div class="payment-icons">
              <img src="./assets/easypaisa.png" alt="Payment easypaisa" class="cyber-payment" />
              <img src="./assets/Frame.png" alt="Payment Frame" class="cyber-payment" />
            </div>
          </div>
        </div>
        <div class="copyright cyber-copyright">
          <div class="scanner-line"></div>
          <p>
            Copyright <span class="cyber-year">2025</span> | Powered by Data Network Solutions (SMC-Private) Limited
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
  computed: {
    ...mapState(['categories']),
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
/* Cyberpunk Theme Base Styles */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

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
  --cyber-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Rajdhani', sans-serif;
  line-height: 1.6;
  color: var(--cyber-text);
  background-color: var(--cyber-bg-dark);
  overflow-x: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

a {
  text-decoration: none;
  color: var(--cyber-text);
  transition: all 0.3s ease;
}

ul {
  list-style: none;
}

/* Cyberpunk Base Elements */
.cyberpunk-theme {
  position: relative;
  background-color: var(--cyber-bg-dark);
  color: var(--cyber-text);
  min-height: 100vh;
  overflow: hidden;
}

.neon-grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--cyber-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--cyber-grid) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.3;
}

.cyber-container {
  position: relative;
}

/* Neon Elements & Effects */
.glitch-text {
  position: relative;
  display: inline-block;
  color: var(--cyber-text);
  text-shadow: 0 0 2px var(--cyber-purple), 0 0 10px var(--cyber-purple);
}

.cyber-btn-small {
  position: relative;
  padding: 8px 16px;
  background: var(--cyber-bg-light);
  color: var(--cyber-purple-light);
  border: 1px solid var(--cyber-purple);
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 0 5px var(--cyber-purple);
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-btn-small:hover {
  background: var(--cyber-purple-dark);
  color: white;
  box-shadow: 0 0 10px var(--cyber-purple);
}

/* Header Styles */
.cyber-header {
  background-color: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--cyber-purple);
  position: relative;
  z-index: 100;
}

.header-top {
  padding: 15px 0;
}

.header-top .container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
}

.cyber-logo {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 24px;
  color: var(--cyber-text);
  letter-spacing: 1px;
  position: relative;
  text-shadow: 0 0 10px var(--cyber-purple);
}

.logo-text {
  position: relative;
}

.logo-text .highlight {
  color: var(--cyber-purple-light);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.cart-icon-cyber {
  position: relative;
  display: flex;
  align-items: center;
}

.cyber-icon {
  font-size: 24px;
  color: var(--cyber-purple-light);
  text-shadow: 0 0 10px var(--cyber-purple);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--cyber-pink);
  color: white;
  border-radius: 4px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 0 6px;
  box-shadow: 0 0 8px var(--cyber-pink);
}

/* Navigation Styles */
.cyber-nav {
  background-color: rgba(24, 24, 27, 0.8);
  padding: 10px 0;
  position: relative;
}

.nav-glitch-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  z-index: 1;
}

.nav-items {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.nav-link {
  font-family: 'Orbitron', sans-serif;
  color: var(--cyber-text);
  font-weight: 500;
  position: relative;
  padding: 10px 5px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
}

.nav-link:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 8px var(--cyber-purple);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--cyber-purple);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--cyber-purple);
}

.nav-link:hover::after {
  width: 100%;
}

/* Main Content Styles */
.cyber-main {
  min-height: 600px;
  padding: 40px 0;
  position: relative;
  z-index: 10;
  background-color: rgba(9, 9, 11, 0.5);
}

/* Footer Styles */
.cyber-footer {
  background-color: rgba(9, 9, 11, 0.9);
  color: var(--cyber-text);
  padding: 60px 0 30px;
  position: relative;
  border-top: 1px solid var(--cyber-purple);
}

.cyber-grid-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  box-shadow: 0 0 20px var(--cyber-purple);
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.cyber-panel {
  background-color: rgba(24, 24, 27, 0.5);
  border: 1px solid var(--cyber-purple-dark);
  border-radius: 4px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
}

.cyber-heading {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: var(--cyber-purple-light);
  position: relative;
  display: inline-block;
}

.cyber-heading::after {
  content: '_';
  color: var(--cyber-purple);
  animation: blink 1s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.footer-column ul li {
  margin-bottom: 12px;
}

.cyber-link {
  color: var(--cyber-text);
  font-size: 15px;
  transition: all 0.2s ease;
  position: relative;
  padding-left: 15px;
}

.cyber-link:before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--cyber-purple);
}

.cyber-link:hover {
  color: var(--cyber-purple-light);
  text-shadow: 0 0 5px var(--cyber-purple);
  transform: translateX(5px);
}

.payment-icons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cyber-payment {
  height: 36px;
  opacity: 0.8;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 2px var(--cyber-purple));
}

.cyber-payment:hover {
  opacity: 1;
  filter: drop-shadow(0 0 8px var(--cyber-purple));
  transform: scale(1.05);
}

.cyber-copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(126, 34, 206, 0.3);
  color: var(--cyber-text);
  font-size: 14px;
  position: relative;
  font-family: 'Rajdhani', sans-serif;
}

.cyber-year {
  font-family: 'Orbitron', sans-serif;
  color: var(--cyber-purple-light);
  font-weight: 900;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--cyber-purple);
  opacity: 0.7;
  animation: scan 3s linear infinite;
  box-shadow: 0 0 15px var(--cyber-purple);
}

@keyframes scan {
  0% { transform: translateY(0); opacity: 0.5; }
  50% { opacity: 1; }
  100% { transform: translateY(30px); opacity: 0.5; }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header-top .container {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .nav-items {
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .payment-icons {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .cyber-logo {
    font-size: 20px;
  }
}
</style>

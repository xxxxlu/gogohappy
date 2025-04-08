<template>
  <div class="cyber-home">
    <!-- Cyberpunk Hero Section -->
    <div class="cyber-hero">
      <div class="hero-glitch-effect"></div>
      <div class="container">
        <div class="cyber-hero-content">
          <h1 class="cyber-title">GOGO<span class="cyber-highlight">HAPPY</span><span class="blinking-cursor">_</span></h1>
          <p class="cyber-subtitle">UNLOCK_FUTURE:// <span class="typing-text">digital products at quantum prices</span></p>
          <router-link to="/products" class="cyber-btn">
            <span class="btn-text">JACK_IN</span>
            <span class="btn-glow"></span>
          </router-link>
        </div>
        <div class="cyber-hero-image">
          <div class="image-frame">
            <img src="https://cdn.pixabay.com/photo/2022/06/22/04/07/cyberpunk-7276893_1280.jpg" alt="Featured Products" />
            <div class="frame-corner tl"></div>
            <div class="frame-corner tr"></div>
            <div class="frame-corner bl"></div>
            <div class="frame-corner br"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Website Introduction Section -->
    <div class="cyber-featured-section">
      <div class="cyber-section-header">
        <div class="glitch-line"></div>
        <h2 class="cyber-section-title">ABOUT_US://</h2>
      </div>
      <div class="container">
        <div class="cyber-featured-cards">
          <div class="featured-card featured-card-main">
            <div class="featured-hologram">
              <img src="https://cdn.pixabay.com/photo/2020/10/03/05/26/technology-5623438_1280.jpg" alt="Tech Future" @error="handleImageError">
              <div class="hologram-overlay"></div>
              <div class="card-corner tl"></div>
              <div class="card-corner tr"></div>
              <div class="card-corner bl"></div>
              <div class="card-corner br"></div>
            </div>
            <div class="featured-content">
              <div class="featured-badge">WELCOME</div>
              <h3 class="featured-title">DIGITAL SHOPPING REDEFINED</h3>
              <p class="featured-desc">GOGOHAPPY is your premier cyberpunk e-commerce destination, offering cutting-edge products at revolutionary prices. Our digital marketplace connects you with exclusive tech gear, limited editions, and trending items delivered right to your doorstep.</p>
              <router-link to="/about" class="cyber-btn featured-btn">
                <span class="btn-text">DISCOVER MORE</span>
                <span class="btn-glow"></span>
              </router-link>
            </div>
          </div>
          
          <div class="featured-card-grid">
            <div class="featured-card featured-card-small" 
                 v-for="index in 3" 
                 :key="index" 
                 v-if="products.length > index">
              <div class="featured-hologram">
                <img :src="products[index].image" :alt="products[index].name" @error="handleImageError">
                <div class="hologram-overlay"></div>
                <div class="card-corner tl"></div>
                <div class="card-corner tr"></div>
                <div class="card-corner bl"></div>
                <div class="card-corner br"></div>
              </div>
              <div class="featured-content">
                <h3 class="featured-title-small">{{ products[index].name }}</h3>
                <p class="featured-price-small">Rs. {{ formatPrice(products[index].price) }}</p>
                <router-link :to="`/product/${products[index].id}`" class="cyber-badge">
                  VIEW_DATA
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest Products Section -->
    <div class="cyber-products-section">
      <div class="cyber-section-header">
        <div class="glitch-line"></div>
        <h2 class="cyber-section-title">NEW_ARRIVALS://</h2>
      </div>
      <div class="container">
        <div class="cyber-product-grid">
          <product-card
            v-for="product in latestProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
    
    <!-- Feature Section -->
    <div class="cyber-features-section">
      <div class="cyber-section-header">
        <div class="glitch-line"></div>
        <h2 class="cyber-section-title">SYSTEM_BENEFITS://</h2>
      </div>
      <div class="container">
        <div class="cyber-features-grid">
          <div class="cyber-feature">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">🚚</span>
              <div class="icon-glow"></div>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">QUANTUM_DELIVERY</h3>
              <p class="feature-desc">Free shipping on all orders over Rs.300</p>
            </div>
          </div>
          <div class="cyber-feature">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">🔄</span>
              <div class="icon-glow"></div>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">TIME_REVERSAL</h3>
              <p class="feature-desc">30-day return with no questions</p>
            </div>
          </div>
          <div class="cyber-feature">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">🔒</span>
              <div class="icon-glow"></div>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">NEURAL_PROTECTION</h3>
              <p class="feature-desc">100% secure payment processing</p>
            </div>
          </div>
          <div class="cyber-feature">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">💬</span>
              <div class="icon-glow"></div>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">AI_ASSISTANTS</h3>
              <p class="feature-desc">24/7 intelligent support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    ...mapState(['products', 'categories']),
    latestProducts() {
      // 限制为最新的8个产品
      return this.products.slice(0, 8)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
/* Cyberpunk Home Styles */
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

.cyber-home {
  padding-bottom: 48px;
  background-color: var(--cyber-bg-dark);
  position: relative;
  overflow: hidden;
}

/* Cyberpunk Hero */
.cyber-hero {
  background-color: rgba(147, 51, 234, 0.1);
  padding: 80px 0;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
}

.hero-glitch-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(33, 12, 54, 0.05) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.cyber-hero .container {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.cyber-hero-content {
  flex: 1;
  padding-right: 48px;
}

.cyber-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 52px;
  font-weight: 900;
  color: var(--cyber-text);
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 0 15px var(--cyber-purple);
  letter-spacing: 1px;
}

.cyber-highlight {
  color: var(--cyber-purple-light);
  position: relative;
}

.blinking-cursor {
  color: var(--cyber-purple);
  animation: blink 1s step-end infinite;
  margin-left: 4px;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.cyber-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px;
  color: #a1a1aa;
  margin-bottom: 32px;
  position: relative;
}

.typing-text {
  color: var(--cyber-purple-light);
  border-right: 2px solid var(--cyber-purple);
  animation: typing 4s steps(40) 1s 1 normal both, blink-caret 1s step-end infinite;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--cyber-purple); }
}

.cyber-btn {
  display: inline-block;
  background-color: var(--cyber-purple);
  color: var(--cyber-text);
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  padding: 16px 32px;
  text-decoration: none;
  border: 1px solid var(--cyber-purple-light);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.5);
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  letter-spacing: 1px;
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--cyber-purple-dark), var(--cyber-purple-light));
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.cyber-btn:hover {
  background-color: var(--cyber-purple-dark);
  transform: translateY(-3px);
  box-shadow: 0 0 25px rgba(147, 51, 234, 0.7);
}

.cyber-btn:hover .btn-glow {
  opacity: 0.5;
}

.cyber-hero-image {
  flex: 1;
  text-align: right;
  position: relative;
}

.image-frame {
  position: relative;
  padding: 4px;
  border: 1px solid var(--cyber-purple);
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  max-width: 90%;
  margin-left: auto;
}

.image-frame img {
  max-width: 100%;
  display: block;
  filter: saturate(1.2) contrast(1.1);
  z-index: 2;
  position: relative;
}

.frame-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--cyber-purple-light);
  z-index: 3;
}

.tl {
  top: -2px;
  left: -2px;
  border-bottom: none;
  border-right: none;
}

.tr {
  top: -2px;
  right: -2px;
  border-bottom: none;
  border-left: none;
}

.bl {
  bottom: -2px;
  left: -2px;
  border-top: none;
  border-right: none;
}

.br {
  bottom: -2px;
  right: -2px;
  border-top: none;
  border-left: none;
}

/* Shared Section Styles */
.cyber-section-header {
  position: relative;
  margin-bottom: 32px;
  text-align: center;
}

.glitch-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-purple), transparent);
  z-index: 1;
}

.cyber-section-title {
  position: relative;
  z-index: 2;
  display: inline-block;
  background-color: var(--cyber-bg-dark);
  padding: 0 25px;
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--cyber-purple-light);
  text-shadow: 0 0 10px rgba(147, 51, 234, 0.7);
  letter-spacing: 1px;
}

/* Featured Products Section */
.cyber-featured-section {
  padding: 70px 0;
  position: relative;
  overflow: hidden;
  background-color: rgba(21, 21, 26, 0.7);
}

.featured-desc {
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text);
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.cyber-featured-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.cyber-featured-cards {
  display: flex;
  flex-direction: row;
  gap: 30px;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.featured-card {
  position: relative;
  background-color: rgba(24, 24, 27, 0.8);
  overflow: hidden;
  border: 1px solid var(--cyber-purple-dark);
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.2);
}

.featured-card:hover {
  transform: translateY(-8px);
  border-color: var(--cyber-purple);
  box-shadow: 0 8px 25px rgba(147, 51, 234, 0.4);
}

.featured-card-main {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  max-height: 450px;
  clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%);
}

.featured-card-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  flex: 1;
  max-width: 280px;
}

.featured-card-small {
  height: 120px;
  display: flex;
  clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%);
}

.featured-hologram {
  position: relative;
  overflow: hidden;
}

.featured-card-main .featured-hologram {
  height: 65%;
}

.featured-card-small .featured-hologram {
  width: 45%;
  height: 100%;
}

.featured-hologram img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  max-height: 280px;
}

.featured-card:hover .featured-hologram img {
  transform: scale(1.05);
}

.hologram-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), transparent);
  z-index: 1;
}

.card-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid var(--cyber-purple);
  z-index: 2;
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

.featured-content {
  padding: 20px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.featured-card-main .featured-content {
  flex: 1;
}

.featured-card-small .featured-content {
  width: 55%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-badge {
  display: inline-block;
  background-color: var(--cyber-purple);
  color: var(--cyber-text);
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  margin-bottom: 15px;
  letter-spacing: 1px;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
}

.featured-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--cyber-text);
  margin-bottom: 15px;
  line-height: 1.3;
  text-shadow: 0 0 8px var(--cyber-purple);
}

.featured-title-small {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--cyber-text);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 2.8em;
}

.featured-price {
  font-family: 'Rajdhani', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--cyber-purple-light);
  margin-bottom: 20px;
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
}

.featured-price-small {
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--cyber-purple-light);
  margin-bottom: 10px;
}

.featured-btn {
  margin-top: auto;
  align-self: flex-start;
}

.cyber-badge {
  display: inline-block;
  background-color: rgba(147, 51, 234, 0.2);
  color: var(--cyber-purple-light);
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border: 1px solid var(--cyber-purple-dark);
  transition: all 0.3s ease;
  text-decoration: none;
  margin-top: auto;
  align-self: flex-start;
}

.cyber-badge:hover {
  background-color: rgba(147, 51, 234, 0.3);
  color: var(--cyber-text);
  border-color: var(--cyber-purple);
  text-shadow: 0 0 5px var(--cyber-purple);
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
}

/* Latest Products */
.cyber-products-section {
  margin-bottom: 60px;
}

.cyber-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Features Section */
.cyber-features-section {
  background-color: rgba(147, 51, 234, 0.1);
  padding: 60px 0;
  margin-top: 60px;
  position: relative;
  overflow: hidden;
}

.cyber-features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.cyber-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.cyber-feature {
  background-color: rgba(24, 24, 27, 0.8);
  border: 1px solid var(--cyber-purple-dark);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

.cyber-feature:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(147, 51, 234, 0.3);
  border-color: var(--cyber-purple);
}

.feature-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  font-size: 40px;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, var(--cyber-purple-light) 0%, transparent 70%);
  opacity: 0.3;
  z-index: 1;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.cyber-feature:hover .icon-glow {
  opacity: 0.5;
}

.feature-content {
  text-align: center;
  z-index: 2;
}

.feature-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--cyber-purple-light);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
}

.feature-desc {
  font-family: 'Rajdhani', sans-serif;
  color: var(--cyber-text);
  font-size: 16px;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .cyber-hero .container {
    flex-direction: column;
    padding: 0 24px;
  }
  
  .cyber-hero-content {
    padding-right: 0;
    margin-bottom: 40px;
    text-align: center;
  }
  
  .cyber-hero-image {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .image-frame {
    margin: 0 auto;
  }
  
  .cyber-categories-section .container,
  .cyber-products-section .container {
    padding: 0 24px;
  }
  
  .cyber-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .cyber-hero {
    padding: 60px 0;
  }
  
  .cyber-title {
    font-size: 36px;
  }
  
  .cyber-subtitle {
    font-size: 18px;
  }
  
  .cyber-section-title {
    font-size: 24px;
  }
  
  .cyber-features-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .cyber-featured-cards {
    flex-direction: column;
    gap: 20px;
    max-width: 90%;
    margin: 0 auto;
  }
  
  .featured-card-main {
    min-height: 280px;
    max-height: 350px;
  }
  
  .featured-card-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    max-width: 100%;
    gap: 15px;
  }
  
  .featured-card-small {
    height: 110px;
  }
  
  .featured-hologram img {
    max-height: 200px;
  }
}

@media (max-width: 480px) {
  .cyber-hero {
    padding: 40px 0;
  }
  
  .cyber-title {
    font-size: 32px;
  }
  
  .cyber-btn {
    padding: 12px 24px;
  }
  
  .cyber-feature {
    padding: 20px;
  }
  
  .featured-card-main {
    min-height: 250px;
    max-height: 300px;
  }
  
  .featured-card-small {
    height: 90px;
  }
  
  .featured-card-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    gap: 12px;
  }
  
  .featured-title {
    font-size: 18px;
  }
  
  .featured-title-small {
    font-size: 12px;
  }
  
  .featured-price {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  .featured-price-small {
    font-size: 14px;
  }
  
  .featured-hologram img {
    max-height: 150px;
  }
  
  .cyber-featured-cards {
    max-width: 95%;
  }
}
</style>

<template>
  <div class="cyber-product-list cyber-grid-bg">
    <div class="container">
      <div class="cyber-page-header">
        <h1 class="cyber-title">{{ categoryTitle.toUpperCase() }}<span class="blinking-cursor">_</span></h1>
        <div class="cyber-breadcrumbs">
          <router-link to="/">HOME</router-link>
          <span class="separator">//</span>
          <span class="current">{{ categoryTitle.toUpperCase() }}</span>
        </div>
      </div>

      <div class="cyber-content-wrapper">
        <div class="cyber-sidebar">
          <div class="cyber-filter-section">
            <h3 class="cyber-section-title">DATA_CATEGORIES::</h3>
            <div class="section-line"></div>
            <ul class="cyber-category-list">
              <li class="cyber-category-item">
                ALL
              </li>
            </ul>
          </div>

          <div class="cyber-filter-section">
            <h3 class="cyber-section-title">PRICE_PARAMETERS::</h3>
            <div class="section-line"></div>
            <div class="cyber-price-inputs">
              <div class="cyber-input-group">
                <input type="number" class="cyber-input" placeholder="MIN" v-model="priceMin" />
                <div class="input-edge"></div>
              </div>
              <span class="range-separator">:</span>
              <div class="cyber-input-group">
                <input type="number" class="cyber-input" placeholder="MAX" v-model="priceMax" />
                <div class="input-edge"></div>
              </div>
            </div>
            <button class="cyber-btn filter-btn" @click="applyFilters">
              <span class="btn-text">APPLY_FILTER</span>
              <span class="btn-glow"></span>
            </button>
          </div>
        </div>

        <div class="cyber-main-content">
          <div class="cyber-sort-bar">
            <div class="cyber-result-count">
              <span class="count-text">{{ filteredProducts.length }}</span>
              <span class="count-label">PRODUCTS_FOUND</span>
            </div>
            <div class="cyber-sort-options">
              <label for="sort" class="cyber-label">NEURAL_SORT::</label>
              <div class="select-wrapper">
                <select id="sort" class="cyber-select" v-model="sortOption">
                  <option value="price-low">PRICE_ASC</option>
                  <option value="price-high">PRICE_DESC</option>
                  <option value="name">NAME</option>
                </select>
                <div class="select-arrow"></div>
              </div>
            </div>
          </div>

          <div class="cyber-products-grid">
            <template v-if="filteredProducts.length > 0">
              <product-card v-for="product in filteredProducts" :key="product.id" :product="product" />
            </template>
            <div v-else class="cyber-no-products">
              <div class="error-icon"></div>
              <p class="error-message">DATA_NOT_FOUND::ADJUST_PARAMETERS</p>
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
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      sortOption: 'price-low',
      priceMin: '',
      priceMax: '',
      appliedPriceMin: null,
      appliedPriceMax: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    categorySlug() {
      return this.$route.query.category || ''
    },
    categoryTitle() {
      if (this.categorySlug) {
        const category = this.categories.find(cat => cat.slug === this.categorySlug)
        return category ? category.name : 'All Products'
      }
      return 'All Products'
    },
    filteredProducts() {
      let filtered = [...this.products]

      // Filter by category
      if (this.categorySlug) {
        filtered = filtered.filter(product => product.category === this.categorySlug)
      }

      // Filter by price range
      if (this.appliedPriceMin !== null) {
        filtered = filtered.filter(product => product.price >= this.appliedPriceMin)
      }

      if (this.appliedPriceMax !== null) {
        filtered = filtered.filter(product => product.price <= this.appliedPriceMax)
      }

      // Sort products
      switch (this.sortOption) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
      }

      return filtered
    }
  },
  methods: {
    applyFilters() {
      this.appliedPriceMin = this.priceMin !== '' ? parseInt(this.priceMin) : null
      this.appliedPriceMax = this.priceMax !== '' ? parseInt(this.priceMax) : null
    }
  },
  watch: {
    '$route.query.category'() {
      // Reset filters when category changes
      this.priceMin = ''
      this.priceMax = ''
      this.appliedPriceMin = null
      this.appliedPriceMax = null
    }
  }
}
</script>

<style>
@import url('../assets/css/cyberpunk.css');

.cyber-product-list {
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

.cyber-title .title-text {
  background: linear-gradient(to right, var(--cyber-text), var(--cyber-green-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
  color: var(--cyber-green-light);
  margin-left: 5px;
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
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

.cyber-content-wrapper {
  display: flex;
  gap: 30px;
}

.cyber-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.cyber-filter-section {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  padding: 20px;
  margin-bottom: 25px;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  overflow: hidden;
}

.cyber-filter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-green), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
  z-index: 10;
}

.cyber-section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--cyber-green-light);
  margin-bottom: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.section-line {
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-green-dark), transparent);
  margin-bottom: 15px;
  opacity: 0.5;
}

.cyber-category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cyber-category-list li {
  margin-bottom: 12px;
  position: relative;
}

.cyber-category-list li a {
  color: var(--cyber-text-darker);
  text-decoration: none;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  display: block;
  padding: 5px 0 5px 15px;
  position: relative;
}

.cyber-category-list li a::before {
  content: '>';
  position: absolute;
  left: 0;
  top: 5px;
  color: var(--cyber-green-dark);
  font-family: monospace;
  opacity: 0.7;
}

.cyber-category-list li a:hover {
  color: var(--cyber-green-light);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
  transform: translateX(3px);
}

.cyber-price-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cyber-input-group {
  position: relative;
  flex: 1;
}

.cyber-input {
  width: 100%;
  padding: 10px;
  background-color: rgba(22, 163, 74, 0.05);
  border: 1px solid var(--cyber-green-dark);
  color: var(--cyber-text);
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
}

.cyber-input:focus {
  outline: none;
  border-color: var(--cyber-green-light);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.input-edge {
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

.range-separator {
  margin: 0 10px;
  color: var(--cyber-green);
  font-weight: bold;
  font-size: 18px;
}

.filter-btn {
  width: 100%;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 1px;
  z-index: 1;
  background-color: rgba(22, 163, 74, 0.1);
}

.filter-btn:hover .btn-text {
  text-shadow: 0 0 15px var(--cyber-green-light);
}

.filter-btn:hover .btn-glow {
  opacity: 1;
}

.filter-btn:active {
  transform: scale(0.98);
}

.filter-btn .btn-text {
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
  color: var(--cyber-green-light);
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
}

.filter-btn .btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-main-content {
  flex-grow: 1;
}

.cyber-sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--cyber-bg-light);
  padding: 15px 20px;
  margin-bottom: 25px;
  position: relative;
  border: 1px solid var(--cyber-green-dark);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.cyber-sort-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  opacity: 0.7;
}

.cyber-result-count {
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--cyber-green-light);
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
}

.count-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: var(--cyber-text-darker);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cyber-sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cyber-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: var(--cyber-text-darker);
  letter-spacing: 1px;
}

.select-wrapper {
  position: relative;
  width: 150px;
}

.cyber-select {
  width: 100%;
  padding: 10px 30px 10px 15px;
  appearance: none;
  border: 1px solid var(--cyber-green-dark);
  background-color: rgba(22, 163, 74, 0.05);
  color: var(--cyber-text);
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-select:focus {
  outline: none;
  border-color: var(--cyber-green-light);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--cyber-green);
  pointer-events: none;
}

.cyber-products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.cyber-no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 20px;
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  position: relative;
  overflow: hidden;
}

.cyber-no-products::before {
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

.error-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
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
  font-size: 36px;
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

.error-message {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  color: var(--cyber-text);
  letter-spacing: 1px;
  position: relative;
  z-index: 2;
}

@media (max-width: 992px) {
  .cyber-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cyber-content-wrapper {
    flex-direction: column;
  }

  .cyber-sidebar {
    width: 100%;
    margin-bottom: 30px;
  }

  .cyber-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cyber-filter-section {
    clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%);
  }
}

@media (max-width: 480px) {
  .cyber-products-grid {
    grid-template-columns: 1fr;
  }

  .cyber-sort-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .cyber-sort-options {
    width: 100%;
  }

  .select-wrapper {
    width: 100%;
  }
}
</style>

<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>NEURAL_CONTACT</h1>
        <div class="breadcrumbs">
          <router-link to="/">HOME_GRID</router-link> /
          <span>CONTACT_NODE</span>
        </div>
      </div>

      <div class="contact-content">
        <div class="contact-info cyber-panel">
          <h2>INITIATE_TRANSMISSION</h2>
          <p>Our neural networks are standing by to process your queries. All communications are secured via quantum encryption.</p>
          <div class="info-item">
            <div class="info">
              <h3>DATA_STREAM</h3>
              <p>abcdshop@aontec.club</p>
              <p>Response time: < 24 cycle units</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info">
              <h3>PHYSICAL_COORDINATES</h3>
              <p>Symbios.pk Central Hub</p>
              <p>Karachi Sector, Pakistan Grid</p>
            </div>
          </div>

          <div class="social-media">
            <h3>NETWORK_NODES</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Facebook" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Twitter" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form cyber-panel">
          <h2>TRANSMIT_DATA</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">IDENTITY_SIGNATURE *</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>

            <div class="form-group">
              <label for="email">DATA_STREAM_ID *</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>

            <div class="form-group">
              <label for="phone">COMM_FREQUENCY</label>
              <input type="tel" id="phone" v-model="form.phone" />
            </div>

            <div class="form-group">
              <label for="subject">TRANSMISSION_SUBJECT *</label>
              <input type="text" id="subject" v-model="form.subject" required />
            </div>

            <div class="form-group">
              <label for="message">DATA_PACKET *</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn">
              <span>INITIALIZE_TRANSMISSION</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // In a real app, you would send this data to your server
      alert('Thank you for your message! We will get back to you soon.')

      // Reset form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style>
@import url('../assets/css/cyberpunk.css');

.contact-page {
  padding: 60px 0;
  background-color: var(--cyber-bg-base);
  position: relative;
}

.contact-page::before {
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

.page-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 42px;
  font-weight: 700;
  color: var(--cyber-text);
  margin-bottom: 16px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
}

.breadcrumbs {
  color: var(--cyber-text-darker);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1px;
}

.breadcrumbs a {
  color: var(--cyber-text-darker);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  padding: 0 4px;
}

.breadcrumbs a::after {
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

.breadcrumbs a:hover {
  color: var(--cyber-green-light);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.breadcrumbs a:hover::after {
  transform: scaleX(1);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.contact-info, .contact-form {
  background-color: var(--cyber-bg-light);
  border: 1px solid var(--cyber-green-dark);
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(22, 163, 74, 0.1);
}

.contact-info::before, .contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
  z-index: 2;
}

.contact-info h2, .contact-form h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--cyber-green-light);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(22, 163, 74, 0.2);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-info > p {
  margin-bottom: 32px;
  color: var(--cyber-text-darker);
  line-height: 1.8;
  font-size: 16px;
  font-family: 'Rajdhani', sans-serif;
}

.info-item {
  display: flex;
  margin-bottom: 28px;
  padding: 20px;
  background-color: rgba(22, 163, 74, 0.05);
  border: 1px solid rgba(22, 163, 74, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--cyber-green), transparent);
  opacity: 0.7;
}

.info-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(22, 163, 74, 0.15);
  border-color: var(--cyber-green-dark);
}

.info {
  flex: 1;
  padding-left: 15px;
}

.info h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--cyber-green);
  margin-bottom: 10px;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info p {
  color: var(--cyber-text-darker);
  margin-bottom: 6px;
  font-size: 15px;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 0.5px;
}

.social-media {
  margin-top: 40px;
  position: relative;
}

.social-media::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--cyber-green-dark), transparent);
  opacity: 0.5;
}

.social-media h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--cyber-green);
  margin-bottom: 20px;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

.social-media h3::after {
  content: '//';
  position: absolute;
  right: -20px;
  color: var(--cyber-green-dark);
  opacity: 0.7;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 44px;
  height: 44px;
  background-color: rgba(22, 163, 74, 0.05);
  border: 1px solid var(--cyber-green-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
  transition: left 0.5s ease;
}

.social-icon:hover {
  border-color: var(--cyber-green-light);
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
}

.social-icon:hover::before {
  left: 100%;
}

.social-icon:hover img {
  filter: brightness(0.8) sepia(1) hue-rotate(70deg) saturate(5);
}

.social-icon img {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--cyber-text);
  font-size: 14px;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--cyber-green-dark);
  font-size: 15px;
  color: var(--cyber-text);
  background-color: rgba(22, 163, 74, 0.05);
  transition: all 0.3s ease;
  font-family: 'Rajdhani', sans-serif;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--cyber-green-light);
  background-color: rgba(22, 163, 74, 0.02);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-group::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--cyber-green-light);
  border-bottom: 2px solid var(--cyber-green-light);
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

.submit-btn {
  background-color: var(--cyber-green);
  color: var(--cyber-text-light);
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover {
  background-color: var(--cyber-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(22, 163, 74, 0.3);
}

.submit-btn:hover::before {
  left: 100%;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .contact-info, .contact-form {
    padding: 24px;
  }
  
  .info-item::before {
    height: 70%;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 32px 0;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .page-header h1::after {
    width: 60px;
  }

  .info-item {
    padding: 16px;
  }
  
  .social-icons {
    flex-wrap: wrap;
    justify-content: center;
  }

  .form-group input, .form-group textarea {
    font-size: 14px;
    padding: 12px 14px;
  }

  .submit-btn {
    padding: 12px 24px;
    font-size: 14px;
  }
}</style>

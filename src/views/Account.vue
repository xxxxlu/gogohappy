<template>
  <div class="account-page">
    <div class="container-login cyber-panel">
      <h1>NEURAL_ACCESS</h1>
      <div v-if="!isLoggedIn">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">IDENTITY_CODE</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">NEURAL_KEY</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="login-btn">INITIALIZE_ACCESS</button>
        </form>
      </div>
      <div v-else>
        <p>NEURAL_LINK_ESTABLISHED :: {{ username }}</p>
        <button @click="logout" class="logout-btn">TERMINATE_SESSION</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: '',
      isLoggedIn: !!localStorage.getItem('username')
    }
  },
  methods: {
    login() {
      localStorage.setItem('username', this.username)
      this.isLoggedIn = true
      
      // 跳转到首页
      this.$router.push('/')
      
      // 刷新页面以更新顶部导航栏中的用户名显示
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    logout() {
      localStorage.removeItem('username')
      this.username = ''
      this.password = ''
      this.isLoggedIn = false
    }
  }
}
</script>

<style>
@import url('../assets/css/cyberpunk.css');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');

.account-page {
  padding: 60px 0;
  text-align: center;
  background-color: var(--cyber-bg-base);
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-page::before {
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

.container-login {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--cyber-bg-light);
  padding: 32px;
  position: relative;
  border: 1px solid var(--cyber-green-dark);
  box-shadow: 0 0 30px rgba(22, 163, 74, 0.1);
  z-index: 1;
}

.container-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
}

.container-login::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 20px;
  height: 20px;
  border-left: 2px solid var(--cyber-green-light);
  border-bottom: 2px solid var(--cyber-green-light);
  opacity: 0.7;
}

h1 {
  font-size: 32px;
  margin-bottom: 28px;
  color: var(--cyber-green-light);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyber-green-light), transparent);
  box-shadow: 0 0 15px var(--cyber-green);
}

.form-group {
  margin-bottom: 24px;
  text-align: left;
  position: relative;
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
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--cyber-text);
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--cyber-green-dark);
  background-color: rgba(22, 163, 74, 0.05);
  transition: all 0.3s ease;
  color: var(--cyber-text);
  font-family: 'Rajdhani', sans-serif;
}

input:focus {
  border-color: var(--cyber-green-light);
  outline: none;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
  background-color: rgba(22, 163, 74, 0.02);
}

.login-btn, .logout-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: var(--cyber-green);
  color: var(--cyber-text-light);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.login-btn::before, .logout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.login-btn:hover, .logout-btn:hover {
  background-color: var(--cyber-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(22, 163, 74, 0.3);
}

.login-btn:hover::before, .logout-btn:hover::before {
  left: 100%;
}

/* Welcome message styling */
p {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px;
  color: var(--cyber-text);
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}
</style>

<template>
  <div class="home-container">
    <div class="header">
      <h1>这是一个bot</h1>
      <p class="subtitle"> 输入设定，和TA对话</p>
    </div>

    <div class="enter-btn" v-if="!showRoleDescrip">
        <button @click="showRoleDescrip = true">
          enter
        </button>
    </div>

    <div class="card" v-if="showRoleDescrip">
      <RoleChatDialog 
        v-if="showDialog"
        @role-selected="handleRoleSelection"
        @close="showRoleDescrip = false"
      />
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RoleChatDialog from '../components/RoleChatDialog.vue'

const router = useRouter()
const showDialog = ref(true)
const showRoleDescrip = ref(false);

const handleRoleSelection = (role) => {
  router.push({ 
    name: 'chat', 
    query: { 
      role: role, 
    } 
  })
}
</script>

<style scoped>
.home-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2.5rem 1rem 2rem 1rem;
  min-height: 100vh;
  background-image: url('../assets/HomeView-bg.png');
  background-repeat: no-repeat;
  background-size: 500px, 500px;
  background-position: right bottom; 
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.header h1 {
  font-family: 'PingFang SC', 'Microsoft YaHei',
    'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Source Han Sans SC',
    'Noto Sans SC', 'SimHei', Arial, sans-serif;
  font-size: 2.8rem;
  color: #2c65d7;
  margin-top: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.25rem;
  color: #388dc2;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  letter-spacing: 1px;
}

.enter-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.enter-btn button {
  padding: 16px 48px;
  font-size: 1.3rem;
  border-radius: 12px;
  background: linear-gradient(90deg, #469ae0 0%, #80d6ff 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 16px rgba(66,165,245,0.10);
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 2px;
  transition: background 0.2s, transform 0.2s;
}

.enter-btn button:hover {
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  transform: translateY(-2px) scale(1.03);
}

.card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 36px rgba(33, 150, 243, 0.10);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 3rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.2s;
}

.card:focus-within,
.card:hover {
  box-shadow: 0 18px 48px rgba(33, 150, 243, 0.16);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: #f8fbfd;
  border-radius: 14px;
  padding: 2rem 1.5rem;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 30px rgba(33, 150, 243, 0.13);
}

.feature-card .icon {
  background: #e3f2fd;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #1976d2;
}

.feature-card h3 {
  color: #1976d2;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.feature-card p {
  color: #5c6bc0;
  line-height: 1.7;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .home-container {
    padding: 1rem 0.2rem;
  }
  .card {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  .header h1 {
    font-size: 2rem;
  }
}
</style>
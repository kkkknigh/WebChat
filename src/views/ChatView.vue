<template>
  <div class="chat-view">
    <div class="chat-container">

      <div class="chat-header">  

        <div class="role-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff">
            <circle cx="12" cy="8" r="7"></circle>
            <path d="M5.3 20c1.1-3.3 4.2-5.5 7.7-5.5"></path>
          </svg>
          <span>{{ roleDisplayNameResult }}</span>
        </div>  

        <div class="role-info">
          <span>{{ role }}</span>
        </div>  

        <div>
          <button @click="endChat" class="end-btn">结束对话</button>
        </div>
      </div>
      
    <ChatWindow :messages="messages" :isTyping="isTyping" />
      
    <ChatInput 
      v-model="userMessage" 
      @send-message="sendMessage" 
      :isSending="isSending"
    />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChatWindow from '../components/ChatWindow.vue'
import ChatInput from '../components/ChatInput.vue'
import {marked} from 'marked'
import DOMPurify from 'dompurify'

import { callLLMApi , extractRole } from '../llm/llmApi.js'

const router = useRouter()
const userMessage = ref('')
const messages = ref([])
const isTyping = ref(true)
const isSending = ref(false)

// 从路由参数中获取角色和文件信息
const role = ref(useRouter().currentRoute.value.query.role || 'assistant')

// 根据角色值显示对应的名称
const  roleDisplayName = async () => {
    const simpleRole = await extractRole(role.value);
    return  simpleRole; //概括身份后显示角色
}

const roleDisplayNameResult = ref('');

// 页面加载时异步获取角色显示名
onMounted(async () => {
  roleDisplayNameResult.value = await roleDisplayName();
});

// 结束对话
const endChat = () => {
  router.push('/');
}

// 发送消息
const sendMessage = async () => {
  if (!userMessage.value.trim()) return;

  isSending.value = true;

  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    text: userMessage.value,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const message = userMessage.value;
  userMessage.value = '';

  // 模拟机器人思考
  setTimeout(async () => {
    isTyping.value = true;

    // 模拟API调用延迟
    setTimeout(async () => {
      isTyping.value = false;
      isSending.value = false;

      // 添加机器人回复
      const botResponse = await generateBotResponse(message, role.value) //md渲染？？
      messages.value.push({
        id: Date.now() + 1,
        text: DOMPurify.sanitize(marked(botResponse)),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      // 滚动到底部
      setTimeout(() => {
        const chatWindow = document.querySelector('.chat-messages');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 100);

    }, 500);
  }, 500);
}
// 根据角色生成回复
const generateBotResponse = async (userMessage, role) => {
  try {
    const roleResponses = await callLLMApi(userMessage, role)
    return roleResponses
  } catch (error) {
    return '抱歉，我暂时无法回复。'
  }
}


</script>

<style scoped>
.chat-view {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
  background-image: url('../assets/HomeView-bg.png');
  background-repeat: no-repeat;
  background-size: 300px, 300px;
  background-position: right bottom; 
}

.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
  background: rgb(80, 165, 225);
  border-radius: 16px;
  box-shadow: 0 10px 50px rgb(166, 191, 241);
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid #eef2f7;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  z-index: 10;
}

.role-info {
  background: #cad8fd;
  color: white;
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  gap: 5px;
}

.role-badge {
  background: #6e8de3;
  color: white;
  padding: 5px 25px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  gap: 15px;
}

.end-btn {
  background: #f0f6fc;
  border: 1px solid #7bb0dc;
  color: #010f1d;
  padding: 5px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 2rem;
}

.end-btn:hover {
  background: #f1f3f5;
  border-color: #d1d5da;
}
</style>
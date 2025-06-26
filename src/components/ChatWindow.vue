<template>
  <div class="chat-window">
    <div class="chat-messages">
      <div 
        v-for="message in messages" 
        :key="message.id" 
        class="message"
        :class="message.sender"
      >
        <div class="avatar">
          <img 
            v-if="message.sender === 'bot'" 
            src="../assets/bot-avatar.png" 
            alt="Bot Avatar"
          >
          <img 
            v-else 
            src="../assets/user-avatar.png" 
            alt="User Avatar"
          >
        </div>
        <div class="message-content">
          <div class="text" v-html="message.text"></div>
          <div class="time">{{ message.time }}</div>
        </div>
      </div>
      
      <div v-if="isTyping" class="typing-indicator">
        <div class="avatar">
          <img src="../assets/bot-avatar.png" alt="Bot Avatar">
        </div>
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  isTyping: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  max-width: 80%;
  gap: 12px;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.message.bot .message-content {
  align-items: flex-start;
}

.message.user .message-content {
  align-items: flex-end;
}

.text {
  padding: 14px 18px;
  border-radius: 18px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message.bot .text {
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 18px 18px 18px 4px;
  color: #2c3e50;
}

.message.user .text {
  background: #5a79e0;
  color: white;
  border-radius: 18px 18px 4px 18px;
}

.time {
  font-size: 0.75rem;
  color: #7f8c8d;
  padding: 0 5px;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.typing-dots {
  display: flex;
  align-items: center;
  height: 30px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #798fea;
  display: inline-block;
  margin: 0 3px;
  animation: bounce 1.3s linear infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-6px);
  }
}
</style>
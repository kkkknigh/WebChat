<template>
  <div class="chat-input">
    <div class="input-container">
      <input 
        type="text" 
        v-model="inputValue" 
        @keyup.enter="sendMessage"
        :disabled="isSending"
        placeholder="输入消息..."
      />
      <button 
        @click="sendMessage" 
        :disabled="isSending || !inputValue.trim()"
        class="send-btn"
      >
        <svg v-if="!isSending" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <div v-else class="spinner"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  isSending: Boolean
});

const emit = defineEmits(['update:modelValue', 'send-message']);

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});

watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal);
});

const sendMessage = () => {
  if (inputValue.value.trim() && !props.isSending) {
    emit('send-message', inputValue.value);
  }
};
</script>

<style scoped>
.chat-input {
  padding: 1rem;
  background: white;
  border-top: 1px solid #eef2f7;
}

.input-container {
  display: flex;
  border: 1px solid #e1e4e8;
  border-radius: 30px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

input {
  flex: 1;
  border: none;
  padding: 14px 20px;
  font-size: 1rem;
  outline: none;
}

input:disabled {
  background: #f8f9fa;
}

input::placeholder {
  color: #a0aec0;
}

.send-btn {
  background: #3498db;
  border: none;
  color: white;
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.send-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #2980b9;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
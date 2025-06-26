<template>
  <div class="dialog-overlay">
    <div class="dialog-content">

      <div class="custom-role">
        <h4>输入角色设定</h4>
        <input 
          type="text" 
          v-model="customRole" 
          placeholder="例如：诗人"
          class="custom-input"
        />
      </div>
      
      <div class="dialog-actions">
        <button @click="closeDialog" class="cancel-btn">取消</button>
        <button @click="confirmRole" class="confirm-btn">开始对话</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['role-selected', 'close']);

const customRole = ref('');

const confirmRole = () => {
  const finalRole = customRole.value ;
  if (!finalRole) {
    alert('请输入自定义角色');
    return;
  }
  emit('role-selected', finalRole);
  closeDialog();
};

const closeDialog = () => {
  emit('close');
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: #ffffff;
  border-radius: 18px;
  width: 92%;
  max-width: 600px;
  max-height: 300px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  padding: 2.2rem 2rem 1.5rem 2rem;
  position: relative;
  animation: dialogPop 0.25s cubic-bezier(.68,-0.55,.27,1.55);
}

@keyframes dialogPop {
  0% { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}


.custom-role {
  margin-top: 0rem;
  text-align: center;
}

h4 {
  margin: 0 0 4rem 0;
  color: #0a274c;
  font-size: 1.3rem;
  font-weight: 550;
  letter-spacing: 1px;
}

.custom-input {
  width: 100%;
  padding: 16px;
  border: 1.5px solid #002f65;
  border-radius: 12px;
  font-size: 1.1rem;
  box-sizing: border-box;
  margin-top: 1rem;
  background: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.13);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 0 0 0;
  border-top: 1px solid #f0f0f0;
  gap: 16px;
  margin-top: 0rem;
}

.cancel-btn, .confirm-btn {
  padding: 12px 32px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  transition: background 0.2s, color 0.2s;
  margin-top: 0rem;
}

.cancel-btn {
  background: #fff;
  color: #2c3e50;
  border: 1.5px solid #ddd;
  margin-top: 0rem;
}

.cancel-btn:hover {
  background: #f5f7fa;
  color: #3498db;
  border-color: #3498db;
}

.confirm-btn {
  margin-top: 0rem;
  background: linear-gradient(90deg, #3498db 0%, #6dd5fa 100%);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(52,152,219,0.08);
}

.confirm-btn:hover {
  margin-top: 0rem;
  background: linear-gradient(90deg, #2980b9 0%, #3498db 100%);
}

@media (max-width: 600px) {
  .dialog-content {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
}
</style>
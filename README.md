# WebChat
WebChat 是一个基于 Vue3 的网页智能聊天机器人项目。用户可以自定义角色设定，Bot 会根据设定模拟不同身份与用户进行自然语言对话。项目通过调用 deepseek API 实现智能回复，支持多轮对话和角色扮演。
## 主要功能
1. 自定义角色：用户可输入任意角色设定，Bot 会模仿该角色风格与用户互动。
2. 智能回复：集成 deepseek 大模型 API，支持上下文多轮对话。
3. 美观界面：支持机器人和用户头像、对话气泡、Markdown 渲染等现代聊天体验。
4. 跨域支持：内置 Proxy 代理模式，方便本地开发时解决 CORS 问题。
## 配置文件
### 头像
1. 机器人头像：`src/assets/bot-avatar.png`  
   
2. 用户头像：`src/assets/user-avatar.png`  

### API
API_URL & API_KEY：`src/llm/llmconfig.js`






















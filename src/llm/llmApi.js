import axios from 'axios';

import { API_URL, API_KEY } from './llmconfig.js';

let preMessages = []; 

export const callLLMApi = async (messages, role = "expert") => {
  try {
    if (preMessages.length == 0){
      messages = `请你扮演：${role}并与我进行对话。` + messages;
    }
    preMessages.push({ role: 'user', content: `${messages}`});
    const response = await axios.post(
      API_URL,
      {
        model: 'deepseek-chat',
        messages: preMessages
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    //后续添加错误处理
    preMessages.push({role: 'assistant', content: String(response.data.choices[0].message.content)});
    return String(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw error;
  }
};

export const extractRole = async (role = "expert") => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: `请用一个简短的词说明这个角色的身份，比如诗人，狗等：${role}`}]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    //后续添加错误处理
    return String(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw error;
  }
};

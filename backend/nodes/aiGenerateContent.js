const axios = require('axios');

module.exports = async function(config, input) {
  const apiKey = config.openaiApiKey;
  const topic = input.topic || '小红书热门话题';
  const prompt = `请为小红书平台生成一篇关于“${topic}”的优质原创内容，适合分享给大众用户。`;

  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const content = res.data.choices[0].message.content;
  return { topic, content };
};

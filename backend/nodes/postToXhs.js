const axios = require('axios');

module.exports = async function(config, input) {
  // config 需包含 accessToken, imageUrls（图片URL数组）
  const { topic, content } = input;
  const { accessToken, imageUrls } = config;

  if (!accessToken || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    throw new Error('请在config中提供accessToken和至少一张imageUrls');
  }

  // 参考小红书开放平台内容发布API
  // https://open.xiaohongshu.com/document/op/6f8e6b273b2e4c7b
  const apiUrl = 'https://openapi.xiaohongshu.com/sns/v2/note/create';

  const payload = {
    title: topic,
    desc: content,
    image_list: imageUrls,
    note_type: 'NORMAL', // 图文笔记
    at_user_list: [],
    tag_list: [] // 可选，话题标签
  };

  const res = await axios.post(apiUrl, payload, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.data && res.data.success) {
    console.log(`[小红书已发布] 主题: ${topic}\n内容: ${content}\nNoteId: ${res.data.data.note_id}`);
    return { topic, content, noteId: res.data.data.note_id, status: 'posted' };
  } else {
    throw new Error(`小红书发帖失败: ${JSON.stringify(res.data)}`);
  }
};

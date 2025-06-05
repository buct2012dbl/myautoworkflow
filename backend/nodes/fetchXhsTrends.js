const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function(config, input) {
  // 示例：抓取小红书热榜页面（实际URL和结构需根据小红书调整）
  const res = await axios.get('https://www.xiaohongshu.com/explore');
  const $ = cheerio.load(res.data);
  // 假设热榜主题在某个class下，实际需抓包分析
  const top1 = $('.hot-search-list .hot-search-item').first().text().trim();
  return { topic: top1 || '小红书热门话题' };
};

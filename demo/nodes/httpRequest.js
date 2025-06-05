const axios = require('axios');

module.exports = async function(config, input) {
  const res = await axios({
    method: config.method || 'GET',
    url: config.url,
    data: config.data || {}
  });
  return res.data;
};

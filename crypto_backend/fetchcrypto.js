const axios = require('axios');
const CryptoCurrent = require('./models/cryptocurrent');
const CryptoHistorical = require('./models/historical');

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const API_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
};
async function fetchAndSaveData() {
  try {
    console.log('Fetching data from api');
    const response = await axios.get(COINGECKO_URL, { params: API_PARAMS });
    const freshData = response.data;

    if (!freshData || freshData.length === 0) {
      console.log('API returned no data.');
      return;
    }
    await CryptoCurrent.deleteMany({});
    await CryptoCurrent.insertMany(freshData);

    await CryptoHistorical.insertMany(freshData);

  }catch (error) {
    
    console.error('An error occurred during the data fetch and save process:', error.message);
  }
}

module.exports = fetchAndSaveData;

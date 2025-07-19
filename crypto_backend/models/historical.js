const mongoose = require('mongoose');

const historicalSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
    market_cap: Number,
    market_cap_rank: Number,
    price_cahnge_percentage_24h: Number,
    last_updated: Date,
    fetched_at: { type: Date, default: Date.now},

});

module.exports = mongoose.model("Historical", historicalSchema);

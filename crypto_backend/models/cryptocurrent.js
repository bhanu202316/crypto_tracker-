const mongoose = require("mongoose");

const cryptoCurrentSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
    market_cap: Number,
    market_cap_rank: Number,
    price_change_percentage_24h: Number,
    last_updated: Date,

});

module.exports = mongoose.model("CryptoCurrent",cryptoCurrentSchema);
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchCryptoData = async () => {
    if (cryptos.length === 0) {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/coins');
      setCryptos(response.data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error getting data', err);
      setError('Could not load data. Please check the backend is running or not!.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(() => {
      fetchCryptoData();
    }, 30*60*1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatPrice = (price) => {
    return price ? price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="app">
        <div className="status-container">
          <div className="loading-spinner"></div>
          <p>Loading Cryptocurrency Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="status-container">
          <h1>An Error Occurred</h1>
          <p className="error-message">{error}</p>
          <button onClick={fetchCryptoData} className="refresh-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <header className="app-header">
        <h1>Crypto Tracker Dashboard</h1>
        <div className="header-actions">
          <button onClick={fetchCryptoData} className="refresh-btn">
            Refresh Now
          </button>
          {lastUpdate && <span className="last-update">Last updated: {lastUpdate}</span>}
        </div>
      </header>
      
      <main className="dashboard-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map(crypto => (
              <tr key={crypto.id}>
                <td>{crypto.market_cap_rank}</td>
                <td>
                  <div className="coin-info">
                    <img src={crypto.image} alt={`${crypto.name} logo`} className="coin-image" />
                    <div>
                      <span className="coin-name">{crypto.name}</span>
                      <span className="coin-symbol">{crypto.symbol?.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td>{formatPrice(crypto.current_price)}</td>
                <td className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                  {crypto.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td>{formatPrice(crypto.market_cap)}</td>
                
                <td>{formatTimestamp(crypto.last_updated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      
    </div>
  );
}

export default App;

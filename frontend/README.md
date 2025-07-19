# React + Vite

Crypto Tracker Dashboard — Frontend

A modern React app dashboard that displays the top 10 cryptocurrencies—including name, symbol, price, market cap, 24h % change, and last updated—by fetching data from a Node.js/Express backend.

1 techstack used -
    react+vite
    custom css
    axios for api request
    cron for scheduling job 

2  setup and installation steps-
   first install react+vite - npm create vite@latest
   second axios - npm install axios

3  How the Cron Job Works

    The cron job runs in the backend (Node/Express) using the node-cro package on Render.
    Every hour: The backend fetches the latest data from CoinGecko and updates the database (both current and historical  records).
    Frontend refreshes:  
  - Auto-refreshes every 30 minutes using a React timer.  
  - The data is always up-to-date thanks to the backend automation!
- Manual refresh: Users can also refresh instantly from the dashboard.
   
4  deployement link frontend -  https://crypto-tracker-git-main-bhanu-sharmas-projects-42c8e919.vercel.app/
   for Backend - https://crypto-tracker-4.onrender.com/api/coins




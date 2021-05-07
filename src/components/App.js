import React, { useState, useEffect } from 'react';

const fetchPrices = () => {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err)
    });
}

export default function App() {
  
  const [funds, setFunds] = useState(1000000);
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState([]);

  useEffect(() => {
    fetchPrices().then(({time, bpi}) => {
        setTime(time);
        setBpi([bpi.USD]);
      });
  }, []);

  const buyOrder = () => {
    setFunds(Math.floor(funds - bpi[0].rate_float));
  }

  const sellOrder = () => {
    setFunds(Math.floor(funds + bpi[0].rate_float));
  }

  return (
    <div>
      <h1>Coinbase Practice App</h1>
      <div>
        <div>
          <h2>Colin Eckert</h2>
          <h3>Funds: ${funds.toLocaleString()}</h3>
        </div>
        <div>
          <h2>Bitcoin Rates</h2>
          <div>
            <p>Last Updated: {time.updated}</p>
            <ul>
              {bpi.map((coin, idx) => {
                  return <li key={idx}>{coin.code}: ${coin.rate_float.toFixed(2)}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>Transactions</h2>
        <button onClick={() => buyOrder()}>Buy</button>
        <button onClick={() => sellOrder()}>Sell</button>
        <ul>
          <li>Buy</li>
          <li>Sell</li>
        </ul>
      </div>
    </div>
  )
}
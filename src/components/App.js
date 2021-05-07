import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState([]);


  function fetchPrices() {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    fetch(url)
      .then((res) => res.json())
      .then(({time, bpi}) => {
        setTime(time);
        setBpi([bpi.EUR, bpi.USD]);
      })
      .catch(err => console.log(err));
    
    const prices = bpi.map((coin, idx) => {
      return <li key={idx}>{coin.code}: {coin.rate}</li>
    });
    return prices;
  }

  const latestPrices = fetchPrices();

  return (
    <div>
      <h1>Coinbase Practice App</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <p>{count}</p>
      </div>
      <div>
        <h2>Bitcoin</h2>
        <button onClick={() => fetchPrices()}>Fetch Latest Prices</button>
        <div>
          <p>{time.updated}</p>
          {latestPrices}
        </div>
      </div>
      <h2>List Practice</h2>
      <ul>
        <li>Test</li>
      </ul>
    </div>
  )
}
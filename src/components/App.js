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
  
  const [count, setCount] = useState(0);
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState([]);

  useEffect(() => {
    fetchPrices().then(({time, bpi}) => {
        setTime(time);
        setBpi([bpi.EUR, bpi.USD]);
      });
  }, [])

  return (
    <div>
      <h1>Coinbase Practice App</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <p>{count}</p>
      </div>
      <div>
        <h2>Bitcoin</h2>
        <button onClick={fetchPrices}>Fetch Latest Prices</button>
        <div>
          <p>{time.updated}</p>
          <ul>
            {bpi.map((coin, idx) => {
                return <li key={idx}>{coin.code}: {coin.rate}</li>
            })}
          </ul>
        </div>
      </div>
      <h2>List Practice</h2>
      <ul>
        <li>Test</li>
      </ul>
    </div>
  )
}
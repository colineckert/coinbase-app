import React, { useState, useEffect } from 'react';
import Transaction from './transaction';
import '../App.css';

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
  const [coins, setCoins] = useState(0);
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrices().then(({time, bpi}) => {
        setTime(time);
        setBpi([bpi.USD]);
      });
  }, []);

  const buyOrder = () => {
    setCoins(coins + 1);
    setFunds(Math.floor(funds - bpi[0].rate_float));
    setTransactions([ ...transactions, 
      {type: "Buy", amount: bpi[0].rate_float} ]);
    setError('');
    console.log(transactions);
  }

  const sellOrder = () => {
    if (coins == 0) {
      setError("No coins to sell");
    } else {
      setCoins(coins - 1);
      setFunds(Math.floor(funds + bpi[0].rate_float));
      setTransactions([ ...transactions, 
        {type: "Sell", amount: bpi[0].rate_float} ]);
    }
    
    console.log(transactions);
  }

  return (
    <div className="order-book-container">
      <div>
        <h1>Coinbase Practice App</h1>
        <div>
          <div>
            <h2>Colin Eckert</h2>
            <h3>Funds: ${funds.toLocaleString()}</h3>
            <h3>Coins: {coins}</h3>
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
      </div>
      <div className="transactions-container">
        <h2>Transactions</h2>
        <div>{error}</div>
        <button onClick={() => buyOrder()}>Buy</button>
        <button onClick={() => sellOrder()}>Sell</button>
        <div>
          <Transaction transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
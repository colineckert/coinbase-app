import React from 'react';

export default function transaction({ transactions }) {
  return (
    <div className="transactions">
      {transactions.map(({ type, amount }, idx) => {
          return (
            <div className="order" key={idx}>
              <h3 className={`${type === "Buy" ? 'buy' : 'sell'}`}>{type}</h3>
              <p>${amount.toFixed(2)}</p>
            </div>
          )
      })}
    </div>
  )
}

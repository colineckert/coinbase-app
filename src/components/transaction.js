import React from 'react'

export default function transaction({ transactions, error, buyOrder, sellOrder }) {
  return (
    <div className="transactions">
      {transactions.map(({ type, amount }, idx) => {
          return (
            <div className={`order ${type === "Buy" ? 'buy' : 'sell'}`}
              key={idx}>{type}: ${amount.toFixed(2)}
            </div>
          )
      })}
    </div>
  )
}

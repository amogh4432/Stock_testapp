import React from 'react'

const Displaydata = ({data}) => {
  console.log(data)
    return (
        <div>
        {data.map((stock) => <div>
        <h1>symbol :    {stock.symbol}</h1>
        {stock.errorMessage ? <h1>{stock.errorMessage}</h1> :   <h1>Stockprice: {stock.open}</h1> }
        </div>)}
        </div>
    
  )
}


export default Displaydata
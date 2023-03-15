import React, {useState,useEffect} from 'react'
import Month from './Month'
import axios from 'axios'

function App() {
  const API_URL = 'http://localhost:3500/customers';
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [data, setData] = useState([]);

  useEffect(()=>{
    //we wantt ot use async await
    const fetchItems = async () => {
      try {
        const response = await fetch (API_URL)
        const listItems = await response.json();
        console.log(listItems)
        setData(listItems)
      } catch (err) {
        console.log(err.stack)
      }
    }

    fetchItems()

  },[])

  return (
    <div className="App">
    {
      data ? (
        <ul>{data.map(item=>(
          <li key={item.id}>
             Customer ID: {item.id}
             Total Rewards Points:
             <Month purchases={item.purchases} />
             {item.purchases.map(purchase=>{
              console.log(purchase)
              return <p>${purchase.price}</p>
             })}
          </li>
        ))}
        </ul>
        ) : (
          "Loading data"
        )}
        </div>
  );
}

export default App;

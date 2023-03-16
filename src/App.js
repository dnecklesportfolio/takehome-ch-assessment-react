import React, { useState, useEffect } from "react";
import Month from "./components/Month";
import { months, determineRewards } from "./utils/utils";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3500/customers";

  const monthsArr = [];
  const [data, setData] = useState([]);

  useEffect(() => {
    //we wantt ot use async await
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setData(listItems);
      } catch (err) {
        console.log(err.stack);
      }
    };

    fetchItems();
  }, []);

  const calcTotalRewards = (purchaseArr) => {
    const objPurchases = {};
    const objRewards = {};
    purchaseArr.forEach((purchase, i) => {
      let date = new Date(purchase.date);

      const month = months[date.getMonth()];
      if (objPurchases[month] === undefined) {
        monthsArr.push(month);
        objPurchases[month] = purchase.price;
        objRewards[month] = determineRewards(purchase.price);
      } else {
        objPurchases[month] += purchase.price;
        objRewards[month] += determineRewards(purchase.price);
      }
    });
    let total = 0;
    for (const reward in objRewards) {
      total += objRewards[reward];
    }
   // console.log(objPurchases); { May: 722, June: 1667, July: 446 }
    // console.log(objRewards); { May: 722, June: 1667, July: 446 }
    return total;
  };

  return (
    <div className="App">
      {data ? (
        <ul>
          {data.map((item) => {

            return (
              <li key={item.id}>
                <p>Customer ID: {item.id}</p>
                <p>Total Rewards Points: {calcTotalRewards(item.purchases)}</p>
                {monthsArr.map((month, i) => {
                  return (
                    <Month
                      key={i}
                      month={month}
                      customer={item.id}
                      purchases={item.purchases}
                    />
                  );
                })}
              </li>
            );
          })}
        </ul>
      ) : (
        "Loading data"
      )}
    </div>
  );
}

export default App;

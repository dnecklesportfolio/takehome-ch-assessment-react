import React, { useState, useEffect } from "react";
import Month from "./Month";

function App() {
  const API_URL = "http://localhost:3500/customers";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const objPurchases = {};
  const objRewards = {};
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

  const determineRewards = (price) => {
    price = Math.floor(price);

    let reward = 0;
    let remaining = price - 50;

    if (price < 0 || remaining < 0) return reward;
    if (remaining > 0 && remaining < 49) {
      reward += remaining;
    } else {
      reward = 50;
      remaining -= 50;
      reward += remaining * 2;
    }
    return reward;
  };

  const calcTotalRewards = (purchaseArr) => {
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
    return total;
  };

  const calcStats = (purchaseArr, id) => {};
  // item.id: { purchases: {May: 499, June: 963, July:373},
  //         rewards: {May: 722} }
  // item.id: { Months: [May, June,July]
  //                PurchaseTotal: [499, 963, July:373},
  //         rewards: {May: 722} }
  // item.id: [{month:May,purchases:499,rewards:373},{month:June,purchases:963,rewards:1667},{month:July,purchases:373,rewards:446}]

  return (
    <div className="App">
      {data ? (
        <ul>
          {data.map((item) => {
            calcStats(item.purchases, item.id);
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

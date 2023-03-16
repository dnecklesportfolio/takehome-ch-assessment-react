export default function Month({ month, purchases, customer }) {
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
    console.log(reward);
    return reward;
  };
  return (
    <>
      <p>{month} Reward Points:</p>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Price</th>
            <th>Date</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {purchases
            .filter((purchase) => {
              let date = new Date(purchase.date);

              return month === months[date.getMonth()];
            })
            .map((purchase, i) => {
              return (
                <tr key={purchase.purchase_id}>
                  <td>{purchase.purchase_id}</td>
                  <td>{purchase.price}</td>
                  <td>{new Date(purchase.date).toDateString()}</td>
                  <td>{determineRewards(purchase.price)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

import { months, determineRewards } from "../utils/utils";
export default function Month({ month, purchases, customer }) {
  return (
    <>
      <p>
        {month} Reward Points:{" "}
        {purchases
          .filter((purchase) => {
            //send purchases for certain month only
            let date = new Date(purchase.date);
            return month === months[date.getMonth()];
          })
          .map((purchase) => {
            //determine rewards for each purchase
            return determineRewards(purchase.price);
          })
          //add total rewards
          .reduce((acc, cur) => acc + cur, 0)}
      </p>
      <table className="month">
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

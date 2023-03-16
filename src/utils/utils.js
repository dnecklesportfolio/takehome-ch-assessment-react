export const determineRewards = (price) => {
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

 export const months = [
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

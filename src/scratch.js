let customerArr = [{
    "id": 101,
    "purchases":[{
      "purchase_id": 1,
      "price":400,
      "date": "2023-05-02T12:00:00"
      },
      {
      "purchase_id": 2,
      "price":220,
      "date": "2023-05-15T12:00:00"
      },
      {
      "purchase_id": 3,
      "price":170,
      "date": "2023-06-05T12:00:00"
      },
      {
      "purchase_id": 4,
      "price":59,
      "date": "2023-06-25T12:00:00"
      },
      {
      "purchase_id": 5,
      "price":99,
      "date": "2023-07-04T12:00:00"
      },
      {
      "purchase_id": 6,
      "price":199,
      "date": "2023-07-19T12:00:00"
      }]},
    {
    "id": 102,
    "purchases":[{
      "purchase_id": 1,
      "price":342,
      "date": "2023-05-10T12:00:00"
      },
      {
      "purchase_id": 2,
      "price":90,
      "date": "2023-05-30T12:00:00"
      },
      {
      "purchase_id": 3,
      "price":710,
      "date": "2023-06-16T12:00:00"
      },
      {
      "purchase_id": 4,
      "price":95,
      "date": "2023-06-25T12:00:00"
      },
      {
      "purchase_id": 5,
      "price":139,
      "date": "2023-07-14T12:00:00"
      },
      {
      "purchase_id": 6,
      "price":199,
      "date": "2023-07-29T12:00:00"
      }
    ]
  },{
    "id": 103,
    "purchases":[{
      "purchase_id": 1,
      "price":423,
      "date": "2023-05-03T12:00:00"
      },
      {
      "purchase_id": 2,
      "price":76,
      "date": "2023-05-23T12:00:00"
      },
      {
      "purchase_id": 3,
      "price":904,
      "date": "2023-06-19T12:00:00"
      },
      {
      "purchase_id": 4,
      "price":59,
      "date": "2023-06-22T12:00:00"
      },
      {
      "purchase_id": 5,
      "price":191,
      "date": "2023-07-24T12:00:00"
      },
      {
      "purchase_id": 6,
      "price":182,
      "date": "2023-07-27T12:00:00"
      }
    ]
  }]




const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const objPurchases={}
const objRewards={}

//A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.
// (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
const determineRewards= (price) => {
  price = Math.floor(price)
  if (price<0) return 0
  let reward= 0
  let remaining = price-50
  console.log(remaining)
  if (remaining<0) return 0
  if (remaining > 0 && remaining <49) {
    reward+=remaining;
  } else  {
    reward=50
    remaining=remaining-50
    reward+=remaining*2;
  }
return reward
}

console.log()
let purchaseArr = []
customerArr.forEach(customer=>{
 purchaseArr = customer.purchases

})

purchaseArr.forEach((purchase,i)=>{
let date = new Date(purchase.date)
  console.log(months[date.getMonth()])
  const month = months[date.getMonth()]
  if (objPurchases[month]===undefined) {
    objPurchases[month] = purchase.price;
    objRewards[month] = determineRewards(purchase.price)
  } else {
    objPurchases[month] += purchase.price
    objRewards[month] += determineRewards(purchase.price)
  }
})

console.log(objPurchases)
console.log(objRewards)

// I now see the purpose of practicing leetcode,working with objects daily, I should probably ramp on that
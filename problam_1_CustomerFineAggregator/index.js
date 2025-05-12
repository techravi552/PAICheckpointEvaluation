

const customers = [
  { name: "Aman", daysLate: 4, type: "Regular" },
  { name: "Priya", daysLate: 6, type: "VIP" },
  { name: "Dev", daysLate: 8, type: "Regular" },
  { name: "Riya", daysLate: 10, type: "VIP" }
];

 totalCollected = 0

customers
  .filter(e => e.daysLate > 5) 
  .map(e => {
     day = e.daysLate

    //  console.log(day)

     firstname = e.name
     basefine = day * 20

    if (e.type === "VIP") {

      // console.log(e.name)

       discount = (basefine * 30) / 100
      basefine = basefine - discount
    }

    //  console.log(firstname , basefine )


    console.log(`{ name : ${firstname} , fine: ${basefine} }`)
    totalCollected += basefine
  })

console.log(`totalCollected ${totalCollected}`)

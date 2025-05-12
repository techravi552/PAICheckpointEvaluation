

  allcloth= document.getElementById("product_card")


    fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
     data.map((e)=>{
        let div = document.createElement("div");

div.innerHTML = `
  <img src="${e.image}" class="product-img" alt="Product Image"/>
  <div>
  <h3>Price: $${e.price}</h3>
  <p>${e.title}</p>

    <p><b><i>Reting : ${e.rating.rate} </i></b></p>
    <button>Buy</button>
    </div>
    
  
`;

allcloth.appendChild(div);
     })
  });



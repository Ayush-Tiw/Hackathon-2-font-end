import * as React from "react";


export function Product({ image, id, name, price, summary,deleteButton,editButton}){

  return (
    <div className="product-container">
<img className="product-image" src={image} alt={name}/>
<p><span className="bold">ProductId</span>: {id}</p>
<p><span className="bold">Name</span>:  {name}</p>
<p><span className="bold">Price</span>:<span className="red"> ₹</span>{price}</p>
<p><span className="bold">Summary</span>: {summary}</p>
{deleteButton}
{editButton}


    </div>
  );
}

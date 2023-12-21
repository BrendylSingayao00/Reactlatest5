import React,  { useState, useEffect, useRef}from 'react'
import images from '../image/shopping.png'



function Resibo() {

    const [cart, setCart] = useState([]);

    const [cashInput, setCashInput] = useState(0);
    const [change, setChange] = useState(0);

    // Step 2: Update the state when the user enters cash amount
    const handleCashInputChange = (e) => {
      const enteredCash = parseFloat(e.target.value) || '';
      setCashInput(enteredCash);
    };

  
  return (
    <div>
              
            <br/>
            <hr/>
           
             <div className="shoppingPrintArea" >
            <img src={images} alt="shoppingBag" className ='shoppingImage'></img>
             <p class='RpRp'><strong>NORBUFFCI</strong><br/>
             Number 1<br/>
             Modern POS Town<br/>
             Tel: 01234567890<br/>
             Vat No: 000333666
             </p>   
            <hr/>
            <p class="refNo">
            Ref No: 15823197666 <br/>
            Cashier: Jane Doe <br/>
            Date: 07 Oct 2023 11:16:06
            </p>
            <hr/> 
            <table className="totalPrintTable">
               <tbody>
                       <tr>
                         <th>#  </th>
                         <th> Item </th>
                         <th>Qty </th>
                         <th> Price </th>
                         <th> </th>

                 </tr>  

                 {cart.map((cartProduct, index) => (
                             <tr key={index}>
                             <td>{index + 1}</td>
                             <td>{cartProduct.product_name}</td>
                             <td>{cartProduct.quantity}</td>
                             <td>₱{cartProduct.price}</td>
                             </tr>
                             ))}

                 <tr>
                       <th></th>
                       <th><strong>Total</strong></th>
                       <th> <strong>: {cart.reduce((total, item) => total + item.quantity, 0)} </strong></th>
                       <th><strong>
                        ₱{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                      </strong></th>
                       
               </tr>
               <tr>
                       <th></th>
                       <th><strong>Cash</strong></th>
                       <th><strong>:</strong></th>
                       <th><strong>₱{cashInput}</strong></th>
                       
               </tr>
               <tr>
                       <th></th>
                       <th><strong>Change</strong></th>
                       <th><strong>:</strong></th>
                       <th><strong>  ₱{change}</strong></th>
                       
               </tr>
                </tbody>
                </table>
                <br/><br/>
                <hr/>
                <p class="thankyouPO">Thank you for shopping at NORBUFFCI!
             </p>   
            </div>
            <button className="close-modalR" onClick={toggleModalR}>
           <i class="fa-solid fa-x fa-2xl"></i>
            </button>
          </div>
      
  )
}

export default Resibo
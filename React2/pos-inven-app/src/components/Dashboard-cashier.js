import React,  { useState, useEffect, useRef}from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
import images from '../image/shopping.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRole } from '../FirstNameContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import Resibo from '../layout/Resibo';
// import useReactToPrint from "react-to-print";


function DashboardCash() {
        const [modalR, setModalR] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState(null);
        const [products, setProducts] = useState([]);
        const [cart, setCart] = useState([]);


        const toggleModalR = () => {
        setModalR(!modalR);
        };

        if(modalR) {
        document.body.classList.add('active-modalR')
        } else {
        document.body.classList.remove('active-modalR')
        }

     
        const navigate = useNavigate();

    const { userRole, setUserRole } = useRole();

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);

      const handleLogoutButtonClick = () => {
        navigate('/log-out-cashier'); // Navigate to the '/pos-log-out' route
       
      };

      const { authUser } = useAuth();

      useEffect(() => {
          // Check if the user is authenticated
          if (authUser) {
            // User is authenticated, you can perform actions or show content for authenticated users here
            console.log(`Authenticated user: ${authUser}`);
          } else {
            // User is not authenticated, you can show a message or redirect to the login page
            console.log('User is not authenticated');
          }
        }, [authUser]);


        const handleCategoryClick = (category) => {
                setSelectedCategory(category === 'All' ? null : category);
              };


        useEffect(() => {
                const apiUrl = selectedCategory
                    ? `http://localhost:3001/productsall?category=${selectedCategory}`
                    : 'http://localhost:3001/productsall';
            
                fetch(apiUrl)
                    .then((response) => response.json())
                //     .then((data) => setProducts(data))
                .then((data) => {
                        console.log('Fetched products:', data); // Add this line to log the fetched products
                        setProducts(data);
                      })
                    .catch((error) => console.error('Error fetching products:', error));
            }, [selectedCategory]);



              // //incrementing the product when clicked
              // const incrementQuantity = (product) => {
              //   const updatedCart = [...cart];
              //   const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);
            
              //   if (existingProductIndex !== -1) {
              //     // Increment quantity and price
              //     updatedCart[existingProductIndex].quantity += 1;
              //     updatedCart[existingProductIndex].price += product.price; // Incrementing price
              //     setCart(updatedCart);
              //   }
            
              //   console.log('Incremented quantity:', product);
              // };

              // const incrementQuantity = (product) => {
              //   setCart((prevCart) => {
              //     const updatedCart = [...prevCart];
              //     const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);
              
              //     if (existingProductIndex !== -1) {

              //     //   if (remainingStock[product.product_name] > updatedCart[existingProductIndex].quantity) {

              //     //     const newQuantity = updatedCart[existingProductIndex].quantity + 1;

              //     //       // Calculate the new total price based on the updated quantity
              //     //           const newPrice = product.price * newQuantity;
              
              //     //     // Update quantity and total price
              //     //     updatedCart[existingProductIndex] = {
              //     //       ...updatedCart[existingProductIndex],
              //     //       quantity: newQuantity,
              //     //       price: newPrice,
              //     //     };
              
              
              //     //     // Update remaining stock
              //     //     updateRemainingStockInDatabase(product.product_name);
              //     //     console.log('Incremented quantity:', product);
              //     //   } else {
              //     //     console.log('Not enough stock to increment quantity:', product);
              //     //   }
              //     // }
              //     // return updatedCart;
              //     const newQuantity = updatedCart[existingProductIndex].quantity + 1;

              //     // Update remaining stock only if the increment is valid
              //     if (remainingStock[product.product_name] > 0) {
              //       // Deduct the remaining stock (only once)
              //       const updatedRemainingStock = { ...remainingStock };
              //       updatedRemainingStock[product.product_name] -= 1;
            
              //       // Increment quantity and update price
              //       updatedCart[existingProductIndex] = {
              //         ...updatedCart[existingProductIndex],
              //         quantity: newQuantity,
              //         price: product.price * newQuantity,
              //       };
            
              //       // Update state
              //       setCart(updatedCart);
              //       setRemainingStock(updatedRemainingStock);
              //     }
              //   }
            
              //   console.log('Incremented quantity:', product);
              //   return updatedCart;
              //   });
              // };
            
              // // Function to decrement the quantity of a product
              // const decrementQuantity = (product) => {
              //   const updatedCart = [...cart];
              //   const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);
            
              //   if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity > 1) {
              //     // Decrement quantity and price
              //     updatedCart[existingProductIndex].quantity -= 1;
              //     updatedCart[existingProductIndex].price -= product.price / product.quantity; // Decrementing price
              //     setCart(updatedCart);
              //   } else if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity === 1) {
              //           // Remove the item when quantity is 1
              //           updatedCart.splice(existingProductIndex, 1);
              //           setCart(updatedCart);
              //         }
            
              //   console.log('Decremented quantity:', product);
              // };

              const decrementQuantity = (product) => {
                // setCart((prevCart) => {
                //   const updatedCart = [...prevCart];
                //   const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);
              
                //   if (existingProductIndex !== -1) {
                //     if (updatedCart[existingProductIndex].quantity > 1) {
                //       // Decrement quantity and update price
                //       updatedCart[existingProductIndex] = {
                //         ...updatedCart[existingProductIndex],
                //         quantity: updatedCart[existingProductIndex].quantity - 1,
                //         price: product.price * (updatedCart[existingProductIndex].quantity - 1),
                //       };
              
                //       // Update remaining stock
                //       updateRemainingStockInDatabase2(product.product_name, 1); // Adding 1 back to the stock
                //     } else {
                //       // Remove the item when quantity is 1
                //       updatedCart.splice(existingProductIndex, 1);
              
                //       // Update remaining stock
                //       updateRemainingStockInDatabase2(product.product_name, 1); // Adding 1 back to the stock
                //     }
                //   }
              
                //   console.log('Decremented quantity:', product);
                //   return updatedCart;

                setCart((prevCart) => {
                  const updatedCart = [...prevCart];
                  const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);
              
                  if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity > 1) {
                    // Decrement quantity and deduct price
                    updatedCart[existingProductIndex] = {
                      ...updatedCart[existingProductIndex],
                      quantity: updatedCart[existingProductIndex].quantity - 1,
                      price:   updatedCart[existingProductIndex].price -= product.price / product.quantity // Decrementing price
                    };


                    // Update remaining stock
                       updateRemainingStockInDatabase2(product.product_name, 1);
                  } else if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity === 1) {
                    // Remove the item when quantity is 1
                    updatedCart.splice(existingProductIndex, 1);

                    // Update remaining stock
                     updateRemainingStockInDatabase2(product.product_name, 1);
                  }
              
                  console.log('Decremented quantity:', product);
                  return updatedCart;
                });
              };

              const updateRemainingStockInDatabase2 = (productName, quantity) => {
                // Make an API call to update the remaining_stock data in the database
                const updatedStock = remainingStock[productName] + quantity;
              
                fetch(`http://localhost:3001/updateStock?productName=${productName}&stock=${updatedStock}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    // You may need to include authentication headers or other required headers
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('Stock updated in the database:', data);
                    setRemainingStock((prevStock) => ({
                      ...prevStock,
                      [productName]: updatedStock,
                    }));
                  })
                  .catch((error) => console.error('Error updating stock in the database:', error));
              };

               // Function to cancel a product from the cart
                const cancelProduct = async (product) => {

                  // await updateRemainingStockInDatabase(product.product_name, product.quantity);
                  //       const updatedCart = cart.filter((p) => p.product_name !== product.product_name);
                  //       setCart(updatedCart);
                
                  //       console.log('Cancelled product:', product);
                  //       console.log('returned product:' , updateRemainingStockInDatabase)

                  try {
                    // Update the remaining stock in the database
                    updateRemainingStockInDatabase2(product.product_name, product.quantity);
                
                    // Remove the canceled product from the cart
                    const updatedCart = cart.filter((p) => p.product_name !== product.product_name);
                    setCart(updatedCart);
                
                    console.log('Cancelled product:', product);
                  } catch (error) {
                    console.error('Error cancelling product:', error);
                  }
                };

                 // Step 1: Create state for cash and change
                  const [cashInput, setCashInput] = useState(0);
                  const [change, setChange] = useState(0);

                  // Step 2: Update the state when the user enters cash amount
                  const handleCashInputChange = (e) => {
                    const enteredCash = parseFloat(e.target.value) || '';
                    setCashInput(enteredCash);
                  };

                  // Step 3: Calculate change when cash or cart changes
                  useEffect(() => {
                    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
                    const calculatedChange = cashInput - totalAmount;
                    // Ensure the change is not negative
                    const changeValue = Math.max(0, calculatedChange);
                    setChange(changeValue.toFixed(2));
                  }, [cashInput, cart]);

                  const [remainingStock, setRemainingStock] = useState({});

                              // Step 2: Update remaining stock when products are fetched
                        useEffect(() => {
                          // Fetch products and update remaining stock
                          const apiUrl = 'http://localhost:3001/productsall';
                          fetch(apiUrl)
                            .then((response) => response.json())
                            .then((data) => {
                              const stockMap = {};
                              data.forEach((product) => {
                                stockMap[product.product_name] = product.remaining_stock;
                              });
                              setRemainingStock(stockMap);
                            })
                            .catch((error) => console.error('Error fetching products:', error));
                            }, []);

                            const updateRemainingStock = (product) => {
                              setRemainingStock((prevStock) => {
                                const updatedStock = { ...prevStock };
                                if (updatedStock[product.product_name] > 0) {
                                  updatedStock[product.product_name] -= 1;
                                }
                                return updatedStock;
                              });
                            };

                              // Step 4: Add a product to the cart and update remaining stock
                            const addProductToCart = (product) => {
                            //   const existingProductIndex = cart.findIndex((p) => p.product_name === product.product_name);
                            //   let updatedCart;

                            //   if (existingProductIndex !== -1) {
                            //     // Product already exists, increment quantity
                            //     updatedCart = [...cart];
                            //     updatedCart[existingProductIndex].quantity += 1;
                            //     updatedCart[existingProductIndex].price += product.price;
                            //   } else {
                            //     // Product does not exist, add to cart
                            //     updatedCart = [...cart, { ...product, quantity: 1 }];
                            //   }

                            //   if (remainingStock[product.product_name] > 0) {
                            //     updatedCart.forEach((cartProduct) => {
                            //       if (cartProduct.product_name === product.product_name) {
                            //         setRemainingStock((prevStock) => ({
                            //           ...prevStock,
                            //           [product.product_name]: prevStock[product.product_name] - 1,
                            //         }));
                            //       }
                            //     });
                              

                            //   updateRemainingStockInDatabase(product.product_name);
                            //   recordSale(product.product_name);


                            //   setCart(updatedCart);
                            //   updateRemainingStock(product);

                            //   console.log('Added to cart:', product);
                            //   console.log('Updated Cart:', updatedCart);
                            // } else {
                            //   // Show error if there is no remaining stock
                            //   alert(`No stock left for ${product.product_name}. Please restock.`);
                            // }


                            //2nd try
                             // Check if there is remaining stock
                                if (remainingStock[product.product_name] > 0) {
                                  // Add the product to the cart
                                  const updatedCart = [...cart];
                                  const existingProductIndex = updatedCart.findIndex((p) => p.product_name === product.product_name);

                                  if (existingProductIndex !== -1) {
                                    // Increment quantity and price
                                    updatedCart[existingProductIndex].quantity += 1;
                                    updatedCart[existingProductIndex].price += product.price; // Incrementing price
                                  } else {
                                    // Add a new product to the cart
                                    updatedCart.push({
                                      ...product,
                                      quantity: 1,
                                    });
                                  }

                                  // Deduct the remaining stock (only once)
                                  const updatedRemainingStock = { ...remainingStock };
                                  updatedRemainingStock[product.product_name] -= 1;

                                  // Update state
                                  setCart(updatedCart);
                                  setRemainingStock(updatedRemainingStock);
                                } else {
                                  // Display an error message or show an alert
                                  alert('No stock left for this product. Please restock.');
                                }
                            };

                            const updateRemainingStockInDatabase = (productName) => {
                              // Make an API call to update the remaining_stock data in the database
                              // You can use fetch or your preferred method to send the updated stock to the server
                              const updatedStock = remainingStock[productName];
                              fetch(`http://localhost:3001/updateStock?productName=${productName}&stock=${updatedStock}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  // You may need to include authentication headers or other required headers
                                },
                                // You can include a body with additional data if needed
                                // body: JSON.stringify({ productName, stock: updatedStock }),
                              })
                                .then((response) => response.json())
                                .then((data) => console.log('Stock updated in the database:', data))
                                .catch((error) => console.error('Error updating stock in the database:', error));
                            };
                            
                            const recordSale = () => {
                              
                              // // Make an API call to record the sale for the current day and update the monthly total sales
                              // fetch(`http://localhost:3001/recordSale?productName=${productName}`, {
                              //   method: 'POST',
                              //   headers: {
                              //     'Content-Type': 'application/json',
                              //     // You may need to include authentication headers or other required headers
                              //   },
                              //   // You can include a body with additional data if needed
                              //   // body: JSON.stringify({ productName }),
                              // })
                              //   .then((response) => response.json())
                              //   .then((data) => console.log('Sale recorded:', data))
                              //   .catch((error) => console.error('Error recording sale:', error));

                               // Calculate the total quantity of items in the cart
                                  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

                                  // Make an API call to record the sale for each product in the cart
                                  cart.forEach((cartProduct) => {
                                    const { product_name, quantity } = cartProduct;
                                    
                                    fetch(`http://localhost:3001/recordSale?productName=${product_name}`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        // You may need to include authentication headers or other required headers
                                      },
                                      body: JSON.stringify({ quantity }),
                                    })
                                      .then((response) => response.json())
                                      .then((data) => console.log(`Sale recorded for ${product_name} (${quantity} items):`, data))
                                      .catch((error) => console.error(`Error recording sale for ${product_name}:`, error));
                                  });
                            };

                             // Function to clear the entire cart
                            const clearCart = () => {
                              // setCart([]);

                               // Restore quantities to remaining stock
                                      const updatedRemainingStock = { ...remainingStock };
                                      cart.forEach((product) => {
                                        updatedRemainingStock[product.product_name] += product.quantity;
                                      });

                                      // Clear the cart
                                      setCart([]);

                                      // Update state to reflect changes
                                      setRemainingStock(updatedRemainingStock);

                                      // Optionally, make an API call to update the remaining_stock data in the database
                                      Object.entries(updatedRemainingStock).forEach(([productName, stock]) => {
                                        updateRemainingStockInDatabase2(productName, stock - remainingStock[productName]);
                                      });
                            };

                            // Function to save the transaction
                            const saveTransaction = async () => {
                              // Make an API call to save the transaction and update the remaining stock
                              const promises = cart.map((cartProduct) => {
                                return Promise.all([
                                  updateRemainingStockInDatabase(cartProduct.product_name),
                                  recordSale(cartProduct.product_name),
                                ]);
                              });

                              // Wait for all promises to resolve
                              await Promise.all(promises);

                              // Clear the cart after saving
                              clearCart();

                               // Clear the cash input
                              setCashInput('');
                            };

                            const [searchProducts, setSearchProducts] = useState([])
                      
                            async function handleSearchBar(e){
                              const newData = searchProducts.filter(row => {
                                return (
                                  row.category.toLowerCase().includes(e.toLowerCase()) ||
                                  row._id.toString().toLowerCase().includes(e.toLowerCase()) ||
                                  row.product_name.toLowerCase().includes(e.toLowerCase())
                                )
                              })
                              setProducts(newData)
                          
                            }

                            useEffect(() => {
                              axios.get('http://localhost:3001/products') // Replace 'accounts' with your API endpoint
                                .then((response) => {
                                  setProducts(response.data);
                                  setSearchProducts(response.data)
                      
                                  console.log(response.status.message)
                                  console.log(response.data)
                                  if (response.status === 200) {
                                    // setShow(false);
                                   
                                  }
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                            }, []);
   
                            const handlePrint = async () => {
                              // Get the content you want to print
                              const contentToPrint = document.getElementById('content-to-print').innerHTML;
                          
                              try {
                                const response = await fetch('http://localhost:3001/print', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ content: contentToPrint }),
                                });
                          
                                const result = await response.json();
                          
                                if (result.success) {
                                  console.log('Print job sent successfully');
                                } else {
                                  console.error('Error sending print job:', result.error);
                                }
                              } catch (error) {
                                console.error('Error sending print request:', error);
                              }
                            };

    return(

    <div>
    <div className="POScontainer">
            <div className="mainPOScontainer">
                  <div className="posHeader">
                  <h1 id="cashierHead">NORBUFFCI</h1>
    
                               <div className="button-add">  
                
                              <button id="productModal" data-toggle="modal" data-target="#Products" type="button" className="btnAdd" >
                              <i class="fa-solid fa-calendar-days"> </i> &nbsp; Date &nbsp; &nbsp; 
                              
                              <button id="newProductModal" data-toggle="modal" data-target="#newProduct" type="button" className="btnAdds" >
                                      <i className="fa fa-plus"></i> 
                             </button> </button>
                          
                              &nbsp; 

                                    <button id="usersModal" data-toggle="modal" data-target="#Users" type="button" className="btnUsers">
                                    <i class="fa-regular fa-user"></i>  Cashiers
                                    </button>
                                    
                                  
                                
                                 
                                <button id="quit"  className="btnOFF" onClick={handleLogoutButtonClick} >
                                {/* <Link to="/log-out-cashier" id="logout" class='btnOFF'> */}
                                        <i className="fa-solid fa-power-off"></i>
                                        {/* </Link> */}
                                {/* <i className="fa fa-power-off fa-1"></i> */}
                                </button>
                             
                                </div>
                                </div>
                   <br></br> <br></br>
            
                   <div className="categories">
           
           <button type="button" className="category-link"  onClick={() => handleCategoryClick("All")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-list"></i> All</a>
           </button>

           <button type="button" className="category-link" onClick={() => handleCategoryClick("Bath Soap")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-pump-soap"></i> Bath Soap</a>
           </button>
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Beverages")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fas fa-wine-bottle"></i> Beverages</a>
           </button>
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Canned Goods")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-jar"></i> Canned Goods</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Cigarettes")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           {/* <FontAwesomeIcon icon="fa-regular fa-smoking" /> */}
           <i class="fa-solid fa-smoking"></i>
            Cigarettes</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Coffee Prod")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-mug-saucer"></i> Coffee Prod</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Cosmestic")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-person-dress"></i>Cosmetic</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Energy Drinks")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-bolt"></i>  Energy Drinks</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Feeds")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-cubes-stacked"></i>  Feeds</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Fuel")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-gas-pump"></i> Fuel</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Grocery Items")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-cart-shopping"></i>  Grocery Items</a>
           </button> 
         <button type="button" className="category-link" onClick={() => handleCategoryClick("Hardware Elec")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-microchip"></i>  Hardware Elec</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Ingredients")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-pepper-hot"></i> Ingredients</a>
           </button>  
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Juice")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-whiskey-glass"></i>  Juice</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Kitchen Items")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-kitchen-set"></i>  Kitchen Items</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Liquor")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-champagne-glasses"></i> Liquor</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Landry Items")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-jug-detergent"></i> Laundry Items</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Laundry Soup")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-soap"></i>  Laundry Soap</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("LPG")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-fire-flame-curved"></i>  LPG</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Medicines")}>
           <a   data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-pills"></i> Medicines</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Milk Product")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-cow"></i> Milk Product</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Other items")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-bars-progress"></i>Other Items</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Pastries")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-bread-slice"></i> Pastries</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Sanitary item")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-hand-holding-droplet"></i>Sanitary Item</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Selecta")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-ice-cream"></i> Selecta</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("School Items")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-pen-to-square"></i>  School Items</a>
           </button> 
           <button type="button" className="category-link" onClick={() => handleCategoryClick("Soft Drinks")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-bottle-droplet"></i>  Soft Drinks</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Rice")}>
           <a data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-bowl-rice"></i> Rice</a>
           </button> 
            <button type="button" className="category-link" onClick={() => handleCategoryClick("Frozen")}>
           <a  data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-icicles"></i>Frozen</a>
           </button>
                <button type="button" className="category-link" onClick={() => handleCategoryClick("Nestle Ice Cream")}>
           <a  data-toggle="pill" href="#nav-tab-card">
           <i class="fa-solid fa-ice-cream"></i> Nestle Ice Cream</a>
           </button>
           
           </div> 
           <div className="centerProduct" style={{ overflow: 'hidden' }}>
                  <div class="centerSearchProduct" >
		<form action="#" className="search-wrap" >
			<div class="input-group">
			    <input type="text" class="form-control" placeholder="Search" onChange={(e) => handleSearchBar(e.target.value)}></input>
			    <div class="input-group-append">
			      {/* <button class="btn btn-primary" type="submit">
			        <i class="fa fa-search"></i>
			      </button> */}
			    </div>
		    </div>
		</form>


        <div className="productsPOS">

                  {/* Filter and display products based on the selected category */}

                <div className='row'>
            {products.map((product, key) => (
      <div key={key} className="col-lg-4 mb-4">
        <div className="pos-item px-1 text-center border"  onClick={() => addProductToCart(product)}>
         <strong><p className='productNAMES'> {product.product_name}</p></strong> 
          {/* Add an image tag here if needed */}
          <p className='priceHieght'>₱ {product.price}</p>
          <p>Remaining Stock: {remainingStock[product.product_name]}</p>
        </div>
      </div>
    ))}
                </div>


        
                          
                </div>
               </div>

              
                </div>

                
                <div className="totalProductPage">
                {/* <div className="productPage"> */}
                 <div className="productPageTotal">
                    <div className="titleTP">
                <h3>New Orders </h3> 
                       {/* <div className="cancel"> <button onClick={() => removeProduct(cartProduct)}>  */}
                       <div className="cancel"> 
                       <button onClick={clearCart}> 
                       <i class="fa-solid fa-square-xmark" style={{color: "red", fontSize:"20px"}}></i></button></div>
                       <hr />
                       <div class="itemHeader">
                       <thead>
                       <tr>
                         <th>#  </th>
                         <th> Item </th>
                         <th>Qty </th>
                         <th> Price </th>
                         <th> </th>

                 </tr>  
                 </thead>
                 {/* <div className="mascroll">
                 <div className="totalPContainer"> */}
                 {/* <tbody className="mascroll">
                             

                             {cart.map((cartProduct, index) => (
                             <tr key={index}>
                             <td>{index + 1}</td>
                             <td>{cartProduct.product_name}</td>
                             <td>{cartProduct.quantity}</td>
                             <td>₱{cartProduct.price}</td>
                             <td>
                             <button className="quantityButton" onClick={() => incrementQuantity(cartProduct)}>
                                 <i className="fa-solid fa-circle-plus"  style={{ color: 'rgb(39, 153, 5)' }}></i>
                                </button>
                                <button className="quantityButton" onClick={() => decrementQuantity(cartProduct)}>
                                 <i className="fa-solid fa-circle-minus" style={{ color: '#2c8cb5 '}}></i>
                                </button>
                                <button className="cancelItem" onClick={() => cancelProduct(cartProduct)}>
                                <i className="fa-solid fa-circle-xmark" style={{ color: 'rgb(224, 3, 3)' }}></i>
                                </button>
                             </td>
                             </tr>
                             ))}
                             
                            
             </tbody> */}

<tbody className="mascroll">
          {cart.map((cartProduct, index) => (
            // Check if the quantity is greater than 0 before rendering
            cartProduct.quantity > 0 && (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cartProduct.product_name}</td>
                <td>{cartProduct.quantity}</td>
                <td>₱{cartProduct.price}</td>
                <td>
                  {/* <button className="quantityButton" onClick={() => incrementQuantity(cartProduct)}>
                    <i className="fa-solid fa-circle-plus" style={{ color: 'rgb(39, 153, 5)' }}></i>
                  </button> */}
                  <button className="quantityButton" onClick={() => decrementQuantity(cartProduct)}>
                    <i className="fa-solid fa-circle-minus" style={{ color: '#2c8cb5' }}></i>
                  </button>
                  <button className="cancelItem" onClick={() => cancelProduct(cartProduct)}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: 'rgb(224, 3, 3)' }}></i>
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
                 </div>
                 </div>
                

              
                <div class="totalArea" >
              
                         <tfoot>
                                  <tr>
                                    <th colSpan="2">Total items:</th>
                                    <th colSpan="2" >{cart.reduce((total, item) => total + item.quantity, 0)}</th>
                                  </tr>
                                  <tr >
                                    <th colSpan="2">Total:</th>
                                    <th colSpan="2" >
                                      <strong>
                                      ₱{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                      </strong>
                                    </th>
                                  </tr>
                                  
                                  <tr className="cash">
                                    <td></td>
                                <td>Cash: </td>
                                <td ><input className='cashInput' type='number' value={cashInput}  onChange={handleCashInputChange} ></input></td>
                                
                         </tr>
                         <tr className="change">
                                <td></td>
                                <td >Change:</td>
                                <td ><strong> ₱{change}</strong></td>
                         </tr>
                                </tfoot>
                </div>

               
                </div>


                <div className="SAVE">
               <button type="submit" onClick={saveTransaction}><i class="fa-solid fa-floppy-disk"></i>SAVE </button>
                </div>
                <div className="PAY">
               <button onClick={toggleModalR} className="btn-modal"><i class="fa-solid fa-wallet"></i>PAY</button>
                </div>
              
                
                
                {modalR && (
        <div className="modalR">
          <div onClick={toggleModalR} className="overlay"></div>
          <div className="modalR-content"> 
          <button className="print-modalR" onClick={handlePrint}>    Print  </button>  

                  {/* <Resibo ref={printRef}/> */}
                 


          {/* <button className="print-modalR" onClick={toggleModalR}>    Print  </button>  */}
{/* 
      <button className="print-modalR" onClick={handlePrint}>    Print  </button>  */}
    
          

            <br/>
            <hr/>
           
             <div  className="shoppingPrintArea" id="content-to-print">
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
        </div>
      )} 
                </div>


        
                  </div>   
                 </div>     
                  </div> 

        )
}


export default DashboardCash;
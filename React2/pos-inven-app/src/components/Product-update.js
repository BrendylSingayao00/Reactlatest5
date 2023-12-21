
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
import images from '../image/logo.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRole } from '../FirstNameContext';
import AdminSidebar from '../layout/AdminSidebar';
import axios from 'axios'

function InventoryUpdate() {
    const { userRole, setUserRole } = useRole();

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);
      const [show, setShow] = useState(false);
      const [Product_id, setProduct_id] = useState()
      const [category, setCategory] = useState()
      const [product_name, setProduct] = useState();
      const [price, setPrice] = useState();
      const [stock, setStock] = useState();
      const [amount, setAmount] = useState();
      const [remaining_stock, setRemainingStock] = useState();

      const handleSubmit = (e) => {
        e.preventDefault()

        const object = {
        _id: Product_id,
        category: category,
        product_name: product_name,
        price: price,
        stock: stock,
        amount: amount,
        remaining_stock: parseInt(stock, 10)
        }


        const existingProduct = products.find((product) => product._id === Product_id);

  if (existingProduct) {
    // Update the existing product
    const updatedProducts = products.map((product) =>
      product._id === Product_id
        ? { ...product, stock: product.stock + parseInt(stock, 10) }
        : product
    );

    setProducts(updatedProducts);
  } else {
        axios.post('http://localhost:3001/productinsert', {product:object})
        .then((result) => {
           console.log(result.data.product)

           if (result.status === 201) {
            setShow(false);
            alert("Product Inserted Successfully")
            // window.location.reload();
            const updatedRemainingStock = result.data.product.remaining_stock + parseInt(stock, 10);
            axios.put(`http://localhost:3001/products/${result.data.product._id}`, {
              remaining_stock: updatedRemainingStock
            })
            .then((response) => {
              console.log(response.data.product);
            })
            .catch((error) => {
              console.error(error);
              window.alert('Error updating remaining stock. Please try again.');
            });
          }
           
        })
        .catch(err => console.log(err))
        console.log(object);
      }
      
  console.log(object);
};

      const [products, setProducts] = useState([]); // State to hold account data
      const [searchProducts, setSearchProducts] = useState([])

      // ...
    
      // Fetch account data from the server when the component mounts
      useEffect(() => {
        axios.get('http://localhost:3001/products') // Replace 'accounts' with your API endpoint
          .then((response) => {
            setProducts(response.data);
            setSearchProducts(response.data)

            console.log(response.status.message)

            if (response.status === 200) {
              setShow(false);
             
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);


    //   const handleAddButtonClick = () => {
    //     // Clear the form fields and hide the form
    //     setShow(false);
    //     alert("Product Successfully added")
    //     window.location.reload();
    // };

    //SET FIRST LETTER UPPERCASE 
    const handleInputChange = (e, setState) => {
      const newValue = e.target.value;
      setState(newValue.charAt(0).toUpperCase() + newValue.slice(1));
    };
      //editing the product


      const [editProduct, setEditProduct] = useState(null);
      const [showEditForm, setShowEditForm] = useState(false);
  
      // Function to handle the edit button click
      const handleEditClick = (product) => {
          setEditProduct(product);
          setShowEditForm(true);
      };

      useEffect(() => {
        if (editProduct) {
            setPrice(editProduct.price);
            setStock(editProduct.stock);
            setAmount(editProduct.amount);
        }
    }, [editProduct]);


    // Function to handle the form submission
    const handleFormSubmit = (e) => {
      e.preventDefault();

      // Update the product data in the database (you need to implement this)
      const updatedProduct = {
          price: price,
          stock: stock,
          amount: amount
      };

      axios.put(`http://localhost:3001/products/${editProduct._id}`, updatedProduct)
          .then((result) => {
              console.log(result.data.product);
              // Reload the products data after the update
              axios.get('http://localhost:3001/products')
                  .then((response) => {
                      setProducts(response.data);
                      alert('Product updated successfully!');
                      // window.location.reload();
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          })
          .catch((err) => {
              console.log(err);
              window.alert('Error updating product. Please try again.');
          });

      // Clear the form fields and reset the editing state
      
      setEditProduct(null);
      setShowEditForm(false);
  };


    const handleCancelClick = () => {
      // Clear the form fields and reset the editing state
      setEditProduct(null);
      setShowEditForm(false);
  }


  // Function to handle the delete button click
  const handleDeleteClick = (productId) => {
    // Make a request to the server to delete the product
    axios.delete(`http://localhost:3001/productsdel/${productId}`)
      .then((result) => {
        console.log(result.data); // Log the result from the server (optional)

        // Update the frontend state to remove the deleted product
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
        window.alert('Product deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        window.alert('Error deleting product. Please try again.');
      });
  };

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

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

    // Pad single-digit months with a leading zero
    const paddedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

    return `${currentDate.getFullYear()}-${paddedMonth}`;
  }
     

    return(
      <div className="container-xxl" >
    
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
              <span className="sr-only">Loading...</span>
          </div>
      </div> */}
  
  {/* style={isOpen ? sidebarStyle.open : sidebarStyle.closed} */}
  
     <AdminSidebar></AdminSidebar>

          <div className="content">
            
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </a>
                {/* <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
                    <i className="fa fa-bars"></i> */}
                {/* </a> */}
                <form className="d-none d-md-flex ms-1">
                    <input id="searchBar" className="form-control border" type="search" placeholder="Search" onChange={(e) => handleSearchBar(e.target.value)} />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                
                    <div className="nav-item dropdown">
                        {/* <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> */}
                            {/* <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style= {{width: "40px", height: "40px" }}></img> */}
                            <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                            <span className="d-none d-lg-inline-flex" >{userRole}</span>
                        {/* </a> */}
                       
                    </div>
                </div>
            </nav>
            <div className='content-for-inven-up bg-light'>
                <div className='addNewProduct'>
           <h2>PRODUCT</h2> 
            <button  className="btnaddNewProduct" onClick={()=>setShow(!show)}> <i class="fa-solid fa-plus"></i>&nbsp;Add New </button>
            <div className="addProductForm">
            <div className= "addProductHide">
            { show && 
                        <form className="FormProduct" onSubmit={handleSubmit} >
                            <div class="col-sm-12">
                                <div class="rows">
                                <div class="colNP form-group">
                                        <input type="number" placeholder="Product_id" class="form-control" name='Product_id' required onChange={(e) => setProduct_id(e.target.value)}></input>
                                        </div>
                                    <div class="colNP form-group">
                                       
                                        <select class="form-control" name='category' required onChange={(e) => setCategory(e.target.value)}>
                                      {/* Add an option for each category */}
                                      <option value="Bath Soap">Bath Soap</option>
                                      <option value="Beverages">Beverages</option>
                                      <option value="Canned Goods">Canned Goods</option>
                                      <option value="Cigarettes">Cigarettes</option>
                                      <option value="Coffee Prod">Coffee Prod</option>
                                      <option value="Cosmestic">Cosmestic</option>
                                      <option value="Energy Drinks">Energy Drinks</option>
                                      <option value="Feeds">Feeds</option>
                                      <option value="Fuel">Fuel</option>
                                      <option value="Grocery Items">Grocery Items</option>
                                      <option value="Hardware Elec">Hardware Elec</option>
                                      <option value="Ingredients">Ingredients</option>
                                      <option value="Juice">Juice</option>
                                      <option value="Kitchen Items">Kitchen Items</option>
                                      <option value="Liquor">Liquor</option>
                                      <option value="Landry Items">Laundry Items</option>
                                      <option value="Laundry Soup">Laundry Soup</option>
                                      <option value="LPG">LPG</option>
                                      <option value="Medicines">Medicines</option>
                                      <option value="Milk Product">Milk Product</option>
                                      <option value="Other items">Other items</option>
                                      <option value="Pastries">Pastries</option>
                                      <option value="Sanitary item">Sanitary item</option>
                                      <option value="Selecta">Selecta</option>
                                      <option value="School Items">School Items</option>
                                      <option value="Soft Drinks">Soft Drinks</option>
                                      <option value="Rice">Rice</option>
                                      <option value="Frozen">Frozen</option>
                                      <option value="Nestle Ice Cream">Nestle Ice Cream</option>
                                      
    </select>
                                        {/* <input type="text" placeholder="Category" class="form-control" name='category' required onChange={(e) => setCategory(e.target.value)}></input> */}
                                    </div>
                                    <div class="colNP form-group">
                                    <input type="text" placeholder="Product Name" class="form-control" name='product_name'  value={product_name} required  onChange={(e) => handleInputChange(e, setProduct)}></input>

                                        {/* <input type="text" placeholder="Product Name" class="form-control" name='product_name'  value={product_name} required onChange={(e) => setProduct(e.target.value)}></input> */}
                                    </div>
                                    <div class="colNP form-group">
                                       
                                        <input type="number" placeholder="Price" class="form-control" name='price'  required onChange={(e) => setPrice(e.target.value)}></input>
                                    </div>
                                    <div class="colNP form-group">
                                        
                                        <input type="number" placeholder="Stock" class="form-control" name='stock'  required onChange={(e) => setStock(e.target.value)}></input>
                                    </div>
                                    <div class="colNP form-group">
                                       
                                        <input type="number" placeholder="Amount" class="form-control" name='amount'  required onChange={(e) => setAmount(e.target.value)}></input>
                                    </div>
                                </div>					
                                             					
                                </div>
                                <div className="btnAddProductSubmit">	
                                <button className="btnAddProductSubmit" type="submit" ><i class="fa-solid fa-circle-plus"></i></button>
                                </div>
                        </form> }
            </div>    
        
        <div className="updateProductTableHeader">
        <thead>
                                <tr> 
                                <th>ID</th>
                                        <th>CATEGORY</th>
                                        <th>PRODUCT</th>
                                        <th>UNIT PRICE</th>
                                        <th>CURRENTLY ADDED STOCK</th>
                                        <th>AMOUNT</th>
                                        <th>SOLD</th>
                                        <th>REMAINING STOCK</th>
                                        <th>  </th>
                                </tr>
                                </thead>

        </div>
            <div className="updateProductTable">
                                <table style={{  tableLayout: 'fixed' }}>
                              
                                <tbody>

{products.map((productdata) => {
    // Parse sales values to integers, default to 0 if NaN
    const dailySales = productdata.daily_sales ? productdata.daily_sales.reduce((total, sale) => total + sale.quantity, 0) : 0;
    const monthlySales = productdata.monthly_sales ? Object.values(productdata.monthly_sales).reduce((total, monthSales) => total + monthSales, 0) : 0;

    console.log("this is all the daily sales" + dailySales +"and this is all the monthlysales" + monthlySales)
    // Calculate total sales
    const totalSales = dailySales + monthlySales;

    return (
      <tr key={productdata._id}>
        <td>{productdata._id}</td>
        <td>{productdata.category}</td>
        <td>{productdata.product_name}</td>
        <td>
          {showEditForm && editProduct && editProduct._id === productdata._id ? (
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              name="price"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price} // Set the value attribute to the state value
            />
          ) : (
            productdata.price
          )}
        </td>
        <td>
          {showEditForm && editProduct && editProduct._id === productdata._id ? (
            <input
              type="number"
              placeholder="Stock"
              className="form-control"
              name="stock"
              required
              onChange={(e) => setStock(e.target.value)}
              value={stock} // Set the value attribute to the state value
            />
          ) : (
            productdata.stock
          )}
        </td>
        <td>
          {showEditForm && editProduct && editProduct._id === productdata._id ? (
            <input
              type="number"
              placeholder="Amount"
              className="form-control"
              name="amount"
              required
              onChange={(e) => setAmount(e.target.value)}
              value={amount} // Set the value attribute to the state value
            />
          ) : (
            productdata.amount
          )}
        </td>
        <td>{totalSales}</td>
        <td>{productdata.remaining_stock}</td>
        <td>
          {showEditForm && editProduct && editProduct._id === productdata._id ? (
            <>
              <button className="saveBtn" onClick={handleFormSubmit}>
                <i class="fa-solid fa-circle-check"></i>
              </button>
              <button className="cancelBtn" onClick={handleCancelClick}>
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </>
          ) : (
            <button className="editBtn" onClick={() => handleEditClick(productdata)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          )}
          <button class="deleteBtn" onClick={() => handleDeleteClick(productdata._id)}>
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    );
  })}
        </tbody>
                
                              </table>
                </div>

            </div>	
            </div>
          </div>
    </div>

  </div>
    )
}
    

export default InventoryUpdate;
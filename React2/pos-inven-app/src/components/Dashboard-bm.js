import React,  { useState, useEffect } from 'react'
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import about from './Abouts'
import Chart from 'chart.js/auto';
import images from '../image/logo.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRole } from '../FirstNameContext';
import BMsidebar from '../layout/BMsidebar';
import { useAuth } from '../context/AuthContext';
import Calendars from '../layout/CalendarNi';
import Weather from '../layout/Weather';
import axios from 'axios';


function Dashboardbm() {

    const { userRole, setUserRole } = useRole();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);

      useEffect(() => {
        // Select the canvas element by its ID
        const canvas = document.getElementById("worldwide-sales");
    
        if (canvas) {
          // Destroy the existing Chart instance (if it exists)
          if (canvas.chart) {
            canvas.chart.destroy();
          }
    
          // Get the 2D context for the canvas
          const ctx = canvas.getContext("2d");
    
          // Chart drawing code
          canvas.chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
              datasets: [
                {
                  label: "USA",
                  data: [15, 30, 55, 65, 60, 80, 95],
                  backgroundColor: "rgba(0, 156, 255, .7)"
                },
                {
                  label: "UK",
                  data: [8, 35, 40, 60, 70, 55, 75],
                  backgroundColor: "rgba(0, 156, 255, .5)"
                },
                {
                  label: "AU",
                  data: [12, 25, 45, 55, 65, 70, 60],
                  backgroundColor: "rgba(0, 156, 255, .3)"
                }
              ],
            },
            options: {
              responsive: true
            }
          });
        }
      }, []);

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


      useEffect(() => {
        // Select the canvas element by its ID
        const canvas2 = document.getElementById("salse-revenue");
    
        if (canvas2) {
          // Destroy the existing Chart instance (if it exists)
          if (canvas2.chart) {
            canvas2.chart.destroy();
          }
    
          // Get the 2D context for the canvas
          const ctx2 = canvas2.getContext("2d");
    
          // Chart drawing code for Salse & Revenue
          canvas2.chart = new Chart(ctx2, {
            type: "line",
            data: {
              labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
              datasets: [
                {
                  label: "Salse",
                  data: [15, 30, 55, 45, 70, 65, 85],
                  backgroundColor: "rgba(0, 156, 255, .5)",
                  fill: true
                },
                {
                  label: "Revenue",
                  data: [99, 135, 170, 130, 190, 180, 270],
                  backgroundColor: "rgba(0, 156, 255, .3)",
                  fill: true
                }
              ],
            },
            options: {
              responsive: true
            }
          });
        }
      }, []);

      const calculateTotalSalesWithDailyMonthly = () => {
        if (!products || !Array.isArray(products)) {
          return 0;
        }
      
        // Calculate total sales for all products, summing up daily_sales and monthly_sales
        const totalSales = products.reduce((total, product) => {
          const dailySales = product.daily_sales ? product.daily_sales.reduce((dailyTotal, sale) => dailyTotal + Number(sale.quantity), 0) : 0;
          const monthlySales = product.monthly_sales ? Object.values(product.monthly_sales).reduce((monthlyTotal, monthSales) => monthlyTotal + Number(monthSales), 0) : 0;
      
          console.log(`Product: ${product.product_name}, Daily Sales: ${dailySales}, Monthly Sales: ${monthlySales}`);
      
          return total + dailySales + monthlySales;
        }, 0);
      
        console.log('Total Sales:', totalSales);
      
        return totalSales;
      };


      const calculateTotalSalesWithMonthly = () => {
        if (!products || !Array.isArray(products)) {
            return 0;
        }
    
        // Calculate monthly sales for all products, summing up all the monthly_sales
        const totalSales = products.reduce((total, product) => {
            const monthlySales = product.monthly_sales ? Object.values(product.monthly_sales).reduce((monthlyTotal, monthSales) => monthlyTotal + Number(monthSales), 0) : 0;
    
            console.log(`Product: ${product.product_name}, Monthly Sales: ${monthlySales}`);
    
            return total + monthlySales; // Accumulate the monthly sales for each product
        }, 0);
    
        console.log('Total Sales:', totalSales);
    
        return totalSales;
    };


      useEffect(() => {
        axios.get('http://localhost:3001/products') // Replace 'accounts' with your API endpoint
          .then((response) => {
            setProducts(response.data);
    
           // console.log(response.status.message)
           console.log("Fetched Product Data:", response.data);
    
            if (response.status === 200) {
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    
      useEffect(() => {
        // Calculate total sales only when the products state changes
        const totalSales = calculateTotalSalesWithDailyMonthly();
        console.log('Total Sales:', totalSales);
      }, [products]);
    
      const calculateTotalRevenue = () => {
        if (!products || !Array.isArray(products)) {
          return 0;
        }
      
        // Calculate total revenue for all products, summing up price * quantity for each product
        const totalRevenue = products.reduce((total, product) => {
          const dailySales = product.daily_sales ? product.daily_sales.reduce((dailyTotal, sale) => dailyTotal + (product.price * sale.quantity), 0) : 0;
          const monthlySales = product.monthly_sales ? Object.values(product.monthly_sales).reduce((monthlyTotal, monthSales) => monthlyTotal + (product.price * monthSales), 0) : 0;
      
          return total + dailySales + monthlySales;
        }, 0);
      
        return totalRevenue;
      };
    
             
    return(
        <div className="container-xxl" >
    
        {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}
    
    {/* style={isOpen ? sidebarStyle.open : sidebarStyle.closed} */}
    
       <BMsidebar></BMsidebar>
       <div className="content">
              
              <nav className="navbar navbar-expand bg-light navbar-light sticky-top" >
                  
                  <div className="navbar-nav align-items-center ms-auto">
                  
                      <div className="nav-item dropdown">
                          {/* <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> */}
                              {/* <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style= {{width: "40px", height: "40px" }}></img> */}
                              <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                              <span className="d-none d-lg-inline-flex" >{userRole}</span>
                        
                      </div>
                  </div>
              </nav>
              <div className="container-fluid pt-4 px-4">
    <div className="row g-4 mb-3">
    <div className="col-sm-6 col-xl-3 ">
            <div className="bg-light rounded d-flex align-items-center justify-content-between p-3">
                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                <div className="ms-4">
                <p className="mb-3" style={{ fontSize: '15px', marginLeft: '-5px' }}>Current Month Sale Count </p>
                    <h6 className="mb-0">{calculateTotalSalesWithMonthly()}</h6>
                </div>
            </div>
        </div>
        <div className="col-sm-6 col-xl-3 ">
            <div className="bg-light rounded d-flex align-items-center justify-content-between p-3">
                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                <div className="ms-4">
                <p className="mb-3" style={{ fontSize: '15px', marginLeft: '-5px' }}>Total Product Sales Count</p>
                    <h6 className="mb-0">{calculateTotalSalesWithDailyMonthly()}</h6>
                </div>
            </div>
        </div>
       
        <div className="col-sm-6 col-xl-3 ">
            <div className="bg-light rounded d-flex align-items-center justify-content-between p-3">
                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                <div className="ms-4">
                    <p className="mb-3">Total Revenue</p>
                    <h6 className="mb-0">₱{calculateTotalRevenue()}</h6>
                </div>
            </div>
        </div>

       

    </div>
       
    
    <div className="row g-4">
        <div className="col-sm-12 col-xl-9">
            <div className="bg-light text-center rounded p-4"style={{ height: '350px' }}>
                <div className="d-flex align-items-center justify-content-between ">
                    <h6 className="mb-0">Worldwide Sales</h6>
                    <a href="">Show All</a>
                </div>
                <canvas id="worldwide-sales"></canvas>
            </div>
        </div>
       
       
        <div className="col-sm-12 col-xl-3 ">
            <div className="bg-light text-center rounded p-2">
            <Calendars></Calendars>
           
            </div>
            </div>

            <div className="row g-4">
        <div className="col-sm-11 col-xl-9 " >
            <div className="bg-light text-center rounded p-4 " style={{ height: '360px', width:'780px'}}>
                <div className="d-flex align-items-center justify-content-between"  >
                    <h6 className="mr-0">Sales & Revenue</h6>
                    <a  href="">Show All</a>
                </div>
                <canvas id="salse-revenue"></canvas>
            </div>
        </div>

        <div className="col-sm-12 col-xl-3 ">
            <div  style={{ marginLeft: '20px'}}>
            <Weather></Weather>
           
            </div>
            </div>
</div>

</div>
<div className="row g-4" style={{ marginTop: "20px" }}>
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded p-4">
            <h5 className="mr-0 text-left">Location</h5>
        <div className='map-section text-center ' style={{ marginLeft: "-40px" }}>
        <iframe width="880" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=720&amp;height=500&amp;hl=en&amp;q=Sayre%20Hwy,%20Kalasungay,%20Malaybalay,%20Bukidnon+(Northern%20Bukidnon%20Free%20Farmers%20Cooperative,Inc.)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.maps.ie/population/">Calculate population in area</a></iframe>
        </div>
            </div>
        </div>
        </div>
    
   
</div>


            <div className="container-fluid pt-4 px-4">
                <div className="bg-light rounded-top p-4">
                    <div className="row">
                        <div className="col-12 col-sm-6 text-center text-sm-start">
                            &copy; <a href="#">NORBUFFCI</a>, All Right Reserved. 
                        </div>
                    </div>
                </div>
            </div>
           
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
        </div>
        
  
    </div>
    )
}

export default Dashboardbm;
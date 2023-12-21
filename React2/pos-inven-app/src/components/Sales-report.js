import React, {useEffect, useRef, useState} from 'react'
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminSidebar from '../layout/AdminSidebar';
import axios from 'axios'
import moment from 'moment';


function Salesreport() {

    const pdfRef = useRef ();
    const [products, setProducts] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    const downloadPDF = () => {
        const input = pdfRef.current;
      

        html2canvas(input).then((canvas)=>{
            const imgData =canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'A4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
           const imgWidth= canvas.width;
           const imgHeight = canvas.height;
           const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
           const imgX = (pdfWidth-imgWidth * ratio)/2;
            const imgY = 10;
           pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight *ratio);
    

           // Handle pagination if needed
            const contentHeight = canvas.height;
            const pageHeight = pdf.internal.pageSize.getHeight();
            let position = contentHeight;

            while (position >= 0) {
              pdf.addPage();
              position -= pageHeight;
              pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, imgHeight * ratio);
            }
            pdf.save('sales Report.pdf');

    
         })
    }


    
    const { userRole, setUserRole } = useRole();

    useEffect(() => {


        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }

//       fetch('YOUR_API_ENDPOINT')
//       .then((response) => response.json())
//       .then((data) => setMonthlySales(data))
//       .catch((error) => console.error('Error fetching monthly sales:', error));
  }, []);

  // const handleMonthChange = (selectedMonth) => {
  //   setSelectedMonth(selectedMonth);
  // };


  // useEffect(() => {
  //   console.log('Products in Month:', filteredProducts);
  //   console.log('Selected Month:', selectedMonth);
  // }, [filteredProducts, selectedMonth]);


  useEffect(() => {
    console.log("Product Data:", products);
    // Calculate total sales only when the products state changes
    const totalSales = calculateTotalSales();
    console.log('Total Sales:', totalSales);
  }, [products]);

  


  // Calculate total purchases for each product
const calculateTotalPurchases = (product) => {

      //  const dailySalesTotal = product.daily_sales || 0; // Use the daily_sales value directly
    const dailySalesTotal = product.daily_sales ? product.daily_sales.reduce((total, sale) => total + sale.quantity, 0) : 0;
    const monthlySalesTotal = product.monthly_sales ? Object.values(product.monthly_sales).reduce((total, monthSales) => total + monthSales, 0) : 0;
  
    console.log(dailySalesTotal + " " + monthlySalesTotal)
    return dailySalesTotal + monthlySalesTotal;  
  
     
  };

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

    // Pad single-digit months with a leading zero
    const paddedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

    return `${currentDate.getFullYear()}-${paddedMonth}`;
  }

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const currentWeek = Math.ceil((currentDate.getDate() + currentDate.getDay()) / 7);
    return `WEEK_${currentWeek}`;
  };

  

  const { startOfWeek, endOfWeek, isWithinInterval } = require('date-fns');

  const isDateInWeek = (date, week) => {
    // const start = startOfWeek(new Date(week), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    // const end = endOfWeek(new Date(week), { weekStartsOn: 1 });
  
    // return isWithinInterval(date, { start, end, inclusive: true });

    // const startDate = startOfWeek(new Date(week), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    // const endDate = endOfWeek(new Date(week), { weekStartsOn: 1 });
  
    // return isWithinInterval(new Date(date), { start: startDate, end: endDate, inclusive: true });

    // const formattedDate = date.toISOString().split('T')[0];
    // const start = startOfWeek(new Date(week), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    // const end = endOfWeek(new Date(week), { weekStartsOn: 1 });
  
    // return isWithinInterval(formattedDate, { start, end, inclusive: true });

    // const start = startOfWeek(new Date(week), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    // const end = endOfWeek(new Date(week), { weekStartsOn: 1 });
  
    // // Convert the date parameter to a Date object if it's not already
    // const inputDate = date instanceof Date ? date : new Date(date);
  
    // return isWithinInterval(inputDate, { start, end, inclusive: true });

    if (!date || !week) {
      return false;
    }

    // const startDate = new Date(week.slice(5)); // Extract the week number and create a Date object
    // const endDate = new Date(startDate);
    // endDate.setDate(endDate.getDate() + 7);
  
    // // Convert the date parameter to a Date object if it's not already
    // const inputDate = date instanceof Date ? date : new Date(date);
  
    // return inputDate >= startDate && inputDate < endDate;

    const startDate = startOfWeek(new Date(week.slice(5)), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(week.slice(5)), { weekStartsOn: 1 });
  
    // Convert the date parameter to a Date object if it's not already
    const inputDate = date instanceof Date ? date : new Date(date);
  
    return isWithinInterval(inputDate, { start: startDate, end: endDate, inclusive: true });
  };

  // Calculate total sales for a specific week
  const calculateWeeklyTotal = (week, product) => {


  if (!product || !product.daily_sales || !Array.isArray(product.daily_sales)) {
    console.error("Invalid product data:", product);
    return 0;
  }

  console.log('Product Data:', product);
  console.log('Week:', week);
    
  const currentMonth = getCurrentMonth();
  const formattedWeek = week.slice(5);

  const dailySales = product.daily_sales
    ? product.daily_sales
        .filter(sale => isDateInWeek(new Date(sale.date), formattedWeek))
        .reduce((dailyTotal, sale) => dailyTotal + sale.quantity, 0)
    : 0;

  const monthlySales = product.monthly_sales ? product.monthly_sales[currentMonth] || 0 : 0;

  console.log("Daily Sales:", dailySales, "Monthly Sales:", monthlySales);

  return dailySales + monthlySales;
};




  const calculateTotalProducts = (week) => {
    if (!products || !Array.isArray(products) || !selectedMonth) {
      return 0;
    }

    console.log("Selected Month:", selectedMonth);
  console.log("All Products:", products);
  
    // // Filter products based on the week
    // const productsInWeek = products.filter((product) => {
    //   const dailySalesForWeek = product.daily_sales ? product.daily_sales.filter((sale) => isDateInWeek(new Date(sale.date), week)) : [];
    //   const monthlySalesForWeek = product.monthly_sales ? Object.keys(product.monthly_sales).filter((month) => isDateInWeek(new Date(month), week)) : [];
  
    //   return dailySalesForWeek.length > 0 || monthlySalesForWeek.length > 0;
    // });

    // console.log("Products in Week:", productsInWeek);

    // // Calculate weekly sales for each product
    // const weeklySales = productsInWeek.reduce((total, product) => {
    //   const productWeeklySales = product.daily_sales ? product.daily_sales.filter((sale) => isDateInWeek(new Date(sale.date), week)).reduce((dailyTotal, sale) => dailyTotal + sale.quantity, 0) : 0;
    //   return total + productWeeklySales;
    // }, 0);
  
    // console.log("Weekly Sales:", weeklySales);


   // Filter products based on the selected month
   const productsInMonth = products.filter((product) => {
    const monthlySalesForMonth = product.monthly_sales ? product.monthly_sales[selectedMonth] || 0 : 0;
    return monthlySalesForMonth > 0;
  });

  // Calculate total products for the selected month
  const totalProducts = productsInMonth.length;

  return totalProducts;
  };


  // async function handleMonthChange(selectedMonth) {
  //   const newData = products.filter(row => {
  //     // Assuming that monthly_sales is an object with keys formatted as "YYYY. MonthName"
  //     return (
  //       row.monthly_sales && row.monthly_sales[selectedMonth] && row.monthly_sales[selectedMonth] > 0 ||
  //       row.quantity > 0 ||  // Assuming quantity is a property in your row object
  //       row.category.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       row.product_name.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       row.price > 0 ||  // Assuming price is a property in your row object
  //       row.total_selling > 0 ||  // Assuming total_selling is a property in your row object
  //       row.product_id.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       row.amount > 0  // Assuming amount is a property in your row object
  //     );
  //   });
  
  //   setProducts(newData);
  // }

  const isDateInMonth = (date, selectedMonth) => {
    if (!date || !selectedMonth) {
      return false;
    }
  
    const monthYearString = selectedMonth.toLowerCase();
    const monthIndex = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ].indexOf(monthYearString.split('.')[1]);
  
    if (monthIndex === -1) {
      return false;
    }
  
    const targetMonth = monthIndex + 1; // Adding 1 because JavaScript months are zero-based
    const targetYear = parseInt(monthYearString.split('.')[0], 10);
  
    return date.getMonth() === targetMonth - 1 && date.getFullYear() === targetYear;
  };
  
//2nd handlemonthchange
  // async function handleMonthChange(selectedMonth) {


  //   const newData = products.filter((row) => {
  //     // Assuming that monthly_sales is an object with keys formatted as "YYYY. MonthName"
  //     const formattedMonth = moment(selectedMonth, 'MMMM').format('YYYY-MMMM');
  //      const monthlySalesForSelectedMonth = row.monthly_sales ? row.monthly_sales[formattedMonth] || 0 : 0;
      
  //     console.log('Row Data:', row);
  //      console.log('Monthly Sales:', row.monthly_sales);
  //      console.log('Formatted Month:', formattedMonth);
  //      console.log('Monthly Sales for Selected Month:', monthlySalesForSelectedMonth);

  //     const hasDailySalesForMonth = row.daily_sales.some((sale) => {
  //       const saleDate = new Date(sale.date);
  //       return isDateInMonth(saleDate, selectedMonth);
  //     });

  //     return (
  //       // monthlySalesForSelectedMonth > 0 ||
  //       // row.daily_sales.some(sale => isDateInMonth(new Date(sale.date), selectedMonth)) ||
  //       // row.category.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       // row.product_name.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       // row.price > 0 ||
  //       // row.total_selling > 0 ||
  //       // row.product_id.toLowerCase().includes(selectedMonth.toLowerCase()) ||
  //       // row.amount > 0
  //       monthlySalesForSelectedMonth > 0 ||
  //       hasDailySalesForMonth ||
  //       row.quantity > 0 ||
  //       row.category.toLowerCase().includes(selectedMonth) ||
  //       row.product_name.toLowerCase().includes(selectedMonth) ||
  //       row.price > 0 ||
  //       row.price > 0 ||
  //       row.product_id.toLowerCase().includes(selectedMonth) ||
  //       row.amount > 0
  //     );
  //   });
  //   console.log('Filtered Data:', newData);
    
  //   setProducts(newData);
  // }


   async function handleMonthChange(selectedMonth) {
  try {
     // Format the month consistently for comparison
     const formattedMonth = moment(selectedMonth, 'MMMM').format('YYYY-MMMM');

     const newData = products.filter((row) => {
       // Check if the formatted month exists in the row's monthly sales
       const monthlySalesForSelectedMonth = row.monthly_sales ? row.monthly_sales[formattedMonth] || 0 : 0;
 
      console.log('Row Data:', row);
      console.log('Monthly Sales:', row.monthly_sales);
      console.log('Formatted Month:', formattedMonth);
      console.log('Monthly Sales for Selected Month:', monthlySalesForSelectedMonth);

      // Check if any daily sales exist for the selected month
       // Check if any daily sales exist for the selected month
       const hasDailySalesForMonth = row.daily_sales.some((sale) => {
        const saleDate = new Date(sale.date);
        // Format the sale date consistently
        const formattedSaleMonth = moment(saleDate).format('YYYY-MMMM');
        return formattedSaleMonth === formattedMonth;
      });

      return monthlySalesForSelectedMonth > 0 || hasDailySalesForMonth || row.quantity > 0 ||
        row.category.toLowerCase().includes(selectedMonth) ||
        row.product_name.toLowerCase().includes(selectedMonth) ||
        row.price > 0 || row.price > 0 ||
        row.product_id.toLowerCase().includes(selectedMonth) ||
        row.amount > 0;
    });

    // Calculate the sum of monthly sales for the selected month
    const totalMonthlySales = newData.reduce((sum, row) => {
      return sum + (row.monthly_sales ? row.monthly_sales[formattedMonth] || 0 : 0);
    }, 0);

      // Calculate the sum of daily sales for the selected month
      const totalDailySales = newData.reduce((sum, row) => {
        return sum + (row.daily_sales ? row.daily_sales.filter((sale) => {
          const saleDate = new Date(sale.date);
          const formattedSaleMonth = moment(saleDate).format('YYYY-MMMM');
          return formattedSaleMonth === formattedMonth;
        }).length : 0);
      }, 0);

     // Display the total monthly and daily sales in an alert
     alert(`Total Monthly Sales for ${selectedMonth}: ${totalMonthlySales}\nTotal Daily Sales for ${selectedMonth}: ${totalDailySales}`);


    // Log the filtered data before updating state update
    console.log('Filtered Data:', newData);

        // Set state only after filtering
        setProducts(newData);
  } catch (error) {
    console.error('Error handling month change:', error);
  }
}

  // Calculate total sales for all products from week 1 to 4
  const calculateTotalSales = () => {


   // Calculate total sales for all weeks
   return Array.from({ length: 4 }, (_, i) => calculateWeeklyTotal(`WEEK_${i + 1}`))
   .reduce((total, weeklyTotal) => total + weeklyTotal, 0);
  };

  

 // New function to calculate total sales including daily and monthly sales
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

    return(
        <div className="container-xxl" >
          <AdminSidebar></AdminSidebar>
  
            <div className="content">
              
              <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
                  <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                      <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                  </a>
            
                  {/* <form className="d-none d-md-flex ms-1">
                      <input id="searchBar" className="form-control border" type="search" placeholder="Search" />
                  </form> */}
                  <div className="navbar-nav align-items-center ms-auto">
                    
                      <div className="nav-item dropdown">
                              <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                              <span className="d-none d-lg-inline-flex" >{userRole}</span>
                        
                      </div>
                  </div>
              </nav>
              <div className="container-fluid pt-4 px-10"  >
                             <div className="bg-light text-center rounded p-5" >                 
                    <div class="salesReport"> 
                                <div class="dropdown-month">
                                    <button class="dropmonthbtn">Month Range</button>
                                    <div class="dropdown-content">
                                        <a href="#" onClick={() => handleMonthChange('January')}>January</a>
                                        <a href="#" onClick={() => handleMonthChange('February')}>February</a>
                                        <a href="#" onClick={() => handleMonthChange('March')}>March</a>
                                        <a href="#" onClick={() => handleMonthChange('April')}>April</a>
                                        <a href="#" onClick={() => handleMonthChange('May')}>May</a>
                                        <a href="#" onClick={() => handleMonthChange('June')}>June</a>
                                        <a href="#" onClick={() => handleMonthChange('July')}>July</a>
                                        <a href="#" onClick={() => handleMonthChange('August')}>August</a>
                                        <a href="#" onClick={() => handleMonthChange('September')}>September</a>
                                        <a href="#" onClick={() => handleMonthChange('October')}>October</a>
                                        <a href="#" onClick={() => handleMonthChange('November')}>November</a>
                                        <a href="#" onClick={() => handleMonthChange('December')}>December</a>
                                    </div>
                                    </div>
                                
                                    <div class="Salesdownload">
                                     <button class="Salesdownload" onClick={downloadPDF} href='SalesDownload.jsx'><i class="fa-solid fa-arrow-down"></i>&nbsp;&nbsp;Download</button>
                                </div>


                                <div  class="salesReportTableHeader">
                                    <thead>
                                    <tr>
                                            <th>QUANTITY</th>
                                            <th>CATEGORY</th>
                                            <th>PRODUCT NAME</th>
                                            <th>PRICE</th>
                                            <th>TOTAL SELLING</th>
                                            <th>PRODUCT ID</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                </div>
                                <div class="salesReportTable" ref={pdfRef}>
                                    <table>
                                        {/* <tr>
                                            <td>11</td>
                                            <td>Baby powder 2gms</td>
                                            <td>Baby powder 2gms</td>
                                            <td>1000</td>
                                            <td>1000</td>
                                            <td>1ZA0</td>
                                            <td>1000</td>
                                          
                                        </tr> */}
                                        <tbody>
                                         {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.daily_sales.length}</td>
                                            <td>{product.category}</td>
                                            <td>{product.product_name}</td>
                                           <td>{product.price}</td>
                                           <td>{calculateTotalPurchases(product)} </td>
                                           <td>{product._id}</td>
                                           <td>{product.amount}</td>
                                          </tr>
                                            ))} 
                                        
                                        </tbody>
                                    </table>
                                     
                                </div>
                            <div class="salesBreakdown" >
                            <table>
                                        <tr>
                                            <th id="salesBreakdownH1">SALES BREAKDOWN</th>
                                            <th>GRAND TOTAL SALES</th>
                                        </tr>
                                        {/* {monthlySales.map((month) => (
                                                        <tr key={month.month}>
                                    <td id="slsBh4">
                                    <strong>Total Product</strong>
                                    </td>
                                    <td>{month.week1}</td>
                                    <td>{month.week2}</td>
                                    <td>{month.week3}</td>
                                    <td>{month.week4}</td>
                                    <td>{month.total}</td>
                                            </tr>
                                            ))} */}

                                        <tr>
                                            <td id="slsBh5">
                                                <strong>Total Sales</strong>
                                            </td>
                                           
                                            <td>{calculateTotalSalesWithDailyMonthly()}</td>
                                        </tr>
                            </table>
                            </div>




                                </div>
                               
                            </div>
                        </div>
                    </div>
                   
    </div>
    )
}

export default Salesreport;
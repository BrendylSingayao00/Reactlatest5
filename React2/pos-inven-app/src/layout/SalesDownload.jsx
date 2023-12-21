import React , {useState, useEffect} from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import images from '../image/logo.png'
import {useRef} from 'react'
import axios from 'axios';

function SalesDownload() {
    const pdfRef = useRef ();
    const [products, setProducts] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas)=>{
            const imgData =canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'legal', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth= canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
            const imgX = (pdfWidth-imgWidth * ratio)/2;
            const imgY = 15;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight *ratio);
            pdf.save('Sales.pdf');


        })
    }

    const fetchDataFromMongoDB = async () => {
      try {
        // Replace the URL with your MongoDB endpoint
        const response = await axios.get('http://localhost:3001/productsall');
        // setCategoryData(response.data);
        // console.log(response.data)
        // const total = response.data.reduce((acc, item) => acc + item.price, 0);
        // console.log('Total Selling Price:', total);
    // setTotalPurchasePrice(total);
    // const totalselling = response.data.reduce((acc, item) => acc + item.amount, 0);
    // setTotalSellingPrice(totalselling);
    // console.log('Total Selling Price:', totalselling);
    // setGrandTotal(total + totalSellingPrice);
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    };

    useEffect(() => {
      // Fetch data from MongoDB
      fetchDataFromMongoDB();
      setCurrentDate(getFormattedDate());
    }, [])

    const getFormattedDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        // Fetch product data from the backend when the component mounts
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/productsall');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

      const calculateProfit = (sellingPrice, purchasePrice) => {
        return sellingPrice - purchasePrice;
      };
      const calculateProfitPercentage = (profit, purchasePrice) => {
        // Check if purchasePrice is not equal to 0 to avoid division by zero
        if (purchasePrice !== 0) {
          let percentage = (profit / purchasePrice) * 100;
      
          // Ensure the percentage is not more than 100%
          percentage = Math.min(percentage, 100);
      
          return percentage;
        } else {
          // Handle the case where purchasePrice is 0 (or any other appropriate action)
          return 0; // Set the percentage to 0 for simplicity, you can adjust this as needed
        }
      };

  return (
    <div> <div className="container-fluid pt-4 px-10" >        
    <div className="bg-light text-center rounded p-5" >


       <div class="salesPrintable" ref={pdfRef}>
       <img src={images} alt="logo" id='logoPicSales'></img>
       <br/>
       <div className='ptext'>
           <p><strong>NORTHERN BUKIDNON FREE FARMERS COOPERATIVE </strong><br/>
           Kalasungay, Malaybalay City <br/>
           CDA Registration No. 9520-10002142 <br/>
           CIN No. 0101100052 <br/>
          <strong>CONSUMERS DEPARTMENT</strong><br/>
          <h5><strong>SALES REPORT</strong></h5><br/>
         
          </p>
           </div>
           <div class="STableContainer">
           <p id="dateText" style={{fontSize: '14px'}}><strong>Date:</strong> {currentDate}</p>
           <table class="STable">
           <tr class="firstRowSales">
               <th>QTY.</th>
               <th>CATEGORY</th>
               <th>TOTAL SELLING PRICE</th>
               <th>TOTAL PURCHASE PRICE</th>
               <th>PROFIT</th>
               <th>PROFIT %</th>

           </tr>
           {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.daily_sales.length}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>{calculateProfit(product.amount, product.remaining_stock)}</td>
                    <td> {`${calculateProfitPercentage(
                        calculateProfit(product.amount, product.remaining_stock),
                        product.remaining_stock
                      ).toFixed(2)}%`}</td>
                  </tr>
                ))}
         

           </table>
              

           </div>

       </div>
       <div class="Inventorydownload">
            <button class="Salesdownload" onClick={downloadPDF}><i class="fa-solid fa-download"></i>DOWNLOAD</button>
       </div>
   </div>
</div>
</div>
  )
}

export default SalesDownload
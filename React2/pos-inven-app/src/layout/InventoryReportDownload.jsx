import React, {useRef, useState, useEffect} from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import images from '../image/logo.png'
import axios from "axios"

function InventoryReportDownload() {

    const [categoryData, setCategoryData] = useState([]);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
const [Grandtotal, setGrandTotal] = useState(0);
    useEffect(() => {
        // Fetch data from MongoDB
        fetchDataFromMongoDB();
        setCurrentDate(getFormattedDate());
      }, [])

      const fetchDataFromMongoDB = async () => {
        try {
          // Replace the URL with your MongoDB endpoint
          const response = await axios.get('http://localhost:3001/productsall');
          setCategoryData(response.data);
          console.log(response.data)
          const total = response.data.reduce((acc, item) => acc + item.price, 0);
          console.log('Total Selling Price:', total);
      setTotalPurchasePrice(total);
      const totalselling = response.data.reduce((acc, item) => acc + item.amount, 0);
      setTotalSellingPrice(totalselling);
      console.log('Total Selling Price:', totalselling);
      setGrandTotal(total + totalSellingPrice);
        } catch (error) {
          console.error('Error fetching data from MongoDB:', error);
        }
      };

      const calculateTotalSellingPrice = () => {
        let total = 0;
        categoryData.forEach((category) => {
          total += category.price; // Adjust this based on your MongoDB document structure
        });
        setTotalSellingPrice(total);
      };

    const pdfRef = useRef ();
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
             // Update the total purchase price dynamically
    // categoryData.forEach((category) => {
    //     pdf.autoTable({
    //       html: `#${category.category},${category.totalSellingPrice},${category.totalPurchasePrice}`,
    //       startY: pdf.autoTable.previous.finalY + 10,
    //     });
    //   });

    calculateTotalSellingPrice();
            pdf.save('Summary Inventory Report.pdf');
            window.location.reload();

        })
    }

    const getFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };


  return (
   
   <div className="container-fluid pt-4 px-10"  >
                           <div className="bg-light text-center rounded p-5" >
                           <div class="inventoryPrintable" ref={pdfRef}>
                              <img src={images} alt="logo" id='logoPicSales'></img>
                              <br/>
                              <div className="ptext" >
                                  <p ><strong>NORTHERN BUKIDNON FREE FARMERS COOPERATIVE </strong>
                                  <br/>Kalasungay, Malaybalay City 
                                  <br/>  CDA Registration No. 9520-10002142  
                                  <br/>  CIN No. 0101100052 <br/>
                                 <strong>SUMMARY OF INVENTORY</strong><br/></p>
                                  <p id="dateText"><strong>Date:</strong> {currentDate}</p>
                                  </div>
                              

<div class="inventoryTableContainer">
           <table class="inventoryTable">
           <tr class="firstRowInventory">
               <th></th>
               <th>CATEGORY</th>
            
               <th>TOTAL SELLING PRICE</th>
               
               <th>TOTAL PURCHASE PRICE</th>

           </tr>
           {categoryData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}

           <tr class="TOTALTableInventory"> 
               <td></td>
               <td><strong>TOTAL</strong></td>
               <td>{String(totalSellingPrice)}</td>
               
               <td>{String(totalPurchasePrice)}</td>
           </tr>
           <tr class="TOTALTableInventory"> 
               <td></td>
               <td><strong>GRAND TOTAL: </strong></td>
               <td>{String(Grandtotal)}</td>

               
           </tr>


           </table>
              
  </div>  
           </div>
            <div class="Inventorydownload">
            <button className="Inventorydownload" onClick={downloadPDF}><i class="fa-solid fa-arrow-down"></i>&nbsp;&nbsp;DOWNLOAD</button>
     
       </div>
                  </div>
                  </div> 
  )
}

export default InventoryReportDownload
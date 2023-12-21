import React, {useEffect, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
import images from '../image/logo.png'
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { useRole } from '../FirstNameContext';
import BMsidebar from '../layout/BMsidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SalesDownload from '../layout/SalesDownload';

function SalesreportCash() {
    const { userRole, setUserRole } = useRole();

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);
      

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
              pdf.save('Daily Sales Report.pdf');
  
  
          })
      }
    return(
        <div className="container-xxl" >
        <BMsidebar></BMsidebar>

          <div className="content">
            
          <nav className="navbar navbar-expand bg-light navbar-light sticky-top " >               
              
                <div className="navbar-nav align-items-center ms-auto">

                    <div className="nav-item dropdown">
                           <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                            <span className="d-none d-lg-inline-flex" >{userRole}</span>
                       
                    </div>
                </div>
            </nav>
            <SalesDownload></SalesDownload>
            {/* <div className="container-fluid pt-4 px-10"  >
                           <div className="bg-light text-center rounded p-5" >
                           <div class="salesPrintable" ref={pdfRef}>
                              <img src={images} alt="logo" id='logoPicSales'></img>
                              <br/>
                                  <p id="ptext"><strong>NORTHERN BUKIDNON FREE FARMERS COOPERATIVE </strong></p>
                                  <p id="ptext">Kalasungay, Malaybalay City </p>
                                  <p id="ptext">CDA Registration No. 9520-10002142  </p>
                                  <p id="ptext">CIN No. 0101100052 </p><br/>
                                  <p id="ptext"><strong>CONSUMERS DEPARTMENT</strong></p>
                                  <p id="ptext"><strong>DAILY SALES REPORT</strong></p>
                                  <p id="ptext"><strong>_____________</strong></p>

                                  <p id="dateText"><strong>Date:</strong>_________</p>

                                  <div class="salesTableContainer">
                                  <table class="salesTable">
                                  <tr class="firstRowSales">
                                      <td></td>
                                      <th>PRODUCT LINE</th>
                                      <th>TOTAL SELLING PRICE</th>
                                      <th>TOTAL COST PRICE</th>
                                     
                                  </tr>
                                  <tr>
                                      <td>01</td>
                                      <td>0000</td>
                                      <td>0000</td>
                                      <td>0000</td>
                                  </tr>
                                  
                                  </table>
                                  <table>
                                      <tr>
                                          <td></td>
                                          <th>GRAND TOTAL</th>
                                          <th>0000</th>
                                          <th>0000</th>
                                      </tr>
                                  </table>
                          </div>
                      </div>
                      <div class="salesdownloadPDF">
                                   <button class="salesdownloadPDF" onClick={downloadPDF}><i class="fa-solid fa-download"></i>DOWNLOAD</button>
                              </div>
                  </div>
                  </div> */}
          </div>

  </div>
    )
}

export default SalesreportCash;
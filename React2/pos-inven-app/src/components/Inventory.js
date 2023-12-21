import React, {useEffect, useRef} from 'react'
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminSidebar from '../layout/AdminSidebar';
import InventoryReportDownload from '../layout/InventoryReportDownload';

function Inventory() {
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
            pdf.save('inventory.pdf');


        })
    }
    const { userRole, setUserRole } = useRole();

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);

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
                   <InventoryReportDownload></InventoryReportDownload>
                    </div>
                    </div>
                    
    )
}

export default Inventory;
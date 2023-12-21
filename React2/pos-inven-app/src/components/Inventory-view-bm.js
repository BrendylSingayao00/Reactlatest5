import React, {useEffect} from 'react'
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
import BMsidebar from '../layout/BMsidebar';
import InventoryReportDownload from '../layout/InventoryReportDownload';

function InventoryviewBm() {

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
    
       <BMsidebar></BMsidebar>
  
            <div className="content">
              
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top  " >                  <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                      <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                  </a>
                  {/* <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
                      <i className="fa fa-bars"></i> */}
                  {/* </a> */}
                 
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
          
         <InventoryReportDownload></InventoryReportDownload>
            </div>
  
    </div>
    )
}

export default InventoryviewBm;
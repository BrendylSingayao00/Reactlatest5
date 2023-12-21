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
// import { useLocation } from 'react-router-dom';
import { useRole } from '../FirstNameContext';

function PosDisplay() {

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
    
        <div className= "sidebar" >
                <nav className="navbar" id="sideBar">
                    
                        <img src={images} alt="logo" id='logoPic'></img>
                        <h3 id="sideBarTitle">NORBUFFCI</h3>
                   
                    <div className="navbar-nav w-100">
    
                             <Link to="/Dashboard-cash" className="nav-item nav-link"><i className="fa fa-tachometer me-2" />Dashboard</Link>
                             <Link to="/SalesreportCash" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Sales Report</Link>
                             <Link to="/PosDisplay" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />POS</Link>
                             <Link to="/Inventory-view-cash" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />View Inventory</Link>
                        <Link to="/Aboutcash" className="nav-item nav-link"><i className="fa fa-th me-2" />About</Link>
                          <br /><br /><br /> <br /><br /><br /> <br /><br /><br />
                         <Link to="/log-out" id="logout"><i className="fa-solid fa-arrow-right-from-bracket" /><strong>Logout</strong></Link>
                    </div>
                </nav>
            </div>
  
            <div className="content">
              
              <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
                  <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                      <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                  </a>
                  {/* <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
                      <i className="fa fa-bars"></i> */}
                  {/* </a> */}
                  <form className="d-none d-md-flex ms-1">
                      <input id="searchBar" className="form-control border-0" type="search" placeholder="Search" />
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
              <div className="container-fluid pt-4 px-10"  >
                         <div className="row g-0">
                            <div className="col-lg-12 col-xl-12">
                             <div className="bg-light text-center rounded p-5" >
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                </div>
                                <h6>place content here</h6>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
  
    </div>
    )
}

export default PosDisplay;
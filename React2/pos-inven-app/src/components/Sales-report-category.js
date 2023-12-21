import React from 'react'
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
import { useEffect } from 'react';

function Salesrpcat() {
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
    
        {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}
    
    {/* style={isOpen ? sidebarStyle.open : sidebarStyle.closed} */}
    
        <div className= "sidebar" >
                <nav className="navbar" id="sideBar">
                    {/* <a href="about" className="navbar-brand mx-4 mb-3"> */}
                        <img src={images} alt="logo" id='logoPic'></img>
                        <h3 id="sideBarTitle">NORBUFFCI</h3>
                    {/* </a> */}
                    {/* <div className='d-flex align-items-center ms-0 mb-4' id='imgpos'>
                        <div className="position-relative">
                            <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: "40px" ,height: "40px", marginLeft: "25px"}} />
                        </div>
                    </div> */}
                    <div className="navbar-nav w-100">
                        {/* <a href="index.html" className="nav-item nav-link active"> <i className="fa fa-tachometer me-2"></i>Dashboard</a>
                        <a href="table.html" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Register Accounts</a>
                        <a href="form.html" className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Sales Report</a> */}
    
                             <Link to="/dashboard" className="nav-item nav-link"><i className="fa fa-tachometer me-2" />Dashboard</Link>
                             <Link to="/Registeracc" className="nav-item nav-link"><i className="fa fa-table me-2" />Register Accounts</Link>
                             <Link to="/Sales-report" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Sales Report</Link>
    
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Inventory Report</a>
                            {/* <Link to="/Inventory" className="nav-link dropdown-toggle"><i className="fa fa-laptop me-2" />Inventory Report</Link> */}
                            <div className="dropdown-menu bg-transparent border-0">
                                {/* <a href="button.html" className="dropdown-item">Upate Inventory</a>
                                <a href="typography.html" className="dropdown-item">View Inventory </a> */}
                                <Link to="/Inventory-update" className="dropdown-item">Update Inventory</Link>
                                <Link to="/Inventory-view" className="dropdown-item">View Inventory</Link>
                            </div>
                        </div>
                        <Link to="/Aboutfordash" className="nav-item nav-link"><i className="fa fa-th me-2" />About</Link>
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
                      {/* <div className="nav-item dropdown">
                          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                              <i className="fa fa-envelope me-lg-2"></i>
                              <span className="d-none d-lg-inline-flex">Message</span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                              <a href="#" className="dropdown-item">
                                  <div className="d-flex align-items-center">
                                      <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: "40px", height: "40px"}} />
                                      <div className="ms-2">
                                          <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                          <small>15 minutes ago</small>
                                      </div>
                                  </div>
                              </a>
                              <hr className="dropdown-divider" />
                              <a href="#" className="dropdown-item">
                                  <div className="d-flex align-items-center">
                                      <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: "40px", height: "40px"}} />
                                      <div className="ms-2">
                                          <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                          <small>15 minutes ago</small>
                                      </div>
                                  </div>
                              </a>
                              <hr className="dropdown-divider" />
                              <a href="#" className="dropdown-item">
                                  <div className="d-flex align-items-center">
                                      <img className="rounded-circle" src="img/user.jpg" alt="" style= {{width: "40px", height: "40px"}} />
                                      <div className="ms-2">
                                          <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                          <small>15 minutes ago</small>
                                      </div>
                                  </div>
                              </a>
                              <hr className="dropdown-divider" />
                              <a href="#" className="dropdown-item text-center">See all message</a>
                          </div>
                      </div> */}
                      {/* <div className="nav-item dropdown">
                          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                              <i className="fa fa-bell me-lg-2"></i>
                              <span className="d-none d-lg-inline-flex">Notification</span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                              <a href="#" className="dropdown-item">
                                  <h6 className="fw-normal mb-0">Profile updated</h6>
                                  <small>15 minutes ago</small>
                              </a>
                              <hr className="dropdown-divider"></hr>
                              <a href="#" className="dropdown-item">
                                  <h6 className="fw-normal mb-0">New user added</h6>
                                  <small>15 minutes ago</small>
                              </a>
                              <hr className="dropdown-divider" />
                              <a href="#" className="dropdown-item">
                                  <h6 className="fw-normal mb-0">Password changed</h6>
                                  <small>15 minutes ago</small>
                              </a>
                              <hr className="dropdown-divider" />
                              <a href="#" className="dropdown-item text-center">See all notifications</a>
                          </div>
                      </div> */}
                      <div className="nav-item dropdown">
                          {/* <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> */}
                              {/* <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style= {{width: "40px", height: "40px" }}></img> */}
                              <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                              <span className="d-none d-lg-inline-flex" >{userRole}</span>
                          {/* </a> */}
                          {/* <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                              <a href="#" className="dropdown-item">My Profile</a>
                              <a href="#" className="dropdown-item">Settings</a>
                              <a href="#" className="dropdown-item">Log Out</a>
                          </div> */}
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

export default Salesrpcat;
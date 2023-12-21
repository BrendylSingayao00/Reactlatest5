
import { Link } from 'react-router-dom';
import images from '../image/logo.png'
import React from 'react'



function AdminSidebar({children}) {
 
  return (
    
    <div className= "sidebar" >
    <nav className="navbar" id="sideBar">
        {/* <a href="about" className="navbar-brand mx-4 mb-3"> */}
            <img src={images} alt="logo" id='logoPic'></img>
            <hr style={{ borderColor: 'white', height: '2px', color: 'white', marginLeft:'20px', marginRight:'20px' }} />
            {/* <h3 id="sideBarTitle">NORBUFFCI</h3> */}
      
        <div className="navbar-nav w-100">
                 <Link to="/dashboard" className="nav-item nav-link"><i className="fa fa-tachometer me-2" />Dashboard</Link>
                 <Link to="/Registeracc" className="nav-item nav-link"><i className="fa fa-user-plus" />Employee's Accounts</Link>
                 <Link to="/Product-update" className="nav-item nav-link"><i className="fa fa-table me-2" />Product</Link>
                 <Link to="/Sales-report" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Sales Report</Link>
                 <Link to="/Inventory" className="nav-item nav-link"><i className="fa fa-laptop me-2" />Inventory</Link>
                  <Link to="/Aboutfordash" className="nav-item nav-link"><i className="fa fa-th me-2" />About</Link>
              <br />                  <hr style={{ borderColor: 'white', height: '2px', color: 'white', marginLeft:'20px', marginRight:'20px' , width:'210px'}} /><br /><br /> 
             <Link to="/log-out" id="logout" style={{ marginBottom:'50px'}}><i className="fa-solid fa-arrow-right-from-bracket" /> &nbsp;<strong>Logout</strong></Link>
        </div>
    </nav>

  
    
<main>
    <div className="container-xxl">
        {children}

    </div>
</main>
</div>
  )
}

export default AdminSidebar
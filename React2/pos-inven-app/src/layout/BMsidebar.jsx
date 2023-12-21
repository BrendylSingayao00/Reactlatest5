import React from 'react'
import { Link } from 'react-router-dom';
import images from '../image/logo.png'

function BMsidebar({children}) {
  return (
    <div className= "sidebar" >
    <nav className="navbar" id="sideBar">
            <img src={images} alt="logo" id='logoPic'></img>
            {/* <h3 id="sideBarTitle">NORBUFFCI</h3> */}
            <hr style={{ borderColor: 'white', height: '2px', color: 'white' }} />

       
        <div className="navbar-nav w-100">
                  <Link to="/Dashboard-bm" className="nav-item nav-link"><i className="fa fa-tachometer me-2" />Dashboard</Link>
                 <Link to="/SalesreportBm" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Sales Report</Link>
                 <Link to="/Inventory-view-bm" className="nav-item nav-link"><i className="fa fa-laptop me-2" />View Inventory</Link>
                 <Link to="/Aboutbm" className="nav-item nav-link"><i className="fa fa-th me-2" />About</Link>
              <br /><br /><br /> <br /><br /><br /> <br />
                 <Link to="/log-out" id="logout" style={{ marginBottom:'50px'}}><i className="fa-solid fa-arrow-right-from-bracket" /><strong>Logout</strong></Link>
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

export default BMsidebar
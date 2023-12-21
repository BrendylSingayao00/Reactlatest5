import React, {useEffect, useState} from 'react'
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
import AdminSidebar from '../layout/AdminSidebar';
import axios from 'axios'

function Registerarchived() {
    const { userRole, setUserRole } = useRole();

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);

      const [archivedAccounts, setArchivedAccounts] = useState([]); // State to hold account data


      const fetchAccounts = () => {
          axios
            .get('http://localhost:3001/archived-accounts')
            .then((response) => {
              setArchivedAccounts(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        };
      
        useEffect(() => {
          fetchAccounts(); // Fetch account data when the component mounts
        }, []);

        const activeAccount = async (accountId) => {
            try {
              // Make a POST request to the backend API to archive the account
              await axios.post(`http://localhost:3001/active-account/${accountId}`);
              console.log(`Account activated with ID: ${accountId}`);
              // After archiving, you may want to fetch accounts again to update the UI
              fetchAccounts();
            } catch (error) {
              console.error(error);
              // Handle error if the API request fails
            }
            alert("Account Activated Succesfully");
          };
          

    return(
        <div className="container-xxl" >
      <AdminSidebar></AdminSidebar>

        <div className="content">
          
          <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
              <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                  <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
              </a>
              {/* <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
                  <i className="fa fa-bars"></i> */}
              {/* </a> */}
              {/* <form className="d-none d-md-flex ms-1">
                  <input id="searchBar" className="form-control border" type="search" placeholder="Search" />
              </form> */}
              <div className="navbar-nav align-items-center ms-auto">
                 
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
                         <div className="bg-light rounded p-5"  >
                            <div className="RegisterAcc">
                            <h1>REGISTERED ACCOUNTS</h1> 
                            
                            <div className="NavAccount">
                            {/* <a href="/Registeracc" className="ActiveAcc">Active</a>
                            <a href="/Register-archived" className="ArchivedAcc">Archived</a> */}

                                <Link to="/Registeracc" className="ActiveAcc">Active</Link>
                                <Link to="/Register-archived" className="ArchivedAcc">Archived</Link>                            </div>

                            <div className="AccountUserArchive">
                            <thead>
                            <tr> 
                                    <th>ID </th>
                                    <th>NAME</th>
                                    <th>GENDER</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                            </tr>
                            </thead>
                            <table className="AccountUserArchiveList">

                            <tbody>
          {archivedAccounts.map((account) => (
            <tr key={account._id}>
              <td>{account._id}</td>
              <td>
                {account.Fname} {account.Mname} {account.Lname}
              </td>
              <td>{account.gender}</td>
              <td>{account.emailadd}</td>
              <td>{account.role}</td>
              <td>{account.status}</td>
              <td>
                <button className="archiveBtn" onClick={() => activeAccount(account._id)}>Active</button>
              </td>
            </tr>
          ))}
        </tbody>
                         
                          </table>
            </div>

                            </div>
                        </div>
        </div>
     

        </div>

      </div>

    )
}

export default Registerarchived;
import React, {useEffect, useState} from 'react'
// import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
// import images from '../image/logo.png'
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { useRole} from '../FirstNameContext';
import axios from 'axios'
import AdminSidebar from '../layout/AdminSidebar';
// import AccountModel from '../../../server/models/Account-model';

function Registeracc() {
    const { userRole, setUserRole } = useRole();
     const [modal, setModal] = useState(false);
    //   const [modalSuccess, setModalSuccess] = useState(false);

    useEffect(() => {
        // Retrieve the user's first name from local storage
        const storedFirstName = localStorage.getItem('userRole');
        if (storedFirstName) {
          setUserRole(storedFirstName);
        }
      }, []);


  
      const toggleModal =() =>{
          setModal(!modal)
      }

      const [Fname, setFname] = useState()
      const [Mname, setMname] = useState();
      const [Lname, setLname] = useState();
      const [gender, setGender] = useState();
      const [emailadd, setEmailadd] = useState();
      const [role, setRole] = useState();
      const [password, setPass] = useState();
      const [user_Id, setUser_id] = useState();
      const [verifypass, setVerifypass] = useState();

      const [passwordMatchError, setPasswordMatchError] = useState('');

     // const [emptyfield, setEmptyField] = useState('');

      const [passwordlimit, setPasswordLimit] = useState('');
      


      const handleSubmit = async (e) => {
        e.preventDefault()


        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailadd)) {
          alert('Invalid email format');
          return;
        }

        if (user_Id.length !== 5) {
          alert('User ID must be 5 characters long.');
          return;
        }

        if (password !== verifypass) {
            setPasswordMatchError('The passwords do not match.');
            return; // Do not proceed with form submission
          } 

          setPasswordMatchError('');

          if (password.length < 8) {
            setPasswordLimit('Password must be at least 8 characters long.');
            return; // Do not proceed with form submission
          }

        
          // Clear any previous password match error
          setPasswordLimit('');

        const object = {
            _id: user_Id,
            emailadd: emailadd ,
            password: password ,
            verifypass: verifypass,
            Fname: Fname ,
            Mname: Mname ,
            Lname: Lname ,
            gender: gender,
            role: role,
        }

        console.log(object)

        axios.post('http://localhost:3001/register', {employee:object})
        .then((response => {
            console.log(response.data.error)

            if (response.status === 201) {
                // Success: Employee created
                alert('Employee created successfully');
                setModal(false);
                window.location.reload();
              } else if (response.statusText === "Bad Request" && response.request.status === 400 && response.data.error === 'Duplicate key error') {
                // Duplicate key error
                alert(response.data.message);
              } else {
                // Handle other errors
                alert('An error occurred while registering the employee.');
              }


        }))
        .catch((err) => 
        console.log(err)
        );
      } 

    const [accounts, setAccounts] = useState([]); // State to hold account data


const fetchAccounts = () => {
    axios
      .get('http://localhost:3001/accounts')
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAccounts(); // Fetch account data when the component mounts
  }, []);

  const archiveAccount = async (accountId) => {
    try {
      // Make a POST request to the backend API to archive the account
      await axios.post(`http://localhost:3001/archive-account/${accountId}`);
      console.log(`Archive account with ID: ${accountId}`);
      // After archiving, you may want to fetch accounts again to update the UI
      fetchAccounts();
    } catch (error) {
      console.error(error);
      // Handle error if the API request fails
    }
    alert("Archived Account Successfully")
  };

  const handleInputChange = (e, setState) => {
    const newValue = e.target.value;
    setState(newValue.charAt(0).toUpperCase() + newValue.slice(1));
  };


    return(
        <div className="container-xxl" >
          <AdminSidebar></AdminSidebar>
        {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}
    
    {/* style={isOpen ? sidebarStyle.open : sidebarStyle.closed} */}
    
    
  
            <div className="content">
              
              <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
                  <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                      <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                  </a>
                  {/* <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
                      <i className="fa fa-bars"></i> */}
                  {/* </a> */}
                  {/* <form className="d-none d-md-flex ms-1">
                      <input id="searchBar" className="form-control border" type="search" placeholder="Search" name='search'/>
                  </form> */}
                  <div className="navbar-nav align-items-center ms-auto">
                     
                      <div className="nav-item dropdown">
                              {/* <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style= {{width: "40px", height: "40px" }}></img> */}
                              <i class="fa fa-user-o fa-2" aria-hidden="true"></i> &nbsp;
                              <span className="d-none d-lg-inline-flex" >{userRole}</span>
                      </div>
                  </div>
              </nav>


              <div className="container-fluid pt-4 px-10"  >
                             <div className="bg-light rounded p-5"  >
                                <div className="RegisterAcc">
                                <h1>REGISTERED ACCOUNTS</h1> 
                                <button onClick= {toggleModal} className="addNewAccount" ><i class="fa-solid fa-plus"></i>&nbsp;Add New</button>
                                
                                <div className="NavAccount">
                                {/* <a href="/Registeracc" className="ActiveAcc">Active</a>
                                <a href="/Register-archived" className="ArchivedAcc">Archived</a> */}

                                <Link to="/Registeracc" className="ActiveAcc">Active</Link>
                                <Link to="/Register-archived" className="ArchivedAcc">Archived</Link>
                                {/* <a href="Register-archived" className="ArchivedAcc">Archived</a> */}
                                </div>

                                <div className="AccountUserTable">
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

                                <table className="AccountUserList" >
<tbody>
          {accounts.map((account, index) => (
            <tr key={account._id } className={index === 0 ? 'hiddenRow' : ''} >
              <td>{account._id}</td>
              <td>
                {account.Fname} {account.Mname} {account.Lname}
              </td>
              <td>{account.gender}</td>
              <td>{account.emailadd}</td>
              <td>{account.role}</td>
              <td>{account.status}</td>
              <td>
                <button className="activeBtn" onClick={() => archiveAccount(account._id)}>Archive</button>
              </td>
            </tr>
          ))}
        </tbody>
                              </table>
                </div>

                                </div>
                            </div>
            </div>
          
            {modal && (
                <div class="modalRegister">
                <div class="containerRegister">
           <div class="titleHeaderReg"> <h4 id='h1'>Registration Account </h4> 
  <button onClick={toggleModal} className="closeButton" ><i class="fa-solid fa-square-xmark"  style={{color: "white"}}>   </i></button> 
     
            </div>
            <div id="registrationForm" >
            <div>
                        <form id="myForm" onSubmit={handleSubmit}>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Fullname</label>
                                        <input type="text" placeholder="First Name " class="form-control" name='Fname' value={Fname}  onChange={(e) => handleInputChange(e, setFname)} required></input>
                                        {/* <input type="text" placeholder="First Name " class="form-control" name='Fname'  onChange={(e) => setFname(e.target.value)} required></input> */}
                                    </div>
                                    <div class="col-sm-4 form-group">
                                        <label></label>
                                        {/* <input type="text" placeholder="Middle Name " class="form-control" name='Mname' onChange={(e) => setMname(e.target.value)} required></input> */}
                                        <input type="text" placeholder="Middle Name " class="form-control" name='Mname'  value={Mname} onChange={(e) => handleInputChange(e, setMname)}></input>

                                    </div>
                                    <div class="col-sm-4 form-group">
                                        <label></label>
                                        {/* <input type="text" placeholder="Last Name " class="form-control" name='Lname' onChange={(e) => setLname(e.target.value)} required /> */}
                                        <input type="text" placeholder="Last Name " class="form-control" name='Lname'  value={Lname}  onChange={(e) => handleInputChange(e, setLname)} required />

                                    </div>
                                </div>					
                            
                                <div class="row" >
                                    <div class="col-sm-6 form-group">
                                        <label for="dropdown">Gender:</label>
                                            <select id="dropdown" class="form-control" placeholder="Select" name='gender' onChange={(e) => setGender(e.target.value)} required>
                                                <option value="" disabled selected> Gender  </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                           
                                    </div>	
                                    <div class="col-sm-6 form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="Email" class="form-control" name='emailadd' onChange={(e) => setEmailadd(e.target.value)} required></input>
                                        {/* {emptyfield && <div className="text-danger">{emptyfield}</div>} */}
                                    </div>	
                                    
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label for="dropdown">Role:</label>
                                            <select id="dropdown" class="form-control" placeholder="Select" name='role' onChange={(e) => setRole(e.target.value)} required>
                                            {/* <option value="" disabled selected>  Select Role   </option> */}
                                                <option value="cashier" >Cashier</option>
                                                <option value="boardMember">Member</option>
                                            </select>
        
                                            
                                    </div>		
                                    {/* <div class="col-sm-6 form-group">
                                        <label>Password</label>
                                        <input type="text" placeholder="Password" class="form-control" name='password' onChange={(e) => setPass(e.target.value)} required></input>
                                        {passwordlimit && <div className="text-danger">{passwordlimit}</div>}
                                    </div>	 */}
                                    <div class="col-sm-6 form-group">
                                        <label>Password</label>
                                        <input type="password" placeholder="Password" class="form-control" name='password' onChange={(e) => setPass(e.target.value)} required></input>
                                        {passwordlimit && <div className="text-danger">{passwordlimit}</div>}
                                    </div>
                                </div>	
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label>User ID</label>
                                        <input type="text" placeholder="UserID" class="form-control" name='user_id' onChange={(e) => setUser_id(e.target.value)} required></input>
                                     {/* {emptyfield && <div className="text-danger">{emptyfield}</div>} */}
                                    </div>		
                                    {/* <div class="col-sm-6 form-group">
                                        <label>Verify Password</label>
                                        <input type="text" placeholder="Verify" class="form-control" name='verifypass' onChange={(e) => setVerifypass(e.target.value)} required></input>
                                        {passwordMatchError && <div className="text-danger">{passwordMatchError}</div>}
                                    </div>	 */}
                                     <div class="col-sm-6 form-group">
                                        <label>Verify Password</label>
                                        <input type="password" placeholder="Verify" class="form-control" name='verifypass' onChange={(e) => setVerifypass(e.target.value)} required></input>
                                        {passwordMatchError && <div className="text-danger">{passwordMatchError}</div>}
                                    </div>	
                                </div>						
                            
                            <button type="submit" className="registerSubmit">Submit</button>			
                            </div>
                        </form> 
                        </div>            
            </div>	
            </div>
            </div>

          )}
          
</div>
        {/* {modalSuccess && (

        <div className="successModal">
        <div className="modalSuccess">
            <p>Successfully Created an Account!</p>   
        </div>
        </div>
            )} */}

        </div>



    )
}




export default Registeracc;

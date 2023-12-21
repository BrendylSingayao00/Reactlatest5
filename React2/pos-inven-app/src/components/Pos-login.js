import React, { useState, useRef } from 'react'
// import Test from './test-login'
// import { BrowserRouter, Router,Routes, Route, Link } from 'react-router-dom';
 import axios from 'axios'
 import { useNavigate } from 'react-router-dom';
import images from '../image/login-image.png'; 
import 'font-awesome/css/font-awesome.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { useAuth } from '../context/AuthContext';
import logo from '../image/logo.png'
import background from "../image/login-image.png";
import Recaptcha from 'react-google-recaptcha';


function Login() {
const [emailadd, setEmailadd] = useState()
const [password, setPassword] = useState();
 const [alertMessage, setAlertMessage] = useState('');
const navigate = useNavigate()
const { setAuthUser } = useAuth();

const recaptchaRef = useRef();

const handleGoogleLoginSuccess = (credentialResponse) => {
  const details = jwt_decode(credentialResponse.credential);
  console.log(details);

  // Example: Check the user in the database using an axios request
  axios.post('http://localhost:3001/checkUser', { email: details.email })
  .then((result) => {
    if (result.data.exists) {
      // User exists in the database
      console.log('User exists in the database');

      console.log("Data" + result.data)
      const userRole = result.data.role; // Extract the role property
      localStorage.setItem('userRole', userRole);
      
      const user = result.data.user.emailadd;
      console.log(user) // Replace with how your user data is structured
        setAuthUser(user);

      if (userRole === 'cashier') {
        console.log(userRole);
        navigate('/Dashboard-Cash', { state: { role: userRole } });
      } else if (userRole === 'admin') {
        console.log(userRole);
        navigate('/Dashboard',{ state: { role: userRole } });
      } else if (userRole === 'boardMember') {
        console.log(userRole);
        navigate('/Dashboard-bm',{ state: { role: userRole } });
      }
    } else {
      // User doesn't exist in the database
      console.log('User does not exist in the database');
      // Handle the case where the user doesn't exist
      // (You may want to show an alert or navigate to a different page)
    }
  })
  .catch((error) => {
    console.error('Error checking user in the database:', error);
  });
};


         
            const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('http://localhost:3001/login', {emailadd, password})
            .then(result =>{ 
              console.log("Status:", result.data.status)
              
            if (result.data.status === "Success") {
                // Check the user's role and redirect accordingly
                const userRole = result.data.role; // Extract the role property
                localStorage.setItem('userRole', userRole);
                const user = result.data.user.emailadd;
                console.log(user) // Replace with how your user data is structured
                  setAuthUser(user);

                if (userRole === 'cashier') {
                  console.log(userRole);
                  navigate('/Dashboard-Cash', { state: { role: userRole } });
                } else if (userRole === 'admin') {
                  console.log(userRole);
                  navigate('/Dashboard',{ state: { role: userRole } });
                } else if (userRole === 'boardMember') {
                  console.log(userRole);
                  navigate('/Dashboard-bm',{ state: { role: userRole } });
                }
              }  else if (result.data.status === 'IncorrectPassword') {
                 setAlertMessage('The password is incorrect');
                //alert("The password is incorrect");
              } else if (result.data.status === 'NoRecordExists') {
                 setAlertMessage('No record exists for this username');
                // alert('No record exists for this username');
              }
            })
            .catch((err) => console.log(err));
          }

    return (
        // <div className="LoginALL">
        //     {/* <div className='logo-pos'>
        //         <br></br>
        // <a className="navbar-brand" href='./About'><h1 id="logoTitle">NORBUFFCI</h1></a>
        // </div>  */}
        // <div className='loginPicture'>
        // <img src={images} alt="loginPic" className ='logPic'></img>
        // </div>
        // <div className="rightLogin">
        // <form onSubmit={handleSubmit}>
        // <div>
        // <div ><a className="navbar-brand" href='./About'>
        // <img src={logo} alt="loginPic" className ='logoPIC'></img></a>
        // </div>
        // <div>

        // </div>
        // <h1 className='Title'>Sign In </h1>
        // {/* <br />
        // <br /> */}
      
        // <div className='inputfields'>
        //     <div> <i className="fa fa-user fa-2x" >&nbsp;</i>
        //     <input placeholder='Username' type='text' name='emailadd' onChange={(e) => setEmailadd(e.target.value)}
        //     required></input>
        //     </div>

        //     <i className="fa fa-lock fa-2x">&nbsp;</i>
        //     <input placeholder='Password' type="password" name='password'  onChange={(e) => setPassword(e.target.value)}  required></input>
        //     {/* <br />
        //     <input placeholder='Role'type='text' name='role'  onChange={(e) => setRole(e.target.value)}  required></input> */}
        //      </div>
        //    <br />
            
        //    {/* <div className="fpass">
        //     <a href="#!"><p>Forgot password?</p></a>
        //     </div> */}

       
              
        //     <div className='login-container'>
        //     <button className='buttonlog'><strong>Login</strong></button>
        //          <br />
        //             </div>
        //     </div>
           
        //   <div className='google'>

        //     <GoogleOAuthProvider clientId="783380202616-4ccditvvq98ejuaqajrukb4o80pds0mc.apps.googleusercontent.com">
          

        //         <GoogleLogin
        //         // onSuccess={credentialResponse => {
        //         //     const details = jwt_decode(credentialResponse.credential);
        //         //     console.log(details);
        //         //     console.log(credentialResponse);
        //         // }}
        //         // onError={() => {
        //         //     console.log('Login Failed');
        //         // }}
        //         onSuccess={handleGoogleLoginSuccess}
        //         onError={() => {
        //           console.log('Login Failed');
        //         }}
        //         />
                
                
                
        //         </GoogleOAuthProvider>
        //         </div>
        //         <div>
        //           {/* ... Your form inputs ... */}
        //           <br></br>
        //           {alertMessage && <div className="alertMess">{alertMessage}</div>}
        //       {/* Display alert message if it is set */}
        //     </div>
        //         </form>
               
                
              
        //     </div>
        //     </div>
        <div >
        <link
href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
rel="stylesheet"
/>
<style
dangerouslySetInnerHTML={{
__html:
  '@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap);\n\nbody {\n    background: #f5f5f5;\n}\n\n@media only screen and (max-width: 767px) {\n    .hide-on-mobile {\n        display: none;\n    }\n}\n\n.login-box {\n    background: url(pos-inven-app/src/image/login-image.png);\n    background-size: cover;\n    background-position: center;\n    padding: 50px;\n    margin: 50px auto;\n    min-height: 550px;\n    -webkit-box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);\n}\n\n.logo {\n    font-family: "Script MT";\n    font-size: 54px;\n    text-align: center;\n    color: #888888;\n    margin-bottom: 50px;\n}\n\n.logo .logo-font {\n    color: #007BBE;\n}\n\n@media only screen and (max-width: 767px) {\n    .logo {\n        font-size: 34px;\n    }\n}\n\n.header-title {\n    text-align: center;\n    margin-bottom: 50px;\n}\n\n.login-form {\n    max-width: 300px;\n    margin: 0 auto;\n}\n\n.login-form .form-control {\n    border-radius: 0;\n    margin-bottom: 20px;\n}\n\n.login-form .form-group {\n    position: relative;\n}\n\n.login-form .form-group .forgot-password {\n    position: absolute;\n    top: 6px;\n    right: 15px;\n}\n\n.login-form .btn {\n    border-radius: 0;\n    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n    margin-bottom: 10px;\n}\n\n.login-form .btn.btn-primary {\n    background: #007BBE;\n    border-color: #007BBE;\n}\n\n.slider-feature-card {\n    background: #fff;\n    max-width: 280px;\n    margin: 0 auto;\n    padding: 30px;\n    text-align: center;\n    -webkit-box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);\n}\n\n.slider-feature-card img {\n    height: 80px;\n    margin-top: 30px;\n    margin-bottom: 20px;\n}\n\n.slider-feature-card h3,\n.slider-feature-card p {\n    margin-bottom: 20;\n}\n\n.carousel-indicators {\n    bottom: -50px;\n}\n\n.carousel-indicators li {\n    cursor: pointer;\n}'
}}
/>
<section className="body" >
<div className="container" style={{ backgroundImage: `url(${background})`, backgroundSize:"cover" }}>
<div className="login-box">
  <div className="row">
    <div className="col-sm-6">
      <div className="logo mb-1">
        <a className="logo-font" href='./About'>Northern</a>Coop
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-6">
      <h3 className="header-title ">LOGIN</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Email"
            name='emailadd' 
            onChange={(e) => setEmailadd(e.target.value)}
       required

          />
        </div>
        <div className="form-group">
          <input
            type="Password"
            className="form-control"
            placeholder="Password"
           name='password'  
           onChange={(e) => setPassword(e.target.value)} 
            required
          />
          {/* <a href="#!" className="forgot-password">
            Forgot Password?
          </a> */}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block ">LOGIN</button>
          <input type="hidden" name="recaptcha_response" id="recaptchaResponse"/>
        </div>
        <div className="form-group">
          <div className='google'>

 <GoogleOAuthProvider clientId="783380202616-4ccditvvq98ejuaqajrukb4o80pds0mc.apps.googleusercontent.com">


 <GoogleLogin
  // onSuccess={credentialResponse => {
  //     const details = jwt_decode(credentialResponse.credential);
  //     console.log(details);
  //     console.log(credentialResponse);
  // }}
  // onError={() => {
  //     console.log('Login Failed');
  // }}
  onSuccess={handleGoogleLoginSuccess}
  onError={() => {
    console.log('Login Failed');
  }}
  />
  
  
  
  </GoogleOAuthProvider>
  </div>
  <div className="alertMessage">
    {/* ... Your form inputs ... */}
    <br/>
    {alertMessage && <div className="alertMess">{alertMessage}</div>}
{/* Display alert message if it is set */}
</div>
 
        </div>
      </form>
    </div>
    
  </div>
</div>
</div>
</section>
<div className='RecapCha'>
<Recaptcha 
        //  ref={recaptchaRef}
         sitekey="6LfAejQpAAAAALEzT9Spg9NVUmPVlqcqVxGEGxR0"
         size="invisible"
        //  onResolved={onResolved}
        />
</div>
      </div>
   
   
        );
}


export default Login
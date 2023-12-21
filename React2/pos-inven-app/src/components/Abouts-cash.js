import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import images from '../image/logo.png'; 
import { useNavigate } from 'react-router-dom';
import AboutLayout from '../layout/AboutLayout';

const facebookUrl = 'https://www.facebook.com/profile.php?id=100070799254184'; 
const websiteUrl = 'https://ph1199932-northern-bukidnon-free-farmers-cooperative.contact.page/'; 



function AboutCash() {

    const navigate = useNavigate();

  // Function to handle the back button click
  const handleBackButtonClick = () => {
    navigate('/Dashboard-Cash'); // Navigate to the '/pos-login' route
  };

  

    return(
        <div><header>
    <div className='aboutAll'>
         <button className="back-button"  onClick={handleBackButtonClick}>
      {/* <span id="arrow" className="arrow-icon">&larr;</span>  */}
      <span id="arrow" ><i class="fa-solid fa-chevron-left"></i></span> 
    </button>

       {/* <img src={images} alt="logo" className ='logoPic'></img> */}
        <h1 className='AboutTitle'>NORBUFFCI</h1>
    </div></header>
  <AboutLayout></AboutLayout>
    </div>
    )
}

export default AboutCash;
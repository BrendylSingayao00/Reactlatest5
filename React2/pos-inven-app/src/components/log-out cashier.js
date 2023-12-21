import React from 'react'
import { useNavigate } from 'react-router-dom';

function LogoutCashier() {

    const navigate = useNavigate();

    
    const handleLogoutButtonClick = () => {
        navigate('/'); // Navigate to the '/pos-login' route
      };

      const handlebackButtonClick = () => {
        navigate('/Dashboard-Cash'); // Navigate to the '/pos-login' route
      };

    return(

        <div>
        <div className="logouts">
            <br></br>
            <div className="container-Logout">
                {/* <span class="close" id="closeModal">&times;</span> */}
                <h3><strong>Log Out</strong></h3>
                <hr></hr>
                <p>Are you sure you want to logout?</p>
                <hr></hr>
                <button id="cancelButton" className="red-button"  onClick={handleLogoutButtonClick} >Log Out</button> &nbsp;
                <button id="logoutConfirmButton"  className="white-button" onClick={handlebackButtonClick}>Cancel</button> 
            </div><br></br>
            </div>
            </div>
    )
}




export default LogoutCashier;

        // const modal = document.getElementById("myModal");

        // const btn = document.getElementById("logoutButton");
        // const cancelButton = document.getElementById("cancelButton");
        // const logoutConfirmButton = document.getElementById("logoutConfirmButton");
        // const closeModal = document.getElementById("closeModal");

        // btn.onclick = function() {
        // modal.style.display = "block";
        // }

        // cancelButton.onclick = function() {
        // modal.style.display = "none";
        // }

        // logoutConfirmButton.onclick = function() {
        // alert("Logout successful");
        // modal.style.display = "none";
        // }

        // closeModal.onclick = function() {
        // modal.style.display = "none";
        // }

        // window.onclick = function(event) {
        // if (event.target === modal) {
        //     modal.style.display = "none";
        // }
        // }




// import React from "react";

// function logout() {
//     return(
//         <div>
            











//         </div>
//     )
// }

// export default logout;
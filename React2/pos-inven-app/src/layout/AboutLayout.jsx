import React from 'react'
import CoopImage from '../image/Coop.jpg';
import unityImage from '../image/Unity.png';

const facebookUrl = 'https://www.facebook.com/profile.php?id=100070799254184'; 
const websiteUrl = 'https://ph1199932-northern-bukidnon-free-farmers-cooperative.contact.page/'; 


function AboutLayout({children}) {
  return (
    <div>
    {/* <div className="container">
      <div className='aboutContainerR'>
   <h1 className='HAbout'>ABOUT</h1>
    <div className="About">
    
        <p className='pAbout'>In 1968, the cooperative of Bayanihan in Kalasungay was a response to the long-range practice of forming and putting up 
                       savings to address the various needs of the community. Small farmers recognized the importance of establishing a credit 
                       union due to the predatory practices of usurers or "buayas" who exploited their desperate situations by granting loans
                        at exorbitant interest rates, often as high as 20% or more. In light of the numerous financial needsfaced by small 
                        farmers, they united their efforts and established the first credit cooperative in 1969.</p>
    </div>
    </div>
    <div className='aboutContainerL'>
    <div>
    <h1 className='HMsn'>MISSION</h1> 
    <div className="Mission">
        <p>Sustainable community enterprises to generate income and 
            provide excellent services to its members, in the area of 
             lending, production, marketing, consumers, store  and 
             technical services, with committed leaders and members.</p>
    </div>
    <h1 className='HVsn'>VISION</h1> 
    <div className="Vission">
        <p>A Cooperative that provides services, develops good leaders,
             strengthens unity, revives & preserves good costumes and 
             tradition of the community it serves.</p>
    </div>
    </div>
    </div>
    </div> */}
    <div>
     <div className="about">
    <div className="containerAbout">
      {/* <img src="Coop.jpeg" alt="Your Image" /> */}
      <img src={CoopImage} alt="Your Image" className="aboutpic" />
      <div className="text-overlayAbout">
        <h2 className="aboutH2">ABOUT US</h2>
        {/* <img src="unity.png" alt="Your Image" className="aboutpic2" /> */}
        <img src={unityImage} alt="Your Image" className="aboutpic2"/>

        <p className="aboutText">
          In 1968, the cooperative of Bayanihan in Kalasungay was a response to
          the long-range practice of forming and putting up savings to address
          the various needs of the community. Small farmers recognized the
          importance of establishing a credit union due to the predatory
          practices of usurers or "buayas" who exploited their desperate
          situations by granting loans at exorbitant interest rates, often as
          high as 20% or more. In light of the numerous financial needs faced by
          small farmers, they united their efforts and established the first
          credit cooperative in 1969.
        </p>
        <div className="VMbox">
          <div className="boxAbout">
            <div className="icon-container">
              <i className="fas fa-rocket" />
            </div>
            <b>
              <h3 className='aboutH3'>Mission</h3>
            </b>
            <p className="missionText">
              Sustainable community enterprises to generate income and provide
              excellent services to its members, in the area of lending,
              production, marketing, consumers, store and technical services,
              with committed leaders and members.
            </p>
          </div>
          <div className="boxAbout2">
            <div className="icon-container">
              <i className="fas fa-globe" />
            </div>
            <b>
              <h3 className='aboutH3'>Vision</h3>
            </b>
            <p className="visionText">
              A Cooperative that provides services, develops good leaders,
              strengthens unity, revives &amp; preserves good costumes and
              tradition of the community it serves.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
<div className='footer'>
<br></br> <br></br>


    <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
    <i class="fa-brands fa-facebook-f"></i>
    </a>
    <a class="navbar-brand" href={websiteUrl}><p className='website'>@NORBUFFCI</p></a>

</div>
{children}
</div>
  )
}

export default AboutLayout
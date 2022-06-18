import Header from "./component/homePage/header/header"
import DetailsOfPackage from "./component/homePage/detailsPackage/detailsOfPackage";
import AboutPogo from "./component/homePage/aboutPogo/about";
import CustomersRecommend from "./component/homePage/customersRecommend/customersRecommend"
import { Container } from "react-bootstrap";
import Footer from "./component/homePage/footer/footer"
import BackToDetails from "./component/homePage/detailsPackage/backToDetails/backToDetails";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes   } from 'react-router-dom'
import axios from "axios";
import { Button } from "@mui/material";
import ShipmentTracking from "./component/homePage/detailsPackage/MultiSteps/stepsNum/shipment_tracking";
import './App.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MultiSteps from "./component/homePage/detailsPackage/MultiSteps/MultiSteps";
import Summary from "./component/homePage/detailsPackage/MultiSteps/stepsNum/summary";

axios.defaults.baseURL = "http://localhost:3000/"


function App() {


  const [showButton, setShowButton] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  


  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (showSteps) {
         setShowButton(false);
       } 
      if (window.pageYOffset > 300 && !showSteps) {
       setShowButton(true);
      } 
      else {
        setShowButton(false);
      }
    });
  }, [showSteps]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };
 

 
  

  return (
   

    <Container fluid className="widthContainer">
          
      <Header />

      <Router>
        <Routes>
          <Route exact path="/" element={<DetailsOfPackage showSteps={showSteps} setShowSteps={setShowSteps} />} />
          <Route exact path="/:token"
            element={<DetailsOfPackage showSteps={showSteps} setShowSteps={setShowSteps}> <MultiSteps /> </DetailsOfPackage>} />
        </Routes>
      </Router>
      
      < AboutPogo />
      <BackToDetails />
      <CustomersRecommend />
      <Footer />
      {showButton && (
        <div>
          <button className="back-to-top" onClick={scrollToTop} >
            &#8679;
          </button>
        </div>
      )}


    </Container>
  )


  
      
}

export default App;

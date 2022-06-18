import { Button } from "@mui/material";
import Arrow from "../../images/Arrow.png"
import DetailsOfPackage from "../detailsOfPackage";
import { useTranslation } from "react-i18next";
import "../backToDetails/backToDetails.css"
import { useState } from "react";


export default function BackToDetails() {
    const [showDetailsOfPackage,setShowDetailsOfPackage]=useState(false)
    const scrollToTop = () => {
        window.scrollTo({
          top: 700,
          behavior: 'smooth' 
        });
      };

    const { t } = useTranslation();
    return (
        <section className="container-fluid mobile_width_backToDetails">
          
        <div className="cover mobile_back" >
            <div className="height_mobile_back">
             {/* <div className="startIllustration" id="back"/> */}
           </div>
            <div className="coverDetails detailsId" id="coverDetailsId" style={{height:"500px",justifyContent:"center"}}>
             
                <div className="details container" id="detailsId" style={{justifyContent:"center"}} >
                    <h1 className='h1Summary margin'>{t("DETAILS_OF_PACKAGE_LINE_1")}</h1>
                    <p className="p_backToDetails">{t("DETAILS_OF_PACKAGE_LINE_2")}</p>
                    <div style={{width:"100%",paddingRight:"0.3rem"}}><Button style={{margin:"auto"}} className="btn_backToDetails" onClick={()=>scrollToTop()}  variant="contained"><img className="Arrow" src={Arrow}alt="Arrow"/>
                    {t("BACKTODETAILS_BTN_START")}</Button></div>
                  
                        
                </div>
            </div>
        </div>
        </section>
    )

}





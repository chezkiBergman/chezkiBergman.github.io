import { Container } from "react-bootstrap";
import "../customersRecommend/customersRecommend.css"
import { useTranslation } from "react-i18next";
import Rating from '@mui/material/Rating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

export default function CustomersRecommend() {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState(5)

    return (
        <section className="section_customers">
        <div className="container mobile_width_customers">
            <div className="divHeader_customers"   >
                <h1  className="customersHeadLin1">{t("CUSTOMERS_RECOMMEND_HEADER_LINE_1")}</h1>
                <h1  className="customersHeadLin2">{t("CUSTOMERS_RECOMMEND_HEADER_LINE_2")}</h1>

            </div>
            <div className="posts">
                <div className="post">
                    <div className="rating"><Rating 
                    name="simple-controlled"
                    value={value}
                /></div>
               <div>
                <p className="post_p">{t("CUSTOMERS_RECOMMEND_POST_1")}</p>
                <div style={{positiom:"relative"}}>
                <div className="iconUser"> <div><p style={{color:"#FFFFFF",margin:"5px"}}>{t( "CUSTOMERS_RECOMMEND_USERNAME_1")}</p><p className="under_userName">gjffj</p></div><AccountCircleIcon  style={{width:"60px",color:"gray",height:"60px" }}/>
                </div>
               </div>
               </div>
                
                </div>
                <div className="post"> 
                <div className="rating">
                <Rating 
                    name="simple-controlled"
                    value={value} />
                </div>

                <div>
                <p className="post_p">{t("CUSTOMERS_RECOMMEND_POST_2")}</p>
                <div style={{positiom:"relative"}}>
               <div className="iconUser"> <div><p style={{color:"#FFFFFF",margin:"5px"}}>{t( "CUSTOMERS_RECOMMEND_USERNAME_1")}</p><p className="under_userName">hjfj</p></div><AccountCircleIcon  style={{width:"60px",color:"gray",height:"60px" }}/>
               </div>
              </div>
                </div>
                </div>
                </div>
            
        </div>
        </section>
    )
}
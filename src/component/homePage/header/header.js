import Logo from "./logoHeader"
import pogo from "../images/pogo.png"
import { useState, useEffect } from "react";
import deliverImg from "../images/deliverImg.png"
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Container } from "react-bootstrap";
import { Button } from "@mui/material";
import "./header.css"

import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation();

    const [lng, setLng] = useState(`he`)


    useEffect(() => {


        i18n.changeLanguage(lng)
        const dir = lng === 'en' ? "rtl" : "ltr"

        document.documentElement.dir = dir

    }, [lng]);


    return (
        <section className="mobile_height">
            <div className="container header_logo">
                <div className="header_logo_height">

                    <div style={{ position: "absolute" }} >

                        <Select
                            sx={{
                                "& svg":{color: '#583DFF'},

                                "& fieldset": {

                                   display:"none"
                                }
                             
                            }}
                            style={{ color: '#583DFF',borderWidth: "0px" }}
                            value={lng}
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(e) => setLng(e.target.value)}
                        >

                            <MenuItem style={{color: '#583DFF'}} value={`en`}>English</MenuItem>
                            <MenuItem style={{color: '#583DFF'}} value={`he`}>עברית</MenuItem>

                        </Select>
                    </div>



                    <div className="logoPogo">
                        <img className="logo_position" src={pogo} alt="pogo" />
                        <div style={{ position: "relative" }}><a className="linkHomePage" href="#">{t("HEADER_LOGO")}</a></div>
                    </div>
                </div>
                <div className="flexImgLogo">
                    <div><img className="img-fluid" src={deliverImg} alt="deliverImg" /></div>
                    <Logo />
                </div>


            </div>
        </section>
    )

}
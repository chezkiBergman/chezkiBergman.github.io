import pogo from "../images/pogo.png"
// import { Link } from "react-router-dom"
import "./logo/logo.css"
import { Container } from "react-bootstrap"
import { t } from "i18next"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Logo() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex">
        <div className="logoPosition">
        
            <div className="divHead">
                <div className="flex_numAndString">
            <div className="span_header_logo">567</div>
            <div className="h1Head">{t("HEADER_LINE_1")}</div>
            </div>
            <div style={{textAlign:"end"}} >
            <span className="headBold">{t("HEADER_LINE_2")}</span>
        </div>
        
            </div>
            <div>
               
             {t("HEADER_LINE_3").split('\n').map((str,i)=> <p  key={i}   className={`dirHeader`}>{str}</p>)}
          
               
            </div>
        </div>
        </div>
    )
}
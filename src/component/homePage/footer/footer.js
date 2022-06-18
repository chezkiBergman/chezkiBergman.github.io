import  pogo from "../images/pogo.png"
import "../footer/footer.css"
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t, i18n } = useTranslation();
    return(
<footer className="container" style={{height:"88px"}}> <div className="footerLogo">
<a className="footerDelivers" href="#">{t("HEADER_LOGO")}</a>
 <img className="footer_logo_pogo" src={pogo} alt="pogo" />

</div></footer>
    )
}
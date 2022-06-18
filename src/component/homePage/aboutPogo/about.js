import about from "../images/about.png"
import icon1 from "../images/icon1.png"
import icon2 from "../images/icon2.png"
import icon3 from "../images/icon3.png"
import { Container } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "react-i18next";


import "../aboutPogo/about.css"
import { t } from "i18next"

export default function AboutPogo() {
    const { t, i18n } = useTranslation();
    const isTablet = useMediaQuery({ query: '(max-width: 1200px)' })
    return (
        <section>
            <div className="container mobile_width">

                <div className="about">
                    <div className="flex_header_about">
                    <div className="aboutHead">
                        <h1 className="h1About" style={{whiteSpace:"nowrap"}}>{isTablet ?  t( "ABOUT_HEADER_BOLD_lINE_MOBILE_1"): t('ABOUT_HEADER_BOLD_lINE_1')}<br /> {isTablet  ? t('ABOUT_HEADER_BOLD_lINE_MOBILE_2') :   t("ABOUT_HEADER_BOLD_lINE_2") }</h1>
                    </div>
                    {/* <div><p className="about_header_p">{t( "ABOUT_HEADER")}</p></div> */}
                    </div>

                    <div className="img_width_div">
                        <img className="img-width" src={about} alt="about" />
                    </div>
                    <div className="icons">

                        <div className="textIcon">
                            <div className="textIconMargin">
                                <h5 className="h5Icon">{t('ABOUT_ICON_3')}</h5>
                                <p className="textAlign_p">{t("ABOUT_ICON_3_TEXT")}</p>
                            </div>

                            <img width={'48px'} height={'48px'} src={icon3} />

                        </div>

                        <div className="textIcon">
                            <div className="textIconMargin">
                                <h5 className="h5Icon">{t('ABOUT_ICON_2')}</h5>
                                <p className="textAlign_p"> {t("ABOUT_ICON_2_TEXT")}</p>
                            </div>
                            <img width={'48px'} height={'48px'} src={icon2} />
                        </div>


                        <div className="textIcon">
                            <div className="textIconMargin">
                                <h5 className="h5Icon">{t('ABOUT_ICON_1')}</h5>
                                <p className="textAlign_p"> {t("ABOUT_ICON_1_TEXT")}</p>
                            </div>
                            <img width={'48px'} height={'48px'} src={icon1} />
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )

}
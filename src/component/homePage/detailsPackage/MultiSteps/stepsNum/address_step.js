import { useTranslation } from "react-i18next";
import LocationSearchInput from "../../reactAutoComplete"
import MicrosoftExcel from "../../../images/Microsoft Excel.png"
import trash from "../../../images/Trash.png"
import "./stepsNumCss/address_step.css"
import { useEffect, useRef, useState } from "react";

import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive"
import PopUpForDex from "./popUp"
import PopUpMoreDetails from "./popUpDetails_responsive";
import XlPopUpDex from "./xlFiles/xlFiles_Dex"
import ImportXlFiles from "./xlFiles/xl_file_responsive"



export default function Address_point({ openMoreDetailsPopUp,
    setOpenMoreDetailsPopUp, detailsOfPackage,
    setDetailsOfPackage, setErrorAutoComplet,
    showInput, setShowInput, errorAutoComplet }) {

    const [DeliveryDestination, setDeliveryDestination] = useState("")
    const [isClickd, setIsClickd] = useState(false)
    const [showListOption, setShowListOption] = useState(null)
    const [fileObject, setFileObject] = useState("");
    const [singelPoint, setSingelPoint] = useState("")

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const { t, i18n } = useTranslation();
    const ref = useRef()

   
      
        // setIsClickd(!isClickd)
    

    const handleOpenMenu = (value) => {

        setOpenMoreDetailsPopUp(openMoreDetailsPopUp ? false : true);
        setSingelPoint("")
        setDetailsOfPackage(value => [...value]);


    };

    const handleCloseMenu = (singelPackage) => {
        setOpenMoreDetailsPopUp(openMoreDetailsPopUp ? false : true)
        if (singelPackage) {
            singelPackage.payForStation = '',
                singelPackage.comment = '',
                singelPackage.contactName = '',
                singelPackage.contactPhone = ""
            setDetailsOfPackage([...detailsOfPackage]);
        }



    }

    const showDetails = (i) => {

        setOpenMoreDetailsPopUp(openMoreDetailsPopUp ? false : true);
        setSingelPoint(i)


    }


    const scrollToBottom = () => {
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    };
    useEffect(() => {

        if (detailsOfPackage.length > 2) {
            scrollToBottom();
        }
    }, [detailsOfPackage]);







    const h5StepNum1 = t('STEPS_NUM_1_HEADER_LINE_2')
    const label = `${t('STEPS_ADDRESS_DELIVERY')} ${detailsOfPackage.length > 0 ? detailsOfPackage.length + 1 : ""}`

    return openMoreDetailsPopUp && isMobile ? (<PopUpMoreDetails labelDestination={t(`STEPS_ADDRESS_DELIVERY`)}
        click={handleOpenMenu} open={openMoreDetailsPopUp}
        selected={detailsOfPackage => setDetailsOfPackage(detailsOfPackage)}
        AllDetailsOfPackage={detailsOfPackage} close={handleCloseMenu} detailsOfPackageSingel={singelPoint} className="moreDetailsWindow" />

    ) : showInput && isMobile ? (<ImportXlFiles fileObject={fileObject} setFileObject={setFileObject} showInput={showInput}   setShowInput={setShowInput} AllDetailsOfPackage={detailsOfPackage} selected={detailsOfPackage => setDetailsOfPackage(detailsOfPackage)} />
    ) :


        <div className="infoSteps">
            <div className="head_steps_address">
                <h1 className="h1StepNum1">{t("STEPS_NUM_HEADER_LINE_1")}</h1>
                <h5 className="h5StepNum1">{detailsOfPackage.length > 0 ? `${detailsOfPackage.length} ${h5StepNum1}` : t("STEPS_NUM_HEADER_LINE_2")}</h5>
            </div>
            <div
                className="flexXlFile">
                <div className="img_file" style={{height:isMobile ? "58px":"62px"}}><img  style={{ cursor: "pointer" }} src={MicrosoftExcel} alt='Microsoft Excel' onClick={()=>setShowInput(!showInput)} /></div>
                <div className="stations">
                    <p className="btn" onClick={() => setIsClickd(!isClickd)} style={{ direction: "initial", textAlign: "center", color: '#583DFF' }}>{t('STEPS_ADD_STATION')}</p>
                </div >

            </div>
            {
                <div className="mobile_autocomplete" style={{ height: isMobile ? "35px" : "90px" }}>
                    <LocationSearchInput
                        setErrorAutoComplet={setErrorAutoComplet}
                        errorAutoComplet={errorAutoComplet}
                        detailsOfPackage={detailsOfPackage}
                        selected={setDetailsOfPackage}
                        label={label}
                        setIsClickd={isClickd => setIsClickd(isClickd)}
                        value={DeliveryDestination} onChange={(e) => setDeliveryDestination(e)} />
                </div>
            }


            {detailsOfPackage.length > 0 &&
                <div className="overflow" >{detailsOfPackage?.map((point, i) => {
                    return (
                        <div id={point.id_package} key={i}>

                            <div style={{ position: "relative" }} className="deliveryAddress">
                                <p style={{ position: "absolute", top: "-10px", right: document.documentElement.dir === "ltr" ? "15px" : "",fontSize:"14px",color:'rgb(79, 89, 118)' }}> {`${t('STEPS_ADDRESS_DELIVERY')}(${detailsOfPackage.length > 0 ? i + 1 : ""})`}</p>
                                <fieldset aria-hidden="true" className={document.documentElement.dir === "ltr" ? 'muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline' : 'muiltr-1d3z3hw-MuiOutlinedInput-notchedOutline'}>
                                    <legend style={{ fontSize: document.documentElement.dir === "rtl" && "16px" }}
                                        className={`${document.documentElement.dir === "ltr" ? 'muirtl' : 'muiltr'}-1in441m`}><span>89675876875800{detailsOfPackage.length > 100 && '5h' }</span></legend></fieldset>


                                <div className="overflow_point">
                                    <div className="overflow_point_hidden"><span className="span_destination">{point.destination}</span>  <br />
                                    </div>{point.contactPhone !== "" || point.payForStation !== "" || point.comment !== "" ?
                                        <div><span className="pointClass">{point.contactName ? `${point.contactName},` : ""} {point.contactPhone} {point.payForStation}{point.payForStation ? point.currency_symbol_payForStation : ""} {point.comment ? point.comment : ""} </span></div> : null} </div>
                                <div onClick={() => isMobile && setShowListOption(showListOption => showListOption === i ? null : i)} className="details_btn" style={{ whiteSpace: 'nowrap' }}>


                                    <div className={isMobile && showListOption === i ? "div_listOption_mobile" : "div_listOption"}><span className={`${isMobile && showListOption !== i ? "btn moreDetailsHiiden" : "moreDetails"}`} style={{ cursor: "pointer" }} onClick={() => showDetails(point)}>
                                        {point.contactName !== "" || point.payForStation !== "" || point.comment !== "" || point.contactPhone !== "" ? (t("ADD_DETAILS_EDIT")) : t('ADD_DETAILS_LINK')}</span>
                                        <div><img className={`${isMobile && showListOption !== i && "btn imgMoreDetailsHidden"}`} style={{ cursor: "pointer", position: isMobile && showListOption === i ? "absolute" : "",top:"64px",
                                         right: document.documentElement.dir === 'ltr' ? "12px" : '0px', left: document.documentElement.dir === 'rtl' ? "8px" : "0px" }}
                                            onClick={() => { setDetailsOfPackage(detailsOfPackage.filter(item => item !== point)) }} src={trash} alt="trash" />
                                            {showListOption === i && isMobile ? <span className="imgMoreDetailsShow">{t("DELETE_STATION_MOBILE")}</span> : null}
                                        </div></div></div>






                                {openMoreDetailsPopUp && !isMobile ? <PopUpForDex labelDestination={t(`STEPS_ADDRESS_DELIVERY`)}
                                    click={handleOpenMenu} open={openMoreDetailsPopUp}
                                    selected={detailsOfPackage => setDetailsOfPackage(detailsOfPackage)}
                                    AllDetailsOfPackage={detailsOfPackage} close={handleCloseMenu} detailsOfPackageSingel={singelPoint} className="moreDetailsWindow" /> : null}

                            </div>
                        </div>

                    )
                })}<div ref={ref} /></div>}
            {showInput && !isMobile ? (<XlPopUpDex fileObject={fileObject} setFileObject={setFileObject} showInput={showInput} setShowInput={setShowInput}  AllDetailsOfPackage={detailsOfPackage} selected={detailsOfPackage => setDetailsOfPackage(detailsOfPackage)} />) : null}


        </div>


}
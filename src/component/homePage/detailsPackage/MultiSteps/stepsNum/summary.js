import { useTranslation } from "react-i18next";
import "./stepsNumCss/summary.css"
import edit from "../../../images/edit.png"
import axios from "axios";
import { updateServer } from "./updateServer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


export default function Summary({ checkboxValue, detailsOfPackage,
    getDataFromServer, exitAddress
    , nameAndPhone, switchEditBtnSummary, time, setIsUpdateServer }) {


    useEffect(() => { setIsUpdateServer(false) }, [])



    const { t, i18n } = useTranslation();
    const { token } = useParams()
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const arrayPickUpTime = time?.pickUpTime?.split("T")
    const arrayDdLine = time?.ddLine?.split("T")

    const start_time = [arrayPickUpTime[0], arrayPickUpTime[1]]?.join(" ")
    const end_time = [arrayDdLine[0], arrayDdLine[1]]?.join(" ")
    const address = `${exitAddress?.streetName ? exitAddress?.streetName : ""} ${exitAddress?.streetNum ? exitAddress?.streetNum : ""} ${exitAddress?.cityName ? exitAddress?.cityName : ""}`


    // console.log(detailsOfPackage);

    return (
        <div className="summary_flex"
        >


            <div className="padding_header_summary">
                <div className="margin_header_summary">
                    <h1 className="h1Summary" style={{ width: "" }}>{t("SUMMARY_HEADER_LINE_1")}</h1>
                    <p className="pStep2" style={{ width: "" }}>{t("SUMMARY_HEADER_LINE_2")}</p>
                </div>
            </div>
            <section className="section_summary_mobile">
                <div className="summaryPackage">
                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_1")}</span>
                        <span className="spanData">{exitAddress && address}</span></div>
                        <div> <img onClick={() => switchEditBtnSummary('locationAndDateOfPackage')} className="editPng btn" src={edit} alt="edit" /></div>
                    </div></div>


                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_2")}</span>
                        <span className="spanData">{start_time && start_time}
                        </span></div>
                        <div><img onClick={() => switchEditBtnSummary('locationAndDateOfPackage')} className="editPng btn" src={edit} alt="edit" /></div>
                    </div></div>


                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_3")}</span>
                        <span className="spanData">{end_time && end_time}
                        </span></div>
                        <div><img onClick={() => switchEditBtnSummary('locationAndDateOfPackage')} className="editPng btn" src={edit} alt="edit" /></div>
                    </div></div>



                    <div className="inputSummary">
                        <div style={{ height: "200px" }} className="labelSummary"><div className="margin_span_summary">
                            <span>{t("SUMMARY_INPUT_4")}({detailsOfPackage?.length})</span>
                            <div style={{ height: "180px", width: "100%", overflow: "auto" }}>
                                {detailsOfPackage?.map((d, index) => {
                                    return (
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} key={index}> <span className="spanData" >{d.destination}</span>
                                            <br /><span>{d.contactPhone} {`${d.payForStation !== null ? d.payForStation : ""} ${d.payForStation !== null && d.payForStation !== '' ? d.currency_symbol_payForStation : ""}`} {d.comment} {d.contactName}</span> </div>)
                                })}</div></div>
                            <div><img onClick={() => switchEditBtnSummary('detailsOfPackage')} className="editPng btn" src={edit} alt="edit" /></div>

                        </div></div>


                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_5")}</span>
                        <span className="spanData" >{checkboxValue.MotorcycleChecked === '1' && t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_1")}
                            {checkboxValue.TruckChecked === '1' && t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_3")} {checkboxValue.CarChecked === '1' && t("STEPS_NUM_2_TYPE_PACKAGE_SELECT_2")} </span></div>
                        <div><img onClick={() => switchEditBtnSummary('checked')} className="editPng btn" src={edit} alt="edit" /></div><br />

                    </div></div>


                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_6")}</span>
                        <span className="spanData">{getDataFromServer?.new_price}</span></div>
                        <div><img onClick={() => switchEditBtnSummary('payAmount')} className="editPng btn" src={edit} alt="edit" /></div><br />
                    </div></div>



                    <div className="inputSummary"><div className="labelSummary"><div className="margin_span_summary"><span>{t("SUMMARY_INPUT_7")}</span>
                        <span className="spanData">{nameAndPhone.fullName}</span>
                        <span className="spanData">{nameAndPhone.phoneNumber}</span></div>
                        <div><img onClick={() => switchEditBtnSummary('fullNameAndPhone')} className="editPng btn" src={edit} alt="edit" /></div>

                    </div></div>

                </div>
            </section>

        </div>
    )

}
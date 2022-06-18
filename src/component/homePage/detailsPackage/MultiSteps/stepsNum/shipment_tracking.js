import { useTranslation } from "react-i18next";
import checkGreen from "../../../images/checkGreen.png"
import lookingFor from "../../../images/lookingFor.png"
import motorcycle from "../../../images/motorcycle.png"
import findMan from "../../../images/findMan.png"
import x from "../../../images/x.png"
import pogo from "../../../images/pogo.png"
import "./stepsNumCss/ShipmentTracking.css"
import { Alert, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Summary from "./summary";
import { times } from "lodash";



export default function ShipmentTracking({ setActiveStep, nameAndPhone, setNameAndPhone,

    setResponseGetById,
    responseGetById,
    detailsOfPackage,
    setCheckboxValue,
    setDetailsOfPackage,
    getDataFromServer,
    setResponseSmsValid,

    setExitaddress,
    setGetDataFromServer,
    setTime,
    time,
    checkboxValue,
    setVal

}) {




    const [statusOfPackage, setStatusOfPackage] = useState(1)
    const [isDeleted, setIsdeleted] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const { token } = useParams()
    const id = getDataFromServer.track_id ? getDataFromServer.track_id : token
    const url_by_id = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/get_track_by_id`
    const url_check_status = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/check_status`
    const url_relase_driver = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/relase_driver`
    const url_delete_track = `proj/pogo_connect/lw_pogo_connect/basic/server/web/tracks/delete_track`

    const { t, i18n } = useTranslation();


    useEffect(() => {
        const getStatus = async () => {
            try {
                const data = { track_id: id }
                const result = await axios.post(url_check_status, data, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }
                });
                // console.log(result);

            } catch (error) {
                console.log(error);
            }
        }

        const interval = setInterval(getStatus, 100000);

        return () => {
            clearInterval(interval);
        }
    }, [])



    const relaseDriver = async () => {
        try {
            const data = { track_id: id, driver_id: '' }
            const result = await axios.post(url_relase_driver, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            });
            // console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const delete_track = async () => {
        try {
            const data = { track_id: id }
            const result = await axios.post(url_delete_track, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            });
            console.log(result);
            setIsdeleted(true)


            //    const timer = setTimeout(() => window.location.href = '/', 3000);
            // clearTimeout(timer);


        } catch (error) {
            console.log(error);
        }
    }


    const backToSummary = () => {

        // if(response){

        setResponseSmsValid(true)
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        // }
    }



    useEffect(() => {

        const getDataById = async () => {

            try {

                const data = { track_id: id }
                const result = await axios.post(url_by_id, data, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }
                });
                console.log(result);
                if (result.data?.msg == "error - There is no such route") {
                    window.location.replace("/")
                }



                const exit_address = {
                    cityName: result.data.exit_address.locality_long,
                    streetName: result.data.exit_address.route_long,
                    streetNum: result.data.exit_address.street_number_long,
                }


                setExitaddress(exit_address)


                nameAndPhone.phoneNumber = result.data.phone
                nameAndPhone.fullName = result.data.customer_name
                nameAndPhone.erea_code = result.data?.erea_code || '+972'
                setNameAndPhone({ ...nameAndPhone })


                checkboxValue.MotorcycleChecked = result.data.vehicles_motorcycle
                checkboxValue.CarChecked = result.data.vehicles_car
                checkboxValue.TruckChecked = result.data.vehicles_truck
                setCheckboxValue({ ...checkboxValue })

                console.log(checkboxValue);
                const arrDDLine = result.data.end_time?.split(" ")
                arrDDLine.splice(1, 0, 'T')
                const ddLine = arrDDLine.join('')
                const arrPickUp = result.data.start_time?.split(" ")
                arrPickUp.splice(1, 0, 'T')
                const pickUpTime = arrPickUp.join('')
                time.ddLine = ddLine;
                time.pickUpTime = pickUpTime;
                setTime({ ...time })
                console.log(time);


                const getDataFromServer = {
                    track_id: id,
                    price_min: result.data.price_min * 1,
                    new_price: result.data.price * 1,
                    track_minutes: result.data.track_minutes,
                    track_distance: result.data.track_distance,
                    count_orders: result.data.count_orders,
                    currency_symbol: result.data.currency_symbol,
                    isLoading: null

                }
                setGetDataFromServer({ ...getDataFromServer })

                setVal(getDataFromServer.new_price)

                const ordersAddress = result.data.orders.map((order, i) => {
                    return {


                        lat: order.address.lat,
                        lng: order.address.lng,
                        destination: order.address.formatted_address ? order.address.formatted_address : `${order.address.route_long ? order.address.route_long : ""} ${order.address.street_number_long ? order.address.street_number_long : ""} ${order.address.locality_long ? order.address.locality_long : ""}`,
                        cityName: order.address.locality_long,
                        streetName: order.address.route_long,
                        streetNum: order.address.street_number_long,
                        payForStation: order.order_price ? order.order_price : "",
                        currency_symbol_payForStation: '₪',
                        comment: order.note ? order.note : "",
                        contactName: order.contactName ? order.contactName : "",
                        contactPhone: order.contactPhone ? order.contactPhone : "",
                        id_package: order.id ? order.id : "",


                    }
                })




                setDetailsOfPackage(ordersAddress)
                // console.log(ordersAddress)

                setResponseGetById(result.data)
            } catch (error) {
                // setIsError(true);
            }



        };
        getDataById()


    }, []);




    return (
        <div className="container summmary_container">
            <div
                className="infoSteps"
            >

                {isDeleted ? (
                    <Alert sx={{
                        '& .MuiAlert-icon': { margin: "auto", marginLeft: "15px", fontSize: "35px" },
                        '& .MuiAlert-message': { margin: "auto", fontSize: "20px" }
                    }} className="alert_delete">{t("TRACKING_SHIPMENT_CANCEL_ALERT")}</Alert>
                ) : null}

                {isMobile &&
                    <div className="pogo_logo_flex_img">
                        <div className="create_new_track_logo"><span className="span_create_new_track" onClick={()=> window.location.href = '/'}>{t("TRACKING_SHIPMENT_HEADER_1")}</span></div>
                            <div> <img className="pogo_logo_create_new_track_logo" src={pogo} alt="pogo" /></div>

                        </div>}

                            <div className="shipment_tracking">
                                <p className="head_shipment">{t("TRACKING_SHIPMENT_HEADER_2")} </p>
                                <div className="box_status">
                                    <div className="line_status"><span className="span_status_done">{t("TRACKING_SHIPMENT_SELECT_1")}</span>
                                        <img className="img_active" src={checkGreen} alt="checkGreenColor" /></div>

                                    <div className="line_between" />

                                    <div className="line_status"><span className={`span_status${statusOfPackage > 1 ? '_done' : ""}`}>{t("TRACKING_SHIPMENT_SELECT_2")}</span>
                                        <img className="img_active" src={statusOfPackage > 1 ? checkGreen : lookingFor} alt="lookingFor" /></div>


                                    <div className="line_between" />

                                    <div>
                                        <div className="line_status" style={{ marginBottom: statusOfPackage == 1 && '0px' }}><span className="span_status">{t("TRACKING_SHIPMENT_SELECT_3")}</span>
                                            <img className="img_active" src={statusOfPackage > 2 ? checkGreen : findMan} alt='findMan' /></div>
                                        {statusOfPackage == 1 && <div className="margin_find_deliver"><label onClick={relaseDriver} className="label_find_deliver">{t("TRACKING_SHIPMENT_CHANGE_DRIVER")}</label></div>}
                                        <div className="line_between" />
                                    </div>



                                    <div className="line_between" />
                                    <div className="line_status"><span className="span_status">{t("TRACKING_SHIPMENT_SELECT_4")}</span>
                                        <img className="img_active" src={statusOfPackage > 3 ? checkGreen : motorcycle} alt='motorcycle' /></div>
                                </div>



                                <div className="action_status">
                                    <div className="flex_button_status" />
                                    <div className="line_button_status" >
                                        <div className="div_buttons_status">
                                            <Button onClick={backToSummary} style={{ margin: "0px", display: "flex", justifyContent: 'flex-start' }} className="button_status_update"><span className="span__button_update">{t("TRACKING_SHIPMENT_UPDATE")}</span></Button>
                                            <Button onClick={delete_track} style={{ margin: "0px", display: "flex", justifyContent: 'flex-start' }} className="button_status_cancel"><img src={x} alt='xIcon' /><span className="span__button_cancel">{t("TRACKING_SHIPMENT_CANCEL")}</span></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


    )


}
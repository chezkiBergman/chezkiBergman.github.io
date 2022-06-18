import "./detailsOfPackage.css"
import Arrow from "../images/Arrow.png"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline } from '@mui/material';
import createCache from "@emotion/cache";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Alert, Autocomplete, Button, IconButton, InputAdornment } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import LocationSearchInput from "./reactAutoComplete";
import MultiSteps from "./MultiSteps/MultiSteps";
import { useMediaQuery } from 'react-responsive'

import moment from "moment";
import { useParams } from "react-router-dom";
import { injectGlobal } from "@emotion/css";









export default function DetailsOfPackage({ showSteps, setShowSteps }) {
    const { t } = useTranslation();
    const { token } = useParams()
    // console.log(token);

    const now = new Date()
    now.setMinutes(now.getMinutes() + 1 - now.getTimezoneOffset())
    const ddL = new Date()
    ddL.setHours(ddL.getHours() + 15)

    const [responseGetById, setResponseGetById] = useState(null)
    const [exitAddress, setExitaddress] = useState({ cityName: "", streetName: "", streetNum: "" })
    const [errorAutoComplet, setErrorAutoComplet] = useState(false)
    const [errorDDline, setErrorDDline] = useState(false)
    const [errorPickUp, setErrorPickUp] = useState(false)
    const [address, setAddress] = useState('')
    const [detailsOfPackage, setDetailsOfPackage] = useState([]);
    const [time, setTime] = useState({ ddLine: ddL.toISOString().substring(0, 16), pickUpTime: now.toISOString().substring(0, 16) })

    const [nameAndPhone, setNameAndPhone] = useState({ fullName: "", phoneNumber: "", area_code: "+972" });
    const [activeStep, setActiveStep] = useState(0);
    const [checkboxValue, setCheckboxValue] = useState(
        {
            MotorcycleChecked: '0',
            CarChecked: '1',
            TruckChecked: '0'
        },
    )
        ;
    const [getDataFromServer, setGetDataFromServer] = useState({
        track_id: null,
        new_price: 0,
        price_min: 0,
        track_minutes: null,
        track_distance: null,
        count_orders: null,
        currency_symbol: '₪',
        isLoading: null

    });
    const clone_price_min = Object.assign({}, getDataFromServer);
    const [val, setVal] = useState(Math.round(clone_price_min.price_min))

    const ref = useRef()
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const Tablet = useMediaQuery({ query: '(max-width: 800px)' })




    useEffect(() => {
        if (token && !responseGetById) {
            console.log(showSteps);
            // console.log('f');
            setShowSteps(true)

        }

    }, [])




    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });
    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });

    const InputLabelProps = {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '22px',
        textAlign: 'right',
        color: '#4F5976'
    }

    // console.log(time);


    const startSteps = (e) => {
        e.preventDefault();
        // console.log(exitAddress);
        if (exitAddress.cityName == '' && exitAddress.streetName == '' && exitAddress.streetNum == '') {

            return setErrorAutoComplet(t("ERROR_MESSAGE_AUTOCOMPLET"))

        }


        if (!errorAutoComplet) {
          
            setShowSteps(true)
        }
    }

    const focusClearErrors = () => {
        setErrorPickUp(false)
        setErrorDDline(false)
        setErrorAutoComplet(false)

    }






    const changePickUpTime = (e) => {


        time.pickUpTime = e.target.value
        time.ddLine = moment(new Date(time.pickUpTime).setHours(ddL.getHours() + 16)).format("YYYY-MM-DD[T]HH:mm:ss")


        setTime({ ...time })
        // console.log(time.ddLine);

    }
    const checkOnFocus = (e) => {
        time.pickUpTime != e.target.value && setErrorPickUp("")
        setErrorDDline('')
    }

    const changeDdLine = (e) => {

        time.ddLine = e.target.value
        setTime({ ...time })


    }
    let height;
    function styleHeight() {
        height = ''
        if (isMobile) {
            if (errorAutoComplet || errorDDline || errorPickUp) {
                return height += '600px'
            }
        }


    }


    const heightDetails = () => {
        let heightDetails = ''
        if (isMobile && showSteps && activeStep < 5) {
            return heightDetails = "821px"
        }
        if (isMobile && activeStep == 5) {
            return heightDetails = "700px"
        }
        if (isMobile && !showSteps) {
            return heightDetails = "531px"
        }
        if (isTabletOrMobile && showSteps && activeStep < 5) {
            return heightDetails = "686px"
        }

        if (isTabletOrMobile && activeStep == 5) {
            return heightDetails = "585px"
        }
        if (isTabletOrMobile && !showSteps) {
            return heightDetails = "645px"
        }
        if (Tablet && !showSteps || activeStep == 5 && Tablet) {
            return heightDetails = '592px'
        }
        if (Tablet && showSteps) {
            return heightDetails = "675px"
        }

        else {
            return heightDetails = "809px"
        }
    }



    return (
        <section className="container-fluid mobile_details_height" style={{ height: heightDetails(), background: !showSteps && '#F1F1F6' }}>
            <div className="cover">
                <div className="coverDetails" style={{ height: styleHeight() }}>
                    {!showSteps ? (< div style={{ position: "relative" }}>

                        <div className="details mobile_details">
                            <div className="flex_header_details">
                                <h1 className="h1_mobile" >{t("DETAILS_OF_PACKAGE_LINE_1")}</h1>
                                <p className="p_details_mobile">{t("DETAILS_OF_PACKAGE_LINE_2")}</p>
                            </div>
                            <div className="mobile_width_detailofpackage">
                                <Stack onFocus={focusClearErrors} >
                                    <div style={{ marginBottom: isMobile && "0px", height: isTabletOrMobile && !isMobile && "111px" }}>

                                        <LocationSearchInput
                                            errorAutoComplet={errorAutoComplet}
                                            setErrorAutoComplet={setErrorAutoComplet}
                                            exitAddress={exitAddress}
                                            setExitaddress={setExitaddress}
                                            label={t("DETAILS_OF_PACKAGE_INPUT_ADDRESS")}
                                            value={address} onChange={address => setAddress(address)} />


                                    </div>

                                    <div className="flex_date_time" style={{
                                        display: isTabletOrMobile ? 'block' : 'flex',
                                        marginTop: isMobile ? '60px' : isTabletOrMobile ? '0px' : "60px", marginBottom: isMobile ? '45px' : isTabletOrMobile ? '0px' : "65px",
                                    }}>

                                        <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>
                                            <CssBaseline />

                                            <TextField
                                                error={!!errorPickUp}
                                                className="textFieldLtr"
                                                label={t("DETAILS_OF_PACKAGE_INPUT_DATE")}
                                                helperText={errorPickUp}
                                                onFocus={checkOnFocus}

                                                type="datetime-local"
                                                inputProps={{
                                                    min: now.toISOString().substring(0, 16),
                                                    style: {
                                                        textAlign: ltrTheme.direction === "ltr" ? "right" : "left",
                                                        display: ltrTheme.direction === "ltr" ? 'flex' : "block", flexDirection: ltrTheme.direction === "ltr" ? 'row-reverse' : "row",
                                                        height: isMobile ? '40px' : isTabletOrMobile && '40px'
                                                    }
                                                }}
                                                InputProps={{
                                                    startAdornment:
                                                        <InputAdornment style={{ cursor: "pointer" }} position='start'>
                                                            <CalendarMonthIcon />
                                                        </InputAdornment>
                                                }}
                                                value={time.pickUpTime ? time.pickUpTime : now.toISOString().substring(0, 16)}
                                                onChange={changePickUpTime}
                                                sx={{ '& .MuiFormHelperText-root': { fontFamily: "heebo" }, width: isMobile ? 300 : isTabletOrMobile ? "100%" : '48%', marginBottom: isMobile ? '23px' : isTabletOrMobile && "35px", "& .MuiOutlinedInput-root": { fontFamily: "heebo" } }}
                                                InputLabelProps={{
                                                    style: InputLabelProps,
                                                    shrink: true,
                                                }}
                                            />


                                            <TextField

                                                error={!!errorDDline}

                                                helperText={errorDDline ? errorDDline : ""}
                                                onFocus={() => setErrorDDline('')}
                                                label={t("DETAILS_OF_PACKAGE_DDLINE")}
                                                type="datetime-local"
                                                value={time.ddLine ? time.ddLine : ddL.toISOString().substring(0, 16)}
                                                onChange={changeDdLine}
                                                sx={{
                                                    '& .MuiFormHelperText-root': { fontFamily: "heebo" }, width: isMobile ? 300 : isTabletOrMobile ? "100%" : '48%', marginBottom: isMobile ? '23px' : isTabletOrMobile && '35px'
                                                    , "& .MuiOutlinedInput-root":
                                                        { fontFamily: "heebo" }
                                                }}
                                                InputProps={{
                                                    startAdornment:
                                                        <InputAdornment style={{ cursor: "pointer" }} position='start'>
                                                            <CalendarMonthIcon />
                                                        </InputAdornment>
                                                }}
                                                inputProps={{
                                                    min: time.pickUpTime ? moment(new Date(time.pickUpTime).setHours(ddL.getHours() + 15)).format("YYYY-MM-DD[T]HH:mm:ss") : ddL.toISOString().substring(0, 16),
                                                    style: {
                                                        textAlign: ltrTheme.direction === "ltr" ? "right" : "left",
                                                        display: ltrTheme.direction === "ltr" ? 'flex' : "block", flexDirection: ltrTheme.direction === "ltr" ? 'row-reverse' : "row",
                                                        height: isMobile ? '40px' : isTabletOrMobile && '40px'
                                                    }
                                                }}
                                                InputLabelProps={{

                                                    style: InputLabelProps,

                                                    shrink: true,
                                                }}
                                            />

                                        </CacheProvider>

                                    </div>

                                    <Button onClick={startSteps} className="marginBtn" style={{ height: '62px', margin: "auto", backgroundColor: "#583DFF", borderRadius: "4px" }}
                                        variant="contained"><img className="Arrow" src={Arrow} alt="Arrow" />
                                        {t("DETAILS_OF_PACKAGE_CONTINUE")}</Button>

                                </Stack>
                            </div>
                        </div>
                    </div>

                    )

                        :
                        <div className="details MultiSteps" style={{ height: isMobile && activeStep == 5 && "700px" }}>
                            <MultiSteps
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                val={val}
                                setVal={setVal}
                                responseGetById={responseGetById}
                                setResponseGetById={setResponseGetById}
                                checkboxValue={checkboxValue}
                                setCheckboxValue={setCheckboxValue}
                                nameAndPhone={nameAndPhone}
                                setNameAndPhone={setNameAndPhone}
                                getDataFromServer={getDataFromServer}
                                setGetDataFromServer={setGetDataFromServer}
                                errorAutoComplet={errorAutoComplet}
                                setErrorAutoComplet={setErrorAutoComplet}
                                time={time}
                                setTime={setTime}
                                setShowSteps={setShowSteps}
                                detailsOfPackage={detailsOfPackage}
                                setDetailsOfPackage={setDetailsOfPackage}
                                exitAddress={exitAddress}
                                setExitaddress={setExitaddress}
                            />
                        </div>












                    }

                </div>
            </div>
        </section>
    )

}
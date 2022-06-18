import { Fragment, useEffect, useRef, useState, useStyles } from "react";
import { useTranslation } from "react-i18next";
import { TextField, CssBaseline, StepContext, Dialog, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMediaQuery } from 'react-responsive'
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import "./stepsNumCss/sliderPrice.css"
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles, withStyles, styled } from "@mui/styles"
import time from "../../../images/time.png"
import distance from "../../../images/distance.png"
import numDestination from "../../../images/numDestination.png"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';















export default function SliderPrice({ isLoading, val, setVal, setGetDataFromServer, getDataFromServer }) {

    

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const { t, i18n } = useTranslation();
    const [colors, setColors] = useState("red");
    const [text, setText] = useState("");
    const ref = useRef(null)
    const clone_price_min = Object.assign({}, getDataFromServer);



    useEffect(() => {

        if (val < 245) {
            setColors("#FF0000")
            setText(t("STEPS_NUM_3_HEADER_LINE_4"))
        }

        if (val > 245) {
            setColors("#FFB26B")
            setText(t("STEPS_NUM_3_HEADER_LINE_5"))
        }
        if (val > 450) {
            setColors('#5BDF60')
            setText(t("STEPS_NUM_3_HEADER_LINE_6"))
        }

    }, [val])

    const rightInputLabelProps =()=>{
        if(isMobile  && document.documentElement.dir === "ltr"){
           return "115px" 
        }
        if(isMobile && document.documentElement.dir === "rtl"){
            return "103px"
        }
    }

    const InputLabelProps = {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '15px',
        lineHeight: '22px',
        textAlign: 'right',
        color: '#4F5976',
        right: rightInputLabelProps()
    }

    


    const themeRtl = createTheme({
        direction: 'rtl',
    });

    const themeLtr = createTheme({
        direction: 'ltr',
    });


    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });
    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });

const widthSliderVal =()=>{
if(isTabletOrMobile){
return "100%"
}
if(isMobile){
  return '100%'
}
return "545px"
}

    return (
        <div style={{ position: "relative" }} className="infoSteps">


            <div>
                <div className="headFlex_slider" style={{ marginBottom: isTabletOrMobile && "20px" }}>
                    <h2 className="h1Step">{t("STEPS_NUM_3_HEADER_LINE_1")}</h2>
                    <p className="pStep2" style={{whiteSpace: !isMobile && 'nowrap'}} >{t("STEPS_NUM_3_HEADER_LINE_2")}</p>
                </div>



                <div className="slidecontainer">
                    <div className="track_time_results">
                        <div className="track_time_results_flex">


                            <div className="box_result_data"> <div className="flexHead_data_result">
                                <span className="track_time_results_span">{t("STEPS_NUM_3_LINE_7")}</span>
                                <img className="icon_data_result" src={time} alt="time" /></div>
                                <span className="result_data_bold"> {getDataFromServer?.count_orders}</span></div>



                            <div className="box_result_data"><div className="flexHead_data_result">
                                <span className="track_time_results_span">{t("STEPS_NUM_3_LINE_6")}</span>
                                <img className="icon_data_result" src={distance} alt="distance" /></div>
                                <span className="result_data_bold">{getDataFromServer?.track_distance}</span></div>


                            <div className="box_result_data"><div className="flexHead_data_result">
                                <span className="track_time_results_span">{t("STEPS_NUM_3_LINE_5")}</span>
                                <img className="icon_data_result" src={numDestination} alt="numDestination" /></div>
                                <span className="result_data_bold">{getDataFromServer?.track_minutes}</span></div>
                        </div>
                    </div>
                    <div className="margin_slider_val" style={{ marginBottom: isTabletOrMobile ? "20px" : "24px" ,width: widthSliderVal() }}

                    >
                        <div style={{ height: isMobile ? "154px" : "124px", width: isMobile && '100%', margin: isMobile && 'auto' }}>
                            <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>

                                <CssBaseline />
                                <TextField
                                    className="fontBolder"
                                    label={t("STEPS_NUM_3_HEADER_LINE_3")}
                                    id="outlined-size-small"
                                    sx={{position:"relative",width:isTabletOrMobile ? '100%':"545px",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                padding: isMobile ? "0 123px" : "11px"
                                            },
                                             width: isMobile ? "352px" : "100%",
                                             direction: document.documentElement.dir === "ltr" && isMobile ?  "rtl" :"rtl"
                                        },   justifyContent: document.documentElement.dir === "ltr"  && "flex-start",
                                        '& .MuiOutlinedInput-input': {
                                            left: val < 100 ? "40%" :'35%',
                                            position: isMobile && "absolute",
                                            fontFamily: 'Heebo',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            lineHeight: '44px',
                                            fontSize: '30px',
                                            width: isMobile ? "352px" : "auto",
                                            color: '#0D152E'
                                        }
                                    }}

                                    value={val == 0 ? clone_price_min.price_min * 1 : val }

                                    InputProps={{
                                        min: clone_price_min.price_min * 1,
                                        startAdornment: <InputAdornment sx={{position:"relative",
                                            "& .MuiTypography-root": {
                                                width: '25px', height: '34px',
                                                position: isMobile && "absolute",
                                                right:document.documentElement.dir === "ltr" ?"125px" :"-202px",
                                                fontFamily: 'Arial',
                                                fontStyle: 'normal',
                                                fontWeight: '400',
                                                fontSize: '30px',
                                                lineHeight: '34px',
                                                color: '#7A7789'
                                            }
                                        }} position="start">₪</InputAdornment>,
                                        style: {
                                            flexDirection: isMobile && document.documentElement.dir === "rtl" ? "row" : 'row-reverse', justifyContent: !isMobile && 'space-between',
                                            height: '105px',
                                            direction: document.documentElement.dir === "ltr" ? "rtl" : "ltr",
                                          

                                        }
                                    }}
                                    InputLabelProps={{
                                        style: InputLabelProps,
                                        shrink: true,
                                    }} />
                            </CacheProvider>


                        </div>

                        <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>
                            <ThemeProvider theme={ltrTheme.direction === "ltr" ? themeRtl : themeLtr}>
                                <div style={{width: isMobile && '90%',margin:  isMobile && '0 auto',marginRight: !isMobile && "14px" ,paddingRight: isMobile && "3rem"}}>

                                <Slider

                                    sx={{

                                        color: colors, '& .MuiSlider-thumb': {
                                            color: '583DFF',

                                        },
                                    }}

                                    // defaultValue={clone_price_min.price_min *1}
                                    min={clone_price_min.price_min * 1}
                                    max={2000}
                                    value={val}

                                    onChange={e => setVal(e.target.value)}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                />
                               
                                <label className="label_slider">{text}</label>
                                </div>
                            </ThemeProvider>

                        </CacheProvider>
                       
                    </div>
                </div>

            </div>


        </div>
    )


}


import * as React from 'react';
import "./stepsNumCss/popUp.css"
import { TextField, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Button from '@mui/material/Button';
import { useMediaQuery } from "react-responsive"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import parsePhoneNumber from 'libphonenumber-js';
import Arrow3 from "../../../images/Arrow 3.png"
import trash from "../../../images/Trash.png"
import { t } from 'i18next';
import DetailsOfPackage from '../../detailsOfPackage';
import { type } from '@testing-library/user-event/dist/type';

export default function PopUpMoreDetails({ open, AllDetailsOfPackage, close, click, labelDestination, selected, detailsOfPackageSingel }) {

    const [error, setError] = React.useState(null)
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })


    const selectFuncPayForStation = (e) => {
        detailsOfPackageSingel.payForStation = e.target.value;
        selected([...AllDetailsOfPackage]);
    }
    const selectFuncComment = (e) => {
        detailsOfPackageSingel.comment = e.target.value;
        selected([...AllDetailsOfPackage]);
    }

    const selectFuncCostumerName = (e) => {
        detailsOfPackageSingel.contactName = e.target.value;
        selected([...AllDetailsOfPackage]);
    }

    const selectFunCcontactPhone = ({ target: { value } }) => {
        let valid = true;
        const newPhoneNumber = parsePhoneNumber(value, "IL");

        if (newPhoneNumber) {
            valid = newPhoneNumber.isValid();
            if (valid) {
                value = newPhoneNumber.number;

            }


        }
        setError(!valid);
        detailsOfPackageSingel.contactPhone = value
        selected([...AllDetailsOfPackage]);

    }




    const saveDetails = () => {
        click(AllDetailsOfPackage)
    }



    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });
    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });
    const labelText = `${labelDestination}(${AllDetailsOfPackage.length})`
    const InputLabelProps = {

        display: 'flex',
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '25px',
        textAlign: 'right',
        color: '#0D152E',
        direction: ltrTheme.direction === "rtl" && "ltr",
    }
    const isRTL = (s) => {
        if (s !== '') {
            var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
                rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
                rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

            return rtlDirCheck.test(s);
        }
        return true
    };


    const deletePackageSingel = () => {
        selected(AllDetailsOfPackage.filter(item => item !== detailsOfPackageSingel))
        close(detailsOfPackageSingel)
    }



    return (
        <div className='mobile_width_popUp'>
            {isMobile && <div className='cancel_mobile'><img className='Arrow_cancel' src={Arrow3} onClick={()=>close(detailsOfPackageSingel)} /></div>}
            <CssBaseline />

            <div className='divPopUp'>
                <div className='moreDetailsHead'> <h2 className='h2HeaderMoreDetails'>{t("ADD_DETAILS_WINDOW")}</h2>
                </div>
                <div style={{width: isMobile && "100%"}}>
                <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>
                    
                    <div className='popUp_flex'>
                        <TextField
                            label={labelText}
                            id="outlined-size-small"
                            value={detailsOfPackageSingel.destination}
                            sx={{ width: '100%', height: '81px' }}
                            inputProps={{ style: { direction: ltrTheme.direction === "rtl" ? "ltr" : "rtl" } }}
                            InputLabelProps={{
                                style: InputLabelProps,
                                shrink: true,
                            }} />
                    </div>
                </CacheProvider>

                <CacheProvider value={ltrTheme.direction === "ltr" && isRTL(detailsOfPackageSingel.contactName) ? (cacheRtl) : cacheLtr}>
                    <div className='costumerName_width'>

                        <TextField
                            autoComplete='off'
                            onChange={selectFuncCostumerName}
                            value={detailsOfPackageSingel.contactName}
                            label={t("ADD_DETAILS_WINDOW_INPUT_NAME")}
                            id="outlined-size-small"
                            sx={{ width: '100%', height: '81px' }}
                            inputProps={{ style: { direction: ltrTheme.direction === "ltr" && isRTL(detailsOfPackageSingel.contactName) ? "rtl" : "ltr" } }}
                            InputLabelProps={{
                                style: {

                                    margin: "auto",
                                    display: 'flex',
                                    fontFamily: 'Heebo',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    lineHeight: '25px',
                                    textAlign: 'right',
                                    color: '#0D152E',

                                },

                                shrink: true,
                            }}
                        />

                    </div>
                </CacheProvider>

                <div className='margin mobile_flex' >
                    <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>
                        <TextField
                            label={t("ADD_DETAILS_WINDOW_INPUT_PRICE")}
                            onChange={selectFuncPayForStation}
                            autoComplete='off'
                            value={detailsOfPackageSingel.payForStation}
                            id="outlined-size-small"
                            sx={{ ml: isMobile ? 0 : 3, width: "48%", height: '81px'}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                                style: { flexDirection: 'row-reverse', direction: ltrTheme.direction === "rtl" && "ltr" }
                            }}

                            InputLabelProps={{
                                style: InputLabelProps,
                                shrink: true

                            }}
                        />
                    </CacheProvider>
                    <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>
                        <TextField
                            error={!!error}
                            helperText={error && t("STEPS_NUM_4_ABOUT_YOU_INPUT_NAME_VALIDPHON")}
                            value={detailsOfPackageSingel.contactPhone}
                            onChange={selectFunCcontactPhone}

                            autoComplete='off'
                            label={t("ADD_DETAILS_WINDOW_INPUT_PHONE")}
                            sx={{ width: '48%', height: '81px' }}
                            id="outlined-size-small"
                            inputProps={
                                { style: { direction: ltrTheme.direction === "ltr" && isRTL(detailsOfPackageSingel.contactPhone) ? "rtl" : "ltr" } }}
                            InputProps={{ style: InputLabelProps }}
                            InputLabelProps={{
                                style: InputLabelProps,
                                shrink: true,
                            }}
                        />
                    </CacheProvider>
                </div>
                <CacheProvider value={ltrTheme.direction === "ltr" && isRTL(detailsOfPackageSingel.comment) ? (cacheRtl) : cacheLtr}>
                    <TextField
                        autoComplete='off'
                        onChange={selectFuncComment}
                        value={detailsOfPackageSingel.comment}
                        label={t("ADD_DETAILS_WINDOW_INPUT_REMARKS")}
                        id="outlined-size-small"
                        sx={{ width: '100%', height:  '81px' }}
                        inputProps={{ style: { direction: ltrTheme.direction === "ltr" && isRTL(detailsOfPackageSingel.comment) ? "rtl" : "ltr" } }}
                        InputLabelProps={{
                            style: {

                                margin: "auto",
                                display: 'flex',
                                fontFamily: 'Heebo',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '15px',
                                lineHeight: '25px',
                                textAlign: 'right',
                                color: '#0D152E',

                            },

                            shrink: true,
                        }}
                    />
                    
                </CacheProvider>
                </div>
               </div>
          



            <div className='widthActions'>
                <div style={{ display: "flex", flexDirection: isMobile && "column", alignItems: isMobile && "center", justifyContent: isMobile ? 'center' : 'space-between', marginBottom: "20px", width: '100%'}}>
                    <Button style={{ background: '#583DFF', width: isMobile && "100%",margin: isMobile && "0px"  }} variant='contained' className='saveMoreDetails' onClick={saveDetails}>{t("ADD_DETAILS_WINDOW_BTN_CONFIRM")}</Button>
                    {!isMobile && <Button variant='outlined' className='cancelMoreDetails' onClick={()=>close(detailsOfPackageSingel)}>{t("ADD_DETAILS_WINDOW_BTN_CANCEL")}</Button>}
                    {isMobile && <div style={{ marginTop: '36px', marginBottom: '33px' }}>
                        <img className="btn imgMoreDetailsHidden" style={{
                            visibility: "visible",
                            cursor: "pointer", 
                            
                        }}
                            onClick={deletePackageSingel} src={trash} alt="trash" />
                        <span className="imgMoreDetailsShow">{t("DELETE_STATION_MOBILE")}</span>
                    </div>}
                </div>
           
            </div>
        </div >
    );
}

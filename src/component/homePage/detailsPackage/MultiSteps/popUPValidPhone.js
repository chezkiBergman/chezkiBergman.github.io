import { useTranslation } from "react-i18next";
import "./stepsNum/stepsNumCss/checkTypePackage&postData.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField, CssBaseline } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Button } from "@mui/material";
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import { useTheme } from "@emotion/react";
import { verificationCheck } from "./verificationSmsApi";
import { smsValidationApi } from "./sms_validation_api";
import "../MultiSteps/popUpValidPhone.css"



export default function PopUpValidPhone({ nameAndPhone, switchEditBtnSummary,
    getDataFromServer,setResponseSmsValid }) {
   
    // if (nameAndPhone[0].phoneNumber && nameAndPhone[0].fullName !== "") {
    //     const phoneNumber = nameAndPhone[0].phoneNumber;
    //     const countryCodeLength = phoneNumber.length - 9;

    //     const components = {
    //         IDDCC: phoneNumber.substr(0, countryCodeLength), 
    //         NN: phoneNumber.substr(countryCodeLength, phoneNumber.length)
    //     };
    // }
  
    const {token}=useParams()
    const { t, i18n } = useTranslation();
    const [response, setResponse] = useState(null)
    const [value, setValue] = useState("")
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(0);
    const [open, setOpen] = useState(true);
    const ref = useRef(null)


    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

console.log(isMobile);
    const sms = async () =>{
        const result  = await smsValidationApi({getDataFromServer, nameAndPhone, token})
        if(result !== 'phone not verified'){
            setResponseSmsValid(result)
          } else{
            setResponseSmsValid(null)
          } 
    } 

    
      
      

    const checkCodeSms = async() => {
        const result  = await verificationCheck({nameAndPhone, value })
        if (result == 'OK' ) {
    //    console.log(result);
        setOpen(false)
      
        setResponseSmsValid('phone verified')

        }else{
       return setError(true);
        }

    }


    const backToPhoneAndName =()=>{
     switchEditBtnSummary('fullNameAndPhone')
     setResponseSmsValid(false)

    }

    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });

    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });
    const InputLabelProps = {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '22px',
        textAlign: 'right',
        color: '#4F5976'
    }


   


    return (

        <Dialog hideBackdrop
         sx={{"& .MuiDialogContent-root":{overflow: isMobile && "hidden"}, '& .MuiPaper-root':{
        
         transition:"none",}}}  
        open={open}  >


            <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>

                <CssBaseline />
                <DialogContent>
                    <div className='divPopUp phonePopUp'>
                      
                        <div className='moreDetailsHead phone_head_div'> <h2 className='h2HeaderMoreDetails phoneHeader2'>{t("STEPS_NUM_4_VALIDATION_HEADER_LINE_1")}</h2>
                        </div>
                        <div className="marg_popUp_mobile">
                         <div className="sendSmsHeader sendSmsHeader_mobile">
                            <p className="head_p phone_head_p_mobile">{t("STEPS_NUM_4_SENT_PHONE")}</p>
                            <span className="phoneNumHead phoneNumHead_mobile">{nameAndPhone?.phoneNumber}</span>
                            <div className="receiveCode receiveCode_mobile"><a style={{ cursor: "pointer" }} onClick={sms} className="sendAgain sendAgain_mobile">{t("STEPS_NUM_4_DIDN'T_RECEIVE")}</a>
                                <a style={{ cursor: "pointer" }} onClick={backToPhoneAndName} className="sendAgain sendAgain_mobile">{t("STEPS_NUM_4_ISN'T_MYNUM")}</a></div>
                        </div>
                        </div>


                        <TextField
                            error={!!error}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            //    ref={ref}
                            style={{ margin: '25px auto 25px',width:"90%"}}
                            label={t("STEPS_NUM_4_WHICH_CODE_RECEIVE")}
                            id="outlined-size-small"
                            autoComplete='off'
                            helperText={error && "נדרש אימות"}
                            sx={{ width: 450 }}
                            onFocus={() => setError(false)}
                            InputLabelProps={{
                                style: InputLabelProps,

                                shrink: true,
                            }} />

                        <DialogActions className='continue' >

                            <Button onClick={checkCodeSms} variant='outlined' 
                            style={{padding: '13px 15px', color: "#FFFFFF", textAlign: "center", width: "450px" }}
                             >{t("DETAILS_OF_PACKAGE_CONTINUE")}</Button>

                        </DialogActions>
                    </div>
                </DialogContent>

            </CacheProvider>

        </Dialog>


    )

}
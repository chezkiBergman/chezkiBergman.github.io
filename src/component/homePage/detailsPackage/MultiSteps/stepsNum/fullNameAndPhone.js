import { useTranslation } from "react-i18next";
import { TextField, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
 import {useMediaQuery} from "react-responsive"
import createCache from "@emotion/cache";
import { useEffect, useState ,useRef} from "react";
import ".././stepsNum/stepsNumCss/FullNameAndPhone.css"
import parsePhoneNumber from 'libphonenumber-js';



export default function FullNameAndPhone({ selectNameAndPhone, nameAndPhone, errorsPhoneName,
    setErrorsPhoneName, setContinueToSummary }) {

   
const ref = useRef()

const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const { t, i18n } = useTranslation();
    // const [fullName, setFullName] = useState("")
    // const [phoneNumber, setPhoneNumber] = useState("")

    const InputLabelProps = {
        fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '22px',
        textAlign: 'right',
        color: '#4F5976'
    }





    const onChange = ({ target: { value } }) => {

        
        let valid = true;
        const newPhoneNumber = parsePhoneNumber(value, "IL");

        // if (!newPhoneNumber) {

        //     return null
        // }
        if (newPhoneNumber) {
            valid = newPhoneNumber.isValid();

            if (valid) {
                value = newPhoneNumber.number;

            }


        }

        // setPhoneNumber(value);

        nameAndPhone.phoneNumber = value;

        selectNameAndPhone({ ...nameAndPhone })

      
        const phone = 'phone';
        const bool = !valid;
        setErrorsPhoneName(prevState => ({
            ...prevState,
            [phone]: bool
        }));
      
        // console.log(errorsPhoneName);



    }


    // const selectNamePhone =()=>{
    //     // nameAndPhone.phoneNumber = phoneNumber
    //     // nameAndPhone.fullName = fullName;
    //     selectNameAndPhone({...nameAndPhone})

    // }


    const handleChange = (e) => {
        nameAndPhone.fullName = e.target.value
        selectNameAndPhone({

            ...nameAndPhone
        });
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



    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });
    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });

    return (
        <div className="infoSteps">
            <div className="flex_header_nameAndPhone" style={{ marginBottom: "69px" }}>
                <h1 className="h1Step">{t("STEPS_NUM_4_ABOUT_YOU_HEADER_LINE_1")}</h1>
                <p>{t("STEPS_NUM_4_ABOUT_YOU_HEADER_LINE_2")}</p>
            </div>

            <div className="litleAboutTextField">

                <CacheProvider value={ltrTheme.direction === "ltr" && isRTL(nameAndPhone.fullName) ? (cacheRtl) : cacheLtr}>

                    <CssBaseline />
                    <div>
                        <TextField
                            // onSelect={selectNamePhone}
                            label={t("STEPS_NUM_4_ABOUT_YOU_INPUT_NAME")}
                            id="outlined-size-small"
                            autoComplete='off'
                            onFocus={()=>setErrorsPhoneName(false)}
                            error={!!errorsPhoneName.name}
                            style={{width: isTabletOrMobile && "477px"}}
                            value={nameAndPhone.fullName}
                            onChange={handleChange}
                            inputProps={{style:{direction: ltrTheme.direction === "ltr" && isRTL(nameAndPhone.fullName) ? "rtl" : "ltr"}}}
                            InputProps={{ style: InputLabelProps }}
                            InputLabelProps={{
                                style: InputLabelProps,
                                shrink: true,
                            }} />
                    </div>
                    <div style={{ marginTop: "35px" }}>

                        <TextField
                            inputRef={ref}
                            error={!!errorsPhoneName.phone}
                            helperText={errorsPhoneName.phone && t("STEPS_NUM_4_ABOUT_YOU_INPUT_NAME_VALIDPHON")}
                            value={nameAndPhone.phoneNumber}
                            onFocus={()=>setErrorsPhoneName(false)}
                            style={{width: isTabletOrMobile && "477px"}}
                            onChange={onChange}
                            autoComplete='off'
                            label={t("STEPS_NUM_4_ABOUT_YOU_INPUT_PHONE")}
                            id="outlined-size-small"
                            inputProps={{style:{direction: ltrTheme.direction === "ltr" && isRTL(nameAndPhone.fullName) ? "rtl" : "ltr"}}}
                            InputProps={{ style: InputLabelProps }}
                            InputLabelProps={{
                                style: InputLabelProps,
                                shrink: true,
                            }}
                        />
                    </div>
                </CacheProvider>
            </div>
        </div>


    )

}

import React, { useState, useEffect, useRef } from "react"
import { ExcelRenderer } from "react-excel-renderer";
import { useTranslation } from "react-i18next";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import trash from "../../../../images/Trash.png"
import xlImg from "../../../../images/xlImg.png"
import "../xlFiles/xlFiles.css"
import Arrow3 from "../../../../images/Arrow 3.png"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from "react-responsive"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import like from "../../../../images/like.png"



export default function ImportXlFiles({ AllDetailsOfPackage, fileObject, setFileObject, selected, setShowInput, showInput }) {


    const { t, i18n } = useTranslation();
    const ref = useRef()


    const files = () => {
        // console.log(ref.current.files[0])
        setFileObject(ref.current.files[0]);


    }
   

    const addXlToArray = () => {
        if (fileObject) {
            ExcelRenderer(fileObject, (err, resp) => {
                if (err) {
                    console.log(err);
                } else {
                    const modifyData = resp.rows?.slice(1)?.map((itm, index) => {
                        return {

                            // effFromDate: new Date(itm[0] * 1000)?.toUTCString() || "",
                            id: AllDetailsOfPackage.length++,
                            contactName: itm[0] || "",
                            destination: itm[1] || "",
                            cityName: itm[2] || "",
                            streetName: "",
                            streetNum: "",
                            contactPhone: itm[3] || "",
                            payForStation: itm[4] || "",
                            comment: itm[5] || "",
                            lat: "",
                            lng: "",
                        }
                    });
                    selected && selected(modifyData);
                    setFileObject("")
                    setShowInput(false)
                    // ref.current.value = ""
                }
            });
        }
    }





    const cacheLtr = createCache({
        key: "muiltr"
    });
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin]
    });
    const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });



    const MuiButton = {
        width: '50px',
        height: '25px',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '17px',
        lineHeight: '25px',
        textAlign: 'center',
        color: '#FFFFFF'
    }

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })



    return (
        <div  style={{width: isMobile &&  '95%'}}>
            {isMobile && <div className='cancel_mobile'><img className='Arrow_cancel' src={Arrow3} onClick={() => setShowInput(!showInput)} /></div>}



            <div className='divPopUp mobile_xl_width_popUp'>


                <div className="margin_upload" style={{position: isMobile && fileObject ? "absolute" :"",top:"40px"}}>

                    <div className='moreDetailsHead'> <h2 className='h2HeaderMoreDetails' style={{whiteSpace: 'nowrap'}}>{t("POPUP_UPLOAD_FILE_HEADER")}</h2>
                    </div>
                    {!fileObject ? (<div><div className="upload_file">
                        <label style={{ cursor: "pointer" }} className="btnInput" onChange={files} htmlFor="formId">
                            <input ref={ref} name="" type="file" id="formId" hidden />
                            <BackupOutlinedIcon />
                            {t("POPUP_UPLOAD_FILE_INPUT")}
                        </label>
                        <p className="labelInputFile">{t("POPUP_UPLOAD_FILE_LABEL_INPUT")}</p>
                    </div>

                        <div className="video_upload_file">
                            <div className="divH5_file_video"><h5 className="h5">{t("POPUP_UPLOAD_FILE_HEADER_VIDEO")}</h5>
                                <img src={like} alt='like' />
                            </div>
                            <div className="box_video">
                                <iframe className="frame_width"
                                    src="https://www.youtube.com/embed/tgbNymZ7vqY">
                                </iframe>
                            </div>


                        </div>

                    </div>) : <div className="fileSelected"><div className="info_fileSelected">
                        <img src={trash} alt="trash" style={{ cursor: "pointer" }} onClick={() => setFileObject(null)} /></div><p className="text_fileXl">{fileObject.name}<img src={xlImg} alt='xlImg' /></p></div>} </div> </div>




            <div className="actionsBtn_file_PopUp">
                <div className='openBtn' style={{ opacity: !fileObject && '0.2',width: isMobile && "100%" }} ><Button
                    onClick={addXlToArray}
                    style={{margin:"auto"}}
                    sx={{
                        margin: "auto",
                        fontFamily: "Heebo",
                        width: '50px',
                        height: '25px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '17px',
                        lineHeight: '25px',
                        textAlign: 'center',
                        color: '#FFFFFF'
                    }} className="btn_open_info" >{t("POPUP_UPLOAD_FILE_BTN")}</Button></div>
                {!isMobile && <div className='cancelBtn'>
                    <Button className="btn_cancel_info" onClick={() => setShowInput(!showInput)} >{t("ADD_DETAILS_WINDOW_BTN_CANCEL")}</Button></div>
                }
            </div>




        </div>
    );
}




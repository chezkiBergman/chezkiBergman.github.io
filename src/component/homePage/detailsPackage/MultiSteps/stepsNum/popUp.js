import * as React from 'react';
import "./stepsNumCss/popUp.css"
import { TextField, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { useMediaQuery } from "react-responsive"
import createCache from "@emotion/cache";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import parsePhoneNumber from 'libphonenumber-js';
import PopUpMoreDetails from "./popUpDetails_responsive"
import styled from '@emotion/styled';

import { t } from 'i18next';
import DetailsOfPackage from '../../detailsOfPackage';
import { type } from '@testing-library/user-event/dist/type';

export default function PopUpForDex({ open, AllDetailsOfPackage, close, click, labelDestination, selected, detailsOfPackageSingel }) {

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })



  


    return  (
        <div style={{maxWidth:"545px",margin:"0 auto"}}>

            <Dialog hideBackdrop  sx={{
                "& .MuiPaper-root": {
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 4px 50px',
                    gap: '10px',
                //    boxShadow:"none",
                //     color:"white",
                    transition:"none",
                    background: '#FFFFFF',
                    borderRadius: '4px'
                }
            }} open={open} onClose={close}>




                <CssBaseline />
                <DialogContent>

                    <PopUpMoreDetails labelDestination={t(`STEPS_ADDRESS_DELIVERY`)}
                        click={click} open={open}
                        selected={selected}
                        AllDetailsOfPackage={AllDetailsOfPackage} close={close} detailsOfPackageSingel={detailsOfPackageSingel} className="moreDetailsWindow" />

                </DialogContent>



            </Dialog>
        </div >
    ) 
}
